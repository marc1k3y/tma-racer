import axios from "axios";
import { NODEJS_HOST } from "./const";

const baseURL = `${NODEJS_HOST}/api/`;

const $authHost = axios.create({ baseURL });
const $host = axios.create({ baseURL });

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
}
$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };