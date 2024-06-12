import { Badge } from "@/components/ui/badge";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { TopicDefinitionType } from "@/features/types";
import { cn } from "@/lib/utils";

interface ExampleProps {
  body: string;
}

function Example({ body }: ExampleProps) {
  return (
    <Badge className="flex items-center justify-center p-2 text-sm lg:text-xl lg:items-start lg:justify-start">
      {body}
    </Badge>
  );
}

interface Props extends TopicDefinitionType {}

export default function Definition({ title, description, examples }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {title && <CardTitle className="text-xl lg:text-3xl">{title}</CardTitle>}
      {description && (
        <CardDescription className="text-sm lg:text-xl">
          {description}
        </CardDescription>
      )}
      {examples.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold lg:text-xl">Examples</h3>
          <div
            className={cn("gap-2 grid grid-cols-1", {
              "md:grid-cols-2 lg:grid-cols-3": examples.length >= 10,
            })}
          >
            {examples.map((example, index) => (
              <Example key={`example-${index}`} body={example} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
