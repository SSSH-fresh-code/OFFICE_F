import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import useSsshStore from "@/lib/store/sssh.store";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { createFileRoute } from "@tanstack/react-router";
import { convertUnderbar, ReadPostDto } from "sssh-library";

export const Route = createFileRoute("/")({
	beforeLoad: () => {
		useSsshStore.getState().setTitle("");
	},
	component: () => <MainPage />,
});

function MainPage() {
	return (
		<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
			{<RecentPosts />}
			<Card>
				<CardContent className="overflow-auto aspect-square"></CardContent>
			</Card>
		</div>
	);
}

function RecentPosts() {
	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle>최근 작성한 게시글</CardTitle>
				<CardDescription className="text-gray-400">
					가장 최근에 작성된 게시글 5개입니다.
				</CardDescription>
			</CardHeader>
			<CardContent className="p-3">
				<ScrollArea className="overflow-auto h-64 grid gap-3  scrollbar-hide md:h-full md:aspect-square">
					{[1, 2, 3, 4, 5].map((m, i) => (
						<Card className="px-1 py-5" key={`recent-post-${i}`}>
							<CardContent className="px-3">
								<h1>제목입니당{m}</h1>
							</CardContent>
						</Card>
					))}
				</ScrollArea>
			</CardContent>
		</Card>
	);
}

function RecentPost(post: ReadPostDto) {
	return (
		<Card className="px-1 py-5">
			<CardContent className="px-3">
				<h1>{convertUnderbar(post.title, true)}</h1>
			</CardContent>
		</Card>
	);
}
