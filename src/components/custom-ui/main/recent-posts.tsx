import { useNavigate } from "@tanstack/react-router";
import { convertUnderbar, type Page, type ReadPostDto } from "sssh-library";
import MainBox from "./main-box";
import { Card, CardContent } from "@/components/ui/card";

function RecentPosts({
  recentPosts,
}: {
  recentPosts: Page<ReadPostDto>;
}) {
  const navigate = useNavigate();
  const posts = recentPosts.data;

  const onClickPost = (title: string) => {
    if (confirm("해당 게시글로 이동하시겠습니까?")) {
      navigate({ to: `/post/${title}` });
    }
  }

  return (
    <MainBox title="최근 작성한 게시글" description="가장 최근에 작성된 게시글 5개입니다.">
      <>
        {posts?.map((m) => (
          <Card className="px-1 py-5 cursor-pointer hover:bg-gray-100" key={`recent-post-${m.id}`} onClick={() => onClickPost(m.title)}>
            <CardContent className="px-3 py-0">
              <h1 className="flex items-center">
                <span className="font-light text-gray-400 text-sm mr-2">
                  {m.id}
                </span>
                <span className="text-lg font-bold">
                  {convertUnderbar(
                    m.title.substring(0, 17) +
                    (m.title.length > 17 ? "..." : ""),
                    true,
                  )}
                </span>
              </h1>
              <p className="text-[12px] font-lighter text-gray-400">
                {m.content.substring(0, 130) +
                  (m.content.length > 130 ? "..." : "")}
              </p>
              <p className="mt-3 text-xs text-gray-400">
                주제 : {m.topic.name} {m.series ? "| 시리즈 :" + m.series.name : ""} | {new Date(m.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </>
    </MainBox>
  );
}

export default RecentPosts;
