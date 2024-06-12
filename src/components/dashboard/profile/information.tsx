import { useUserStore } from "@/features/user";
import ProfileItem from "./profileItem";
import { CardTitle } from "@/components/ui/card";
import { buildDate } from "@/utils/build-date";

export default function ProfileInformation() {
  const userStore = useUserStore();

  return (
    <div className="flex flex-col gap-4">
      <CardTitle className="text-xl">Information</CardTitle>
      <div className="flex flex-col gap-3">
        <ProfileItem firstText="Email" secondText={userStore.email} />
        <ProfileItem firstText="Study field" secondText={userStore.field} />
        <ProfileItem
          firstText="Joined at"
          secondText={buildDate(userStore.joinedAt)}
        />
      </div>
    </div>
  );
}
