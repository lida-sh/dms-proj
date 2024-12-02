import { CLIENT_ID, CLIENT_SECRET } from "../api/api.config";
import { useFetchApi } from "../api/useFetchApi";
import type { AuthTokens } from "./Auth.interface";

export const useRefreshTokenService = () => {
  const fetchData = useFetchApi();
  return (refreshToken: string):Promise<{tokens: AuthTokens}|undefined> =>
    fetchData(
      "/refresh",
      {
        method: "POST",
        body: {
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          scope: "",
        },
      },
      { ignorErrors: true }
    ).then((response:any) => {
      if (response !== undefined) {
        const { access_token, refresh_token, expires_in } = response;
        return {
          tokens: {
            accessToken: access_token,
            refreshToken: refresh_token,
            expiresIn: new Date().getTime() + expires_in * 1000,
          },
        };
      }
    });
};
