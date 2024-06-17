import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardTitle } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { getAccessToken } from "@/utils/jwt";
import { useToast } from "../ui/use-toast";
import Loader from "../loader";
import { usePathId } from "@/hooks/use-pathid";
import useTopicStore from "@/features/topic";
import { taskService } from "@/api/task";

type Data = {
  title: string;
  description: string;
  loading: boolean;
};

function useCreateTask() {
  const { toast } = useToast();
  const storeCreateTask = useTopicStore((state) => state.createTask);
  const topicId = usePathId();
  const [data, setData] = useState<Data>({
    title: "",
    description: "",
    loading: false,
  });

  async function createTask() {
    const accessToken = getAccessToken()!;
    try {
      setData((prev) => ({ ...prev, loading: true }));
      const axiosRes = await taskService.createOne(
        {
          title: data.title,
          description: data.description,
          topicId,
        },
        accessToken
      );
      storeCreateTask({
        _id: axiosRes.data.taskId,
        title: data.title,
        description: data.description,
        topicId,
      });
      setData((prev) => ({
        ...prev,
        title: "",
        description: "",
        loading: false,
      }));
    } catch (error: any) {
      toast({
        title: "Cannot create task",
        description: error.response.data.message,
        variant: "destructive",
      });
      setData((prev) => ({ ...prev, loading: false }));
    }
  }

  return { data, setData, createTask };
}

function CreateTaskDialog() {
  const { data, setData, createTask } = useCreateTask();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col gap-4">
            <DialogTitle>Create topic task</DialogTitle>
          </div>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="task_title" className="w-fit">
              Task title
            </Label>
            <Input
              id="task_title"
              type="text"
              placeholder="Task one:"
              value={data.title}
              onChange={(e) => {
                setData((prev) => ({ ...prev, title: e.target.value }));
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="task_description" className="w-fit">
              Task description
            </Label>
            <Input
              id="task_description"
              type="text"
              placeholder="Task description"
              value={data.description}
              onChange={(e) => {
                setData((prev) => ({ ...prev, description: e.target.value }));
              }}
            />
          </div>
          <Button
            onClick={async () => {
              await createTask();
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

export default function CreateTask() {
  return (
    <Card className="flex items-center justify-between p-6">
      <CardTitle>Create new task</CardTitle>
      <CreateTaskDialog />
    </Card>
  );
}
