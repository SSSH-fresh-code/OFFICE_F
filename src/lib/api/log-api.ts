import type { LogDto, Page } from "sssh-library";
import { req } from "../api";

/**
 * 로그 조회 key
 * @param Record<string, unknown> & { where__type?: string } params
 */
export const readLogsKey = (
	params: Record<string, unknown> & {
		where__businessType: string;
		where__dataType: string;
	},
) => [
	"log",
	"list",
	params.page,
	params.take,
	params.direction,
	params.orderby,
	params.where__businessType,
	params.where__dataType,
];

/**
 * 로그 조회 api - get /log
 * @param readLogKey params
 */
export const readLogsApi = (
	params: Record<string, unknown> & {
		where__businessType: string;
		where__dataType: string;
	},
) => req<Page<LogDto>>("log", "get", params);

/**
 * 로그 단건 조회
 * @param string id
 */
export const readLogKey = (id: string) => ["log", "single", id];

/**
 * 챗봇 조회 - get /log
 * @param string id
 */
export const readLogApi = (id: string) => req<LogDto>(`log/${id}`, "get");
