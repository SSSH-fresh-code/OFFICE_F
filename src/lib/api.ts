import ky from "ky";
import useUserStore from "./store/user.store";
import { HttpMethod, KyOptions } from "node_modules/ky/distribution/types/options";

export type Res<T> = {
  success: boolean,
  data?: T
}

export async function req<T>(path: string, method: HttpMethod = "get", body?: object): Promise<Res<T>> {
  try {
    const option: KyOptions = {
      prefixUrl: import.meta.env.VITE_API_URL,
    };

    if (body) {
      option.json = body;
    }

    const json = await ky[method]<T>(path, { ...option, credentials: "include" }).json();

    return {
      success: true,
      data: json
    };
  } catch (error: any) {
    if (error.name === "HTTPError") {
      const errorJson = await error.response.json();

      alert(errorJson.message);

      if (errorJson.status === 401) {
        useUserStore.getState().logout();
      }
    }
  }

  return {
    success: false
  }
}

