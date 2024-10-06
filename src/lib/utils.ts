import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function hasDiff(o1: any, o2: any) {
	const k1 = Object.keys(o1)
		.filter((s) => !["createdAt", "updatedAt"].includes(s))
		.sort();
	const k2 = Object.keys(o2)
		.filter((s) => !["createdAt", "updatedAt"].includes(s))
		.sort();

	if (k1.length !== k2.length && !k1.every((k) => k2.includes(k))) {
		console.error("타입이 동일하지 않습니다.");
		return false;
	}

	let e1;
	let e2;

	for (let i = 0; i < k1.length; i++) {
		e1 = o1[k1[i]];
		e2 = o2[k2[i]];

		if (e1 !== e2) return true;
	}

	return false;
}
