import ky from "ky";
import useUserStore from "./store/user.store";
import { HttpMethod, KyOptions } from "node_modules/ky/distribution/types/options";
import { Navigate } from "@tanstack/react-router";

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
      if (["post", "put"].includes(method)) {
        option.json = body;
      } else {
        const sp = body as Record<string, string>;
        option.searchParams = sp;
      }
    }

    const json = await ky[method]<T>(path, { ...option, credentials: "include" }).json();

    return {
      success: true,
      data: json
    };
  } catch (error: any) {
    if (error.name === "HTTPError") {
      const errorJson = await error.response.json();


      if ([401, 403].includes(errorJson.statusCode)) {
        location.href = "/";
        useUserStore.getState().logout();
      }

      alert(errorJson.message);
    }
  }

  return {
    success: false
  }
}
