import { Card } from "../ui/card";
import LoginCardContent from "./loginCardContent";
import LoginCardHeader from "./loginCardHeader";

export default function LoginCard() {
  return (
    <Card>
      <LoginCardHeader />
      <LoginCardContent />
    </Card>
  );
}
