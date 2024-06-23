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
import { Input } from "@/components/ui/input";
import { useSubmitUserAnswer } from "@/hooks/user-answer/use-submit-user-answer";
import { useState } from "react";

interface Props {
  _id: string;
  body: string;
  rightAnswerId: string;
}

function QuestionDrawer({ _id, body }: Props) {
  const [answer, setAnswer] = useState("");
  const { submitUserAnswertData, submitUserAnswer } = useSubmitUserAnswer();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Define</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex flex-col gap-4">
          <DrawerTitle>{body}</DrawerTitle>
          <Input
            type="text"
            placeholder="Your definition..."
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
          />
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

export default function DefineQuestion(props: Props) {
  return (
    <Card className="flex flex-col gap-4 px-4 py-6 lg:flex-row lg:items-center lg:justify-between">
      <CardTitle>{props.body}</CardTitle>
      <QuestionDrawer {...props} />
    </Card>
  );
}
