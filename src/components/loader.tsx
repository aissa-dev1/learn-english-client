import { cn } from "@/lib/utils";

interface Props {
  parentClassName?: string;
  childClassName?: string;
}

export default function Loader({ parentClassName, childClassName }: Props) {
  return (
    <div
      className={cn(
        "flex items-center justify-center relative size-6",
        parentClassName
      )}
    >
      <div
        className={cn(
          "absolute size-6 border-4 border-pink-500 rounded-full !border-t-transparent animate-spin",
          childClassName
        )}
      ></div>
    </div>
  );
}
