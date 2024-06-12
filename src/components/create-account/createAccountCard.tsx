import { Card } from "../ui/card";
import CreateAccountCardContent from "./createAccountCardContent";
import CreateAcoountCardHeader from "./createAcoountCardHeader";

export default function CreateAccountCard() {
  return (
    <Card>
      <CreateAcoountCardHeader />
      <CreateAccountCardContent />
    </Card>
  );
}
