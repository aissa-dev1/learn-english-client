import { TopicDefinitionType } from "@/features/types";
import Definition from "./definition";

interface Props {
  list: TopicDefinitionType[];
}

export default function Definitions({ list }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {list.map((definition) => (
        <Definition key={definition._id} {...definition} />
      ))}
    </div>
  );
}
