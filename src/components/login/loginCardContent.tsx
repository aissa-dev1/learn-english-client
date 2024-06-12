import { Link } from "react-router-dom";
import { CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import AuthCardItem from "../auth/authCardItem";
import { useLogin } from "@/hooks/auth/use-login";
import Loader from "../loader";

export default function LoginCardContent() {
  const { loginData, setLoginData, login } = useLogin();

  return (
    <CardContent className="grid grid-cols-1 gap-4">
      <AuthCardItem>
        <Label htmlFor="email" className="w-fit">
          Email
        </Label>
        <Input
          id="email"
          type="text"
          placeholder="youraddress@mail.com"
          value={loginData.email}
          onChange={(e) => {
            setLoginData((prev) => ({
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
          value={loginData.password}
          onChange={(e) => {
            setLoginData((prev) => ({
              ...prev,
              password: e.target.value,
            }));
          }}
        />
      </AuthCardItem>
      <AuthCardItem className="md:grid md:grid-cols-2 md:gap-4">
        <Button
          onClick={async () => {
            await login();
          }}
        >
          {loginData.loading ? (
            <Loader childClassName="border-blue-500" />
          ) : (
            "Continue"
          )}
        </Button>
        <Link to="/create-account">
          <Button className="w-full" variant="outline">
            Create account
          </Button>
        </Link>
      </AuthCardItem>
    </CardContent>
  );
}
