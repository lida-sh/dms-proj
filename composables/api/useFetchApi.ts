import { type FetchOptions, FetchError, $fetch } from "ohmyfetch";
import type { FetchCustomConfig } from "./FetchCustomConfig";
import { BASE_URL } from "./api.config";
import { ToastEnum } from "~~/types";
import "reflect-metadata";
import {
  instanceToPlain,
  plainToInstance,
  type ClassConstructor,
} from "class-transformer";
import { useAuthStore } from "../auth/Auth.store";

export const useFetchApi = <R, T = {}>(
  classTransformer: ClassConstructor<T> = null as unknown as ClassConstructor<T>
) => {
  const router = useRouter();
  const myCustomFetch = (
    url: string,
    config: FetchOptions = {},
    fetchCustomConfig: FetchCustomConfig = {}
  ) => {
    config = {
      baseURL: BASE_URL,
      retry: 0,
      ...config,
    };
    fetchCustomConfig = { goToLogin: true, ...fetchCustomConfig };
    const authStore = useAuthStore();
    if (fetchCustomConfig.setToken) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers["Authorization"] = `Bearer ${authStore.getToken}`;
      config.headers["Accept"] = "application/json";
    }
    const { showToast } = useToast();

    return $fetch<R>(url, config)
      .then((response) => {
        console.log("response", response);
        if (classTransformer != null) {
          const instance = plainToInstance(classTransformer, response, {
            excludeExtraneousValues: true,
          });
          return instanceToPlain(instance, {
            excludeExtraneousValues: true,
          }) as unknown as R;
        }
        return response;
      })
      .catch((e) => {
        if (fetchCustomConfig.debug) {
          throw Error(e);
        }
        fetchCustomConfig.onError?.(e);
        if (fetchCustomConfig.ignorErrors) {
          return;
        }
        const getValidationErrors = () => {
          const errors = {} as Record<string, string>;
          if (
            typeof e.response._data.message === "object" &&
            e.response._data.message !== null
          ) {
            for (const item in e.response._data.message) {
              e.response._data.message[item].forEach((subItem) => {
                errors[item] = subItem;
              });
            }
          }

          return errors;
        };
        if (e.response && e.response.status == 401) {
          return handleRefreshToken(e, url, config, fetchCustomConfig)?.catch(
            (e) => {
              authStore.clearToken();
              goToLoginIfYouShould(fetchCustomConfig);
            }
          ) as unknown as R;
        } else if (e.response && e.response.status == 422) {
          if (fetchCustomConfig.setErrors) {
            console.log("validation", getValidationErrors());
            fetchCustomConfig.setErrors(getValidationErrors());
          }
          if (fetchCustomConfig.onValidationFailed) {
            fetchCustomConfig.onValidationFailed(getValidationErrors(), e);
          }
          if (fetchCustomConfig.toastValidationFields) {
            fetchCustomConfig.toastValidationFields.forEach((item) => {
              if (getValidationErrors()[item]) {
                showToast({
                  message: getValidationErrors()[item],
                  type: ToastEnum.error,
                });
              }
            });
          }
          return;
        } else {
          if ((config.method || "").toLowerCase() == "get" || !config.method) {
            if (fetchCustomConfig.toastError) {
              showToast({
                message: "خطای دریافت اطلاعات از سرور",
                type: ToastEnum.error,
              });
            } else {
              showError({
                statusMessage:
                  e?.response?.statusText || "خطای دریافت اطلاعات از سرور",
                statusCode: e?.response?.status || 500,
              });
            }
          } else if (fetchCustomConfig.toastError) {
            showToast({
              message: "خطای دریافت اطلاعات از سرور",
              type: ToastEnum.error,
            });
          }
        }
      });
  };
  function goToLoginIfYouShould(customConfig: FetchCustomConfig) {
    if (customConfig.goToLogin != false) {
      router.replace("/auth");
    }
  }
  async function handleRefreshToken(
    e: FetchError,
    url: string,
    config: FetchOptions,
    customConfig: FetchCustomConfig
  ) {
    const authStore = useAuthStore();
    if (!authStore.isLoggedIn) {
      return new Promise((_, reject) => {
        console.error(
          "send request that needs token while user is not logged in"
        );
        reject(e);
      });
    }
    if (!authStore.isRefreshing && !authStore.isRefreshSuccess) {
      authStore.doRefreshToken();
    }
    return new Promise((resolve, reject) => {
      if (authStore.isRefreshSuccess) {
        resolve(myCustomFetch(url, config, customConfig));
      } else {
        watch(
          () => authStore.isRefreshing,
          (isRefreshing) => {
            if (isRefreshing == false) {
              if (authStore.isRefreshSuccess) {
                resolve(myCustomFetch(url, config, customConfig));
              } else {
                reject(e);
              }
            }
          }
        );
      }
    });
  }
  return myCustomFetch;
};
