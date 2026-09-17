import axios from "axios";

const api = axios.create({
  baseURL:
    (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_URL),
});

api.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined") {
    const { getSession } = await import("next-auth/react");
    const session: any = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
  }
  return config;
});

export default api;