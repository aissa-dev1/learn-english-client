import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {}

export default function Container({ className, children, ...rest }: Props) {
  return (
    <div className={cn("container", className)} {...rest}>
      {children}
    </div>
  );
}
