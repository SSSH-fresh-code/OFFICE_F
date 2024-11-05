import type { MainPageDto, Page } from "sssh-library";
import { req } from "../api";

/**
 * 메인 페이지 조회 key
 * @param Record<string, unknown> & { where__type?: string } params
 */
export const readMainPageKey = () => ["main", "page"];

/**
 * 메인 페이지 조회 api - get /blog
 * @param readMainPageKey params
 */
export const readMainPageApi = () => req<MainPageDto>("blog", "get");
