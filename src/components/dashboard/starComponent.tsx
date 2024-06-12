import { CardDescription } from "../ui/card";

interface Props {
  stars: number;
}

export default function StarComponent({ stars }: Props) {
  return (
    <div className="flex items-center gap-2">
      <CardDescription>{stars}</CardDescription>
      <img className="size-8" src="/star.svg" alt="star" />
    </div>
  );
}
