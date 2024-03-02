import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { SERVER_URL } from "./redux/config";

interface RetryConfig extends AxiosRequestConfig {
    retry: number,
    delay: number
}

export const globalConfig: RetryConfig = {
    retry: 3,
    delay: 2000
}

const customAxios = axios.create({
    baseURL: `${SERVER_URL}/api`,
});

customAxios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    }
)

customAxios.interceptors.response.use(
    (response) => response,
    async (err: AxiosError) => {

        const config = err.config as RetryConfig;
        console.log("customAxios: error");
        console.log("expired?: ", err.response!.headers["is_token_expired"]);
        if (err.response) {
            if (err.response.status === 401) {
                try {
                    const oldAccessToken = localStorage.getItem("accessToken");
                    const oldRefreshToken = localStorage.getItem("refreshToken");
                    const response = await axios.post(`${SERVER_URL}/api/auth/refreshToken`, {
                        accessToken: oldAccessToken,
                        refreshToken: oldRefreshToken
                    });
                    const { accessToken, refreshToken } = response.data;
                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                    // await dispatch(setAccessToken(accessToken));
                    // if (!config || !config!.retry) {
                    //     return Promise.reject(err);
                    // }
                    // config.retry -= 1;
                    // const delayRetryRequest = new Promise<void>((resolve) => {
                    //     setTimeout(() => {
                    //         console.log("retry the request", config.url);
                    //         resolve();
                    //     }, config.delay || 1000)
                    // })
                    // return delayRetryRequest.then(() => customAxios(config));
                    return customAxios(config);
                }
                catch (e) {
                    window.history.replaceState({}, '', `${SERVER_URL}/api/`);
                    console.log(e);
                    return Promise.reject(e);
                }
            }
        }
        return Promise.reject(err);
    }
)

export default customAxios;