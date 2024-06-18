import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { TopicType } from "@/features/types";
import { Link } from "react-router-dom";

interface Props extends TopicType {}

export default function TopicCard({ _id, title, unitId }: Props) {
  return (
    <Card className="flex flex-col gap-8 px-4 py-6 text-white shadow-lg bg-gradient-to-l from-teal-300 to-teal-400 lg:gap-0 lg:flex-row lg:items-center lg:justify-between lg:h-28">
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      <Link
        to={`/dashboard/learn/units/${unitId}/topics/${_id}`}
        className="w-full lg:w-fit"
      >
        <Button className="w-full text-white bg-gradient-to-l from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600">
          Start
        </Button>
      </Link>
    </Card>
  );
}
