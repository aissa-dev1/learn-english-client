import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useState } from "react";

interface Props {
  _id: string;
  body: string;
  rightAnswerId: string;
}

function QuestionDrawer({ body }: Props) {
  const [answer, setAnswer] = useState("");

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
        <DrawerFooter>
          <Button>Submit</Button>
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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{props.body}</CardTitle>
          <QuestionDrawer {...props} />
        </div>
      </CardHeader>
    </Card>
  );
}
