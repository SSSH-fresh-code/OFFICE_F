import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type { ReactNode } from "react";

function SsshDropdownMenuItem({
	children,
	onClick,
}: {
	children: ReactNode;
	onClick: () => void;
}) {
	return (
		<DropdownMenuItem
			onClick={onClick}
			className="cursor-pointer hover:bg-gray-100 text-sm font-light"
		>
			{children}
		</DropdownMenuItem>
	);
}

export default SsshDropdownMenuItem;
