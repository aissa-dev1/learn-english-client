import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useDeleteAccount from "@/hooks/user/use-delete-account";

export default function DeleteAccountDialog() {
  const { deleteAccountData, setDeleteAccountData, deleteAccount } =
    useDeleteAccount();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col gap-4">
            <DialogTitle>Delete Your Account</DialogTitle>
            <div className="flex flex-col gap-2">
              <DialogDescription>
                This will delete all existing information in your account.
              </DialogDescription>
              <DialogDescription>
                Deleting your account can NOT be reversed.
              </DialogDescription>
              <DialogDescription>
                Type{" "}
                <span className="text-sm font-bold text-destructive">
                  delete my account
                </span>{" "}
                in the text box below and click the delete button.
              </DialogDescription>
            </div>
            <Input
              type="text"
              value={deleteAccountData.confirmText}
              onChange={(e) => {
                setDeleteAccountData((prev) => ({
                  ...prev,
                  confirmText: e.target.value,
                }));
              }}
            />
          </div>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-2">
          <DialogTrigger className="col-span-1" asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <Button
            className="col-span-3"
            variant="destructive"
            onClick={async () => {
              await deleteAccount();
            }}
          >
            {deleteAccountData.loading ? (
              <Loader childClassName="border-white" />
            ) : (
              "Delete My Account"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
