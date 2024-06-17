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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { UserStudyRole } from "@/features/types";
import { unitService } from "@/api/unit";
import { getAccessToken } from "@/utils/jwt";
import { useToast } from "../ui/use-toast";
import useUnitStore from "@/features/unit";
import Loader from "../loader";

type Data = {
  title: string;
  studyRole: UserStudyRole;
  loading: boolean;
};

function useCreateUnit() {
  const { toast } = useToast();
  const storeCreateUnit = useUnitStore((state) => state.createUnit);
  const [data, setData] = useState<Data>({
    title: "",
    studyRole: "student",
    loading: false,
  });

  async function createUnit() {
    const accessToken = getAccessToken()!;
    try {
      setData((prev) => ({ ...prev, loading: true }));
      const axiosRes = await unitService.createOne(
        {
          title: data.title,
          studyRole: data.studyRole,
        },
        accessToken
      );
      storeCreateUnit({
        _id: axiosRes.data.unitId,
        title: data.title,
        studyRole: data.studyRole,
      });
      setData((prev) => ({ ...prev, title: "", loading: false }));
    } catch (error: any) {
      toast({
        title: "Cannot create unit",
        description: error.response.data.message,
        variant: "destructive",
      });
      setData((prev) => ({ ...prev, loading: false }));
    }
  }

  return { data, setData, createUnit };
}

function CreateUnitDialog() {
  const { data, setData, createUnit } = useCreateUnit();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col gap-4">
            <DialogTitle>Create unit</DialogTitle>
          </div>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="unit_title" className="w-fit">
              Unit title
            </Label>
            <Input
              id="unit_title"
              type="text"
              placeholder="Unit 1"
              value={data.title}
              onChange={(e) => {
                setData((prev) => ({ ...prev, title: e.target.value }));
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="w-fit">Study role</Label>
            <Select
              value={data.studyRole}
              onValueChange={(v) => {
                setData((prev) => ({ ...prev, studyRole: v as UserStudyRole }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a study role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={async () => {
              await createUnit();
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

export default function CreateUnit() {
  return (
    <Card className="flex items-center justify-between p-6">
      <CardTitle>Create new unit</CardTitle>
      <CreateUnitDialog />
    </Card>
  );
}
