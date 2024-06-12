import { UnitType } from "@/features/types";
import UnitCard from "./unitCard";

interface Props {
  list: UnitType[];
}

export default function UnitCardList({ list }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {list.map((unit) => (
        <UnitCard key={unit._id} {...unit} />
      ))}
    </div>
  );
}
