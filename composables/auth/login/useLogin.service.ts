import type { InferType } from "yup";
import { useLoginValidation } from "./useLogin.validation";
import { useFetchApi } from "~/composables/api/useFetchApi";
import type { FetchCustomConfig } from "~/composables/api/FetchCustomConfig";
import { CLIENT_ID, CLIENT_SECRET } from "~/composables/api/api.config";

export const useLoginService = () => {
  const fetchData = useFetchApi();
  const { schema } = useLoginValidation();
  const login = (
    { username, password }: InferType<typeof schema>,
    customConfig: FetchCustomConfig = {}
  ) => {
    return fetchData(
      "/login",
      {
        method: "POST",
        body: {
          username,
          password,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        },
      },
      customConfig
    ).then((response: any) => {
      if (response !== undefined) {
          const { access_token, refresh_token, expires_in, identity } = response.data;
        return {
          tokens: {
            accessToken: access_token,
            refreshToken: refresh_token,
            expiresIn: new Date().getTime() + expires_in * 1000,
          },
          identity: identity,
        };
      }
      return response;
    });
  };
  return { login };
};
