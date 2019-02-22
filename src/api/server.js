import axios from "axios";
import config from "./config";
import Qs from "qs";
import util from "../components/util";
const safe = {
    token: util.queryString(window.location.href, 'token'),
    _t: 200,
    _app: 1
}

export default class Server {
    interceptors() {
        // http 请求 拦截器
        axios.interceptors.request.use(
            config => {
                return config;
            },
            err => {
                return Promise.reject(err);
            });
        // http 响应 拦截器
        axios.interceptors.response.use(
            response => {
                // if (response.status === 401) {
                //     sessionStorage.removeItem('user');
                //     routes.replace({
                //         path: '/login'
                //     })
                // }
                return response;
            },
            error => {
                return Promise.reject(error)
            });
    }
    axiosGet(url, params = {}, isForm = false) {
        return new Promise((resolve, reject) => {
            this.interceptors();
            let _options = {
                method: "get",
                url,
                baseURL: config.baseUrl,
                timeout: 10000,
                params: { ...params, ...safe },
                withCredentials: false, //携带cookie
                validateStatus: (status) => {
                    return status >= 200 && status < 500;
                },
            }
            axios.request(_options).then(res => {
                console.log(res)
                resolve(res.data);
            }, error => {
                if (error.response) {
                    reject(error.response);
                } else {
                    reject(error);
                }
            })

        })
    }
    axiosPost(url, params = {}) {
        return new Promise((resolve, reject) => {
            this.interceptors();
            let _options = {
                method: "post",
                url,
                baseURL: config.baseUrl,
                timeout: 10000,
                data: Qs.stringify({ ...params, ...safe }, { arrayFormat: 'brackets' }),
                withCredentials: false, //携带cookie
                validateStatus: (status) => {
                    return status >= 200 && status < 500;
                },
            }
            axios.request(_options).then(res => {
                resolve(res.data);
            }, error => {
                if (error.response) {
                    reject(error.response);
                } else {
                    reject(error);
                }
            })

        })
    }
}
