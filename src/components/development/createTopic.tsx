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
import useUnitStore from "@/features/unit";
import Loader from "../loader";
import { topicService } from "@/api/topic";
import { usePathId } from "@/hooks/use-pathid";

type Data = {
  title: string;
  description: string;
  loading: boolean;
};

function useCreateTopic() {
  const { toast } = useToast();
  const storeCreateTopic = useUnitStore((state) => state.createTopic);
  const unitId = usePathId();
  const [data, setData] = useState<Data>({
    title: "",
    description: "",
    loading: false,
  });

  async function createTopic() {
    const accessToken = getAccessToken()!;
    try {
      setData((prev) => ({ ...prev, loading: true }));
      const axiosRes = await topicService.createOne(
        {
          title: data.title,
          description: data.description,
          unitId,
        },
        accessToken
      );
      storeCreateTopic({
        _id: axiosRes.data.topicId,
        title: data.title,
        description: data.description,
        unitId,
      });
      setData((prev) => ({
        ...prev,
        title: "",
        description: "",
        loading: false,
      }));
    } catch (error: any) {
      toast({
        title: "Cannot create topic",
        description: error.response.data.message,
        variant: "destructive",
      });
      setData((prev) => ({ ...prev, loading: false }));
    }
  }

  return { data, setData, createTopic };
}

function CreateTopicDialog() {
  const { data, setData, createTopic } = useCreateTopic();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col gap-4">
            <DialogTitle>Create topic</DialogTitle>
          </div>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="topic_title" className="w-fit">
              Topic title
            </Label>
            <Input
              id="topic_title"
              type="text"
              placeholder="Topic 1"
              value={data.title}
              onChange={(e) => {
                setData((prev) => ({ ...prev, title: e.target.value }));
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="topic_description" className="w-fit">
              Topic description
            </Label>
            <Input
              id="topic_description"
              type="text"
              placeholder="Topic description"
              value={data.description}
              onChange={(e) => {
                setData((prev) => ({ ...prev, description: e.target.value }));
              }}
            />
          </div>
          <Button
            onClick={async () => {
              await createTopic();
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

export default function CreateTopic() {
  return (
    <Card className="flex items-center justify-between p-6">
      <CardTitle>Create new topic</CardTitle>
      <CreateTopicDialog />
    </Card>
  );
}
