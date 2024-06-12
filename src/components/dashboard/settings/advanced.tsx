import { CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import LogoutDialog from "./logoutDialog";
import DeleteAccountDialog from "./deleteAccountDialog";
import ChangePasswordDialog from "./changePasswordDialog";

export default function AdvancedSettings() {
  return (
    <div className="flex flex-col gap-4">
      <CardTitle className="text-xl">Advanced</CardTitle>
      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="change_password" className="w-fit">
            Change password
          </Label>
          <ChangePasswordDialog />
        </div>
        <div className="flex items-center justify-between">
          <LogoutDialog />
          <DeleteAccountDialog />
        </div>
      </div>
    </div>
  );
}
