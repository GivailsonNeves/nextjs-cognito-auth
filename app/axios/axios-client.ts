import { fetchAuthSession } from "aws-amplify/auth";
import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 60000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        return new Promise(async (resolve) => {
            const session = await fetchAuthSession();

            if (session) {
                config.headers.Authorization = `Bearer ${session.tokens?.idToken?.toString()}`;
            }

            return resolve(config);
        });
    },
    (error) => {
        console.log("error", error);
        return Promise.reject(error);
    }
);

export { axiosClient };
