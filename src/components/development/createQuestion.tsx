import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getAccessToken } from "@/utils/jwt";
import { useToast } from "../ui/use-toast";
import Loader from "../loader";
import useTopicStore from "@/features/topic";
import { taskService } from "@/api/task";
import { TopicQuestionAnswerType } from "@/features/types";
import { Badge } from "../ui/badge";

type Data = {
  body: string;
  answerType: TopicQuestionAnswerType;
  option: string;
  options: string[];
  rightAnswerBody: string;
  loading: boolean;
};

type Props = {
  taskId: string;
};

function useCreateQuestion() {
  const { toast } = useToast();
  const storeCreateQuestion = useTopicStore((state) => state.createQuestion);
  const [data, setData] = useState<Data>({
    body: "",
    answerType: "question_answer",
    option: "",
    options: [],
    rightAnswerBody: "",
    loading: false,
  });

  async function createQuestion(taskId: string) {
    const accessToken = getAccessToken()!;
    try {
      setData((prev) => ({ ...prev, loading: true }));
      const axiosRes = await taskService.createQuestion(
        {
          body: data.body,
          answerType: data.answerType,
          options: data.options,
          taskId,
          rightAnswerBody: data.rightAnswerBody,
        },
        accessToken
      );
      storeCreateQuestion({
        _id: axiosRes.data.questionId,
        body: data.body,
        answerType: data.answerType,
        options: data.options,
        taskId,
        rightAnswerId: axiosRes.data.rightAnswerId,
      });
      setData((prev) => ({
        ...prev,
        body: "",
        option: "",
        options: [],
        rightAnswerBody: "",
        loading: false,
      }));
    } catch (error: any) {
      toast({
        title: "Cannot create question",
        description: error.response.data.message,
        variant: "destructive",
      });
      setData((prev) => ({ ...prev, loading: false }));
    }
  }

  return { data, setData, createQuestion };
}

function CreateQuestionDialog({ taskId }: Props) {
  const { data, setData, createQuestion } = useCreateQuestion();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Question</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col gap-4">
            <DialogTitle>Create task question</DialogTitle>
          </div>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex flex-col gap-2">
            <Label className="w-fit">Answer type</Label>
            <Select
              value={data.answerType}
              onValueChange={(v) => {
                setData((prev) => ({
                  ...prev,
                  answerType: v as TopicQuestionAnswerType,
                }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an answer type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="question_answer">
                  Question & Answer
                </SelectItem>
                <SelectItem value="true_false">True & False</SelectItem>
                <SelectItem value="define_word">Define the word</SelectItem>
                <SelectItem value="write_paragraph">
                  Write a paragraph
                </SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="question_body" className="w-fit">
              Question body
            </Label>
            <Input
              id="question_body"
              type="text"
              placeholder="What color of the sky?"
              value={data.body}
              onChange={(e) => {
                setData((prev) => ({ ...prev, body: e.target.value }));
              }}
            />
          </div>
          {data.answerType === "quiz" && (
            <>
              <div className="flex items-end gap-4">
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="question_option" className="w-fit">
                    Question option
                  </Label>
                  <Input
                    id="question_option"
                    type="text"
                    placeholder="Question option"
                    className="w-full"
                    value={data.option}
                    onChange={(e) => {
                      setData((prev) => ({ ...prev, option: e.target.value }));
                    }}
                  />
                </div>
                <Button
                  onClick={() => {
                    setData((prev) => {
                      const updatedOptions = [...prev.options, data.option];
                      return {
                        ...prev,
                        options: updatedOptions,
                        option: "",
                      };
                    });
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {data.options.map((option) => {
                  return <Badge>{option}</Badge>;
                })}
              </div>
            </>
          )}
          <div className="flex flex-col gap-2">
            <Label htmlFor="right_answer" className="w-fit">
              Right answer
            </Label>
            <Input
              id="right_answer"
              type="text"
              placeholder="Red"
              value={data.rightAnswerBody}
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  rightAnswerBody: e.target.value,
                }));
              }}
            />
          </div>
          <Button
            onClick={async () => {
              await createQuestion(taskId);
            }}
          >
            {data.loading ? <Loader childClassName="border-white" /> : "Create"}
          </Button>
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function CreateQuestion({ taskId }: Props) {
  return <CreateQuestionDialog taskId={taskId} />;
}
