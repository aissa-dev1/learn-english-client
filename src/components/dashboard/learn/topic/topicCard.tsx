import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { TopicType } from "@/features/types";
import { Link } from "react-router-dom";

interface Props extends TopicType {}

export default function TopicCard({ _id, title, unitId }: Props) {
  return (
    <Card className="flex items-center justify-between px-6 h-28">
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      <Link to={`/dashboard/learn/units/${unitId}/topics/${_id}`}>
        <Button variant="outline">Start</Button>
      </Link>
    </Card>
  );
}
