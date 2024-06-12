import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { UnitType } from "@/features/types";
import { Link } from "react-router-dom";

interface Props extends UnitType {}

export default function UnitCard({ _id, title }: Props) {
  return (
    <Card className="flex items-center justify-between px-6 text-white shadow-lg bg-slate-500 h-28">
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      <Link to={`/dashboard/learn/units/${_id}`}>
        <Button className="text-slate-100 bg-slate-600 hover:bg-slate-700">
          Explore
        </Button>
      </Link>
    </Card>
  );
}
