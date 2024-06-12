import Loader from "@/components/loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSubmitUserAnswer } from "@/hooks/user-answer/use-submit-user-answer";
import { useState } from "react";

interface Props {
  _id: string;
  body: string;
}

function QuestionDialog({ _id, body }: Props) {
  const [answer, setAnswer] = useState("");
  const { submitUserAnswertData, submitUserAnswer } = useSubmitUserAnswer();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Answer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col gap-4">
            <DialogTitle>{body}</DialogTitle>
            <div className="grid grid-cols-2 gap-4">
              <Badge
                variant={answer === "false" ? "default" : "outline"}
                className="flex items-center justify-center p-1 cursor-pointer"
                onClick={() => {
                  setAnswer("false");
                }}
              >
                False
              </Badge>
              <Badge
                variant={answer === "true" ? "default" : "outline"}
                className="flex items-center justify-center p-1 cursor-pointer"
                onClick={() => {
                  setAnswer("true");
                }}
              >
                True
              </Badge>
            </div>
          </div>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-2">
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
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function TrueFalseQuestion(props: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{props.body}</CardTitle>
          <QuestionDialog {...props} />
        </div>
      </CardHeader>
    </Card>
  );
}
