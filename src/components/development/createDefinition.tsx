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
import { topicService } from "@/api/topic";
import { usePathId } from "@/hooks/use-pathid";
import useTopicStore from "@/features/topic";
import { Badge } from "../ui/badge";

type Data = {
  title: string;
  description: string;
  example: string;
  examples: string[];
  loading: boolean;
};

function useCreateDefinition() {
  const { toast } = useToast();
  const storeCreateDefinition = useTopicStore(
    (state) => state.createDefinition
  );
  const topicId = usePathId();
  const [data, setData] = useState<Data>({
    title: "",
    description: "",
    example: "",
    examples: [],
    loading: false,
  });

  async function createDefinition() {
    const accessToken = getAccessToken()!;
    try {
      setData((prev) => ({ ...prev, loading: true }));
      const axiosRes = await topicService.createDefinition(
        {
          title: data.title,
          description: data.description,
          examples: data.examples,
          topicId,
        },
        accessToken
      );
      storeCreateDefinition({
        _id: axiosRes.data.definitionId,
        title: data.title,
        description: data.description,
        examples: data.examples,
        topicId,
      });
      setData((prev) => ({
        ...prev,
        title: "",
        description: "",
        example: "",
        examples: [],
        loading: false,
      }));
    } catch (error: any) {
      toast({
        title: "Cannot create definition",
        description: error.response.data.message,
        variant: "destructive",
      });
      setData((prev) => ({ ...prev, loading: false }));
    }
  }

  return { data, setData, createDefinition };
}

function CreateDefinitionDialog() {
  const { data, setData, createDefinition } = useCreateDefinition();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col gap-4">
            <DialogTitle>Create topic definition</DialogTitle>
          </div>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="definition_title" className="w-fit">
              Definition title
            </Label>
            <Input
              id="definition_title"
              type="text"
              placeholder="Definition 1"
              value={data.title}
              onChange={(e) => {
                setData((prev) => ({ ...prev, title: e.target.value }));
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="definition_description" className="w-fit">
              Definition description
            </Label>
            <Input
              id="definition_description"
              type="text"
              placeholder="Definition description"
              value={data.description}
              onChange={(e) => {
                setData((prev) => ({ ...prev, description: e.target.value }));
              }}
            />
          </div>
          <div className="flex items-end gap-4">
            <div className="flex flex-col w-full gap-2">
              <Label htmlFor="definition_example" className="w-fit">
                Definition example
              </Label>
              <Input
                id="definition_example"
                type="text"
                placeholder="Definition example"
                className="w-full"
                value={data.example}
                onChange={(e) => {
                  setData((prev) => ({ ...prev, example: e.target.value }));
                }}
              />
            </div>
            <Button
              onClick={() => {
                setData((prev) => {
                  const updatedExamples = [...prev.examples, data.example];
                  return { ...prev, examples: updatedExamples, example: "" };
                });
              }}
            >
              Add
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {data.examples.map((example) => {
              return <Badge>{example}</Badge>;
            })}
          </div>
          <Button
            onClick={async () => {
              await createDefinition();
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

export default function CreateDefinition() {
  return (
    <Card className="flex items-center justify-between p-6">
      <CardTitle>Create new definition</CardTitle>
      <CreateDefinitionDialog />
    </Card>
  );
}
