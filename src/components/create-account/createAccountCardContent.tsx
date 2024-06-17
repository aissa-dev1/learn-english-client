import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import AuthCardItem from "../auth/authCardItem";
import { Switch } from "../ui/switch";
import { useCreateAccount } from "@/hooks/auth/use-create-account";
import Loader from "../loader";
import { UserStudyField, UserStudyRole } from "@/features/types";

export default function CreateAccountCardContent() {
  const { createAccountData, setCreateAccountData, createAccount } =
    useCreateAccount();

  return (
    <CardContent className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <AuthCardItem>
        <Label htmlFor="email" className="w-fit">
          Email
        </Label>
        <Input
          id="email"
          type="text"
          placeholder="youraddress@mail.com"
          value={createAccountData.email}
          onChange={(e) => {
            setCreateAccountData((prev) => ({
              ...prev,
              email: e.target.value,
            }));
          }}
        />
      </AuthCardItem>
      <AuthCardItem>
        <Label htmlFor="password" className="w-fit">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="@pass@word"
          value={createAccountData.password}
          onChange={(e) => {
            setCreateAccountData((prev) => ({
              ...prev,
              password: e.target.value,
            }));
          }}
        />
      </AuthCardItem>
      <AuthCardItem>
        <Label htmlFor="username" className="w-fit">
          User Name
        </Label>
        <Input
          id="username"
          type="text"
          placeholder="someone"
          value={createAccountData.userName}
          onChange={(e) => {
            setCreateAccountData((prev) => ({
              ...prev,
              userName: e.target.value,
            }));
          }}
        />
      </AuthCardItem>
      <AuthCardItem>
        <Label className="w-fit">Study field</Label>
        <Select
          value={createAccountData.field}
          onValueChange={(value) => {
            setCreateAccountData((prev) => ({
              ...prev,
              field: value as UserStudyField,
            }));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a study field" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="law">Law</SelectItem>
          </SelectContent>
        </Select>
      </AuthCardItem>
      <AuthCardItem>
        <Label className="w-fit">Study role</Label>
        <Select
          value={createAccountData.studyRole}
          onValueChange={(value) => {
            setCreateAccountData((prev) => ({
              ...prev,
              studyRole: value as UserStudyRole,
            }));
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
      </AuthCardItem>
      <div className="flex items-center justify-between">
        <Label>Agree to our terms and policy</Label>
        <Switch
          checked={createAccountData.termsAgree}
          onClick={() => {
            setCreateAccountData((prev) => ({
              ...prev,
              termsAgree: !prev.termsAgree,
            }));
          }}
        />
      </div>
      <AuthCardItem className="lg:col-span-2 md:grid md:grid-cols-2 md:gap-4">
        <Button
          onClick={async () => {
            await createAccount();
          }}
        >
          {createAccountData.loading ? <Loader /> : "Create account"}
        </Button>
        <Link to="/login">
          <Button className="w-full" variant="outline">
            Login
          </Button>
        </Link>
      </AuthCardItem>
    </CardContent>
  );
}
