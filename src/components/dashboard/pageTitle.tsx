import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"h3"> {}

export default function PageTitle({ className, children, ...rest }: Props) {
  return (
    <h3
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...rest}
    >
      {children}
    </h3>
  );
}
