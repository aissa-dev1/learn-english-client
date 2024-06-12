import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import Container from "./container";

interface Props extends ComponentProps<"div"> {
  title: string;
}

export default function Header({ className, title, ...rest }: Props) {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full flex flex-col justify-center h-24 shadow-sm shadow-black/10 bg-opacity-25 backdrop-blur-lg backdrop-filter z-10",
        className
      )}
      {...rest}
    >
      <Container className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        <img className="w-20" src="/pea.jpg" alt="logo" />
      </Container>
    </div>
  );
}
