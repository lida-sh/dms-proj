import { isAuthRoute } from "~/helpers/authHelpers";
import { useAuthStore } from "./Auth.store";

export const useLogout = () => {
  const authStore = useAuthStore();
  const route = useRoute();
  const router = useRouter();
  const logout = async () => {
    authStore.clearToken();
    if (isAuthRoute(route.path)) {
      return router.replace("/admin/auth/login");
    }
  };
  return { logout };
};
