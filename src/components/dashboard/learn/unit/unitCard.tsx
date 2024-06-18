import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { UnitType } from "@/features/types";
import { Link } from "react-router-dom";

interface Props extends UnitType {}

export default function UnitCard({ _id, title }: Props) {
  return (
    <Card className="flex flex-col gap-8 px-4 py-6 text-white shadow-lg bg-gradient-to-r from-teal-400 to-teal-500 lg:gap-0 lg:flex-row lg:items-center lg:justify-between lg:h-28">
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      <Link to={`/dashboard/learn/units/${_id}`} className="w-full lg:w-fit">
        <Button className="w-full text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700">
          Explore
        </Button>
      </Link>
    </Card>
  );
}
