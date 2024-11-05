import { Route } from "@/routes/index.route";
import RecentMessages from "./recent-messages";
import RecentPosts from "./recent-posts";
import { Ellipsis } from "lucide-react";
import { Card } from "@/components/ui/card";

function MainPage() {
	const { data } = Route.useLoaderData();

	const boxes = [];
	const recentPosts = data?.recentPosts;
	const recentMessages = data?.recentMessage;

	if (recentPosts) boxes.push(<RecentPosts recentPosts={recentPosts} />);
	if (recentMessages)
		boxes.push(<RecentMessages recentMessages={recentMessages} />);

	return (
		<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
			{boxes.length < 0 ? (
				boxes.map((b) => b)
			) : (
				<Card className="col-span-2 h-64 flex flex-col justify-center items-center md:py-15">
					<Ellipsis />
					<p className="font-light text-md text-gray-400">
						어라...? 조회권한이 없으시네요...
					</p>
				</Card>
			)}
		</div>
	);
}
export default MainPage;
