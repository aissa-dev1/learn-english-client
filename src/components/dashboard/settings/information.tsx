import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/features/user";
import { useUpdateUsername } from "@/hooks/user/use-update-username";
import { useEffect } from "react";

export default function InformationSettings() {
  const userName = useUserStore((state) => state.userName);
  const { updateUserNameData, setUpdateUserNameData, updateUserName } =
    useUpdateUsername();

  useEffect(() => {
    setUpdateUserNameData((prev) => ({ ...prev, userName }));
  }, [userName]);

  return (
    <div className="flex flex-col gap-3">
      <CardTitle className="text-xl">Information</CardTitle>
      <div className="grid grid-cols-1 gap-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="change_name" className="w-fit">
            Change name
          </Label>
          <div className="flex gap-2">
            <Input
              type="text"
              id="change_name"
              placeholder="someone"
              value={updateUserNameData.userName}
              onChange={(e) => {
                setUpdateUserNameData((prev) => ({
                  ...prev,
                  userName: e.target.value,
                }));
              }}
            />
            <Button
              onClick={async () => {
                await updateUserName();
              }}
            >
              {updateUserNameData.loading ? (
                <Loader childClassName="border-white" />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
