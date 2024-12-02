export const isProd = process.env.NODE_ENV === "production";
// export const BASE_URL = "http://dms.test/api";
export const BASE_URL = "http://localhost:3000/service/api";
// export const BASE_URL = "http://localhost:3000/service/api";
export const PROXY_CONFIG = isProd ? {} : {
    '/service/':{
        target: "http://dms.test", changeOrigin:true, pathRewrite: {
            '^/service/': ''
        }
    }
};
export const CLIENT_ID = 3
export const CLIENT_SECRET = "3e4JNfhBIThjvRiUACMN3KaRltQYsGPS3Env6CC7"
