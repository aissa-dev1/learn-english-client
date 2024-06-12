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
import { useLogout } from "@/hooks/auth/use-logout";

export default function LogoutDialog() {
  const { logoutData, logout } = useLogout();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Log out</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to log out?</DialogTitle>
          <DialogDescription>
            You will be redirected to the login page.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-2">
          <DialogTrigger className="col-span-1" asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <Button
            variant="default"
            className="col-span-3"
            onClick={async () => {
              await logout();
            }}
          >
            {logoutData.loading ? (
              <Loader childClassName="border-white" />
            ) : (
              "Confirm"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
