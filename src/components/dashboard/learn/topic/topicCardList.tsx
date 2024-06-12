import { TopicType } from "@/features/types";
import TopicCard from "./topicCard";

interface Props {
  list: TopicType[];
}

export default function TopicCardList({ list }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {list.map((topic) => (
        <TopicCard key={topic._id} {...topic} />
      ))}
    </div>
  );
}
