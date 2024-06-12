import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdatePassword } from "@/hooks/user/use-update-password";

export default function ChangePasswordDialog() {
  const { updatePasswordData, setUpdatePasswordData, updatePassword } =
    useUpdatePassword();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Change</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col gap-4">
            <DialogTitle>Change Your Password</DialogTitle>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="current_password" className="w-fit">
                  Current Password
                </Label>
                <Input
                  type="password"
                  id="current_password"
                  placeholder="@pass@word"
                  value={updatePasswordData.currentPassword}
                  onChange={(e) => {
                    setUpdatePasswordData((prev) => ({
                      ...prev,
                      currentPassword: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="new_password" className="w-fit">
                  New Password
                </Label>
                <Input
                  type="password"
                  id="new_password"
                  placeholder="@pass@word@"
                  value={updatePasswordData.newPassword}
                  onChange={(e) => {
                    setUpdatePasswordData((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="rnew_password" className="w-fit">
                  Repeat New Password
                </Label>
                <Input
                  type="password"
                  id="rnew_password"
                  placeholder="@pass@word@"
                  value={updatePasswordData.rNewPassword}
                  onChange={(e) => {
                    setUpdatePasswordData((prev) => ({
                      ...prev,
                      rNewPassword: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
          </div>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-2">
          <DialogTrigger className="col-span-1" asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <Button
            className="col-span-3"
            onClick={async () => {
              await updatePassword();
            }}
          >
            {updatePasswordData.loading ? (
              <Loader childClassName="border-white" />
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
