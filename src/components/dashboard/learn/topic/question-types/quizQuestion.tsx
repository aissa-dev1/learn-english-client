import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSubmitUserAnswer } from "@/hooks/user-answer/use-submit-user-answer";
import { useState } from "react";

interface Props {
  _id: string;
  body: string;
  options: string[];
}

function QuestionDrawer({ _id, body, options }: Props) {
  const [answer, setAnswer] = useState(options[0]);
  const { submitUserAnswertData, submitUserAnswer } = useSubmitUserAnswer();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Choose</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex flex-col gap-4">
          <DrawerTitle>{body}</DrawerTitle>
          <RadioGroup
            defaultValue={answer}
            onValueChange={(value) => {
              setAnswer(value);
            }}
          >
            {options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </DrawerHeader>
        <DrawerFooter className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-2">
          <Button
            onClick={async () => {
              await submitUserAnswer(answer, _id);
            }}
          >
            {submitUserAnswertData.loading ? (
              <Loader childClassName="border-white" />
            ) : (
              "Submit"
            )}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default function QuizQuestion(props: Props) {
  return (
    <Card className="flex flex-col gap-4 px-4 py-6 lg:flex-row lg:items-center lg:justify-between">
      <CardTitle>{props.body}</CardTitle>
      <QuestionDrawer {...props} />
    </Card>
  );
}
