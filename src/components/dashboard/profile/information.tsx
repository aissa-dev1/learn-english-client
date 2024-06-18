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
        <ProfileItem firstText="Identifier" secondText={userStore.sub} />
        <ProfileItem firstText="Role" secondText={userStore.role} />
        <ProfileItem firstText="Email" secondText={userStore.email} />
        <ProfileItem firstText="Study field" secondText={userStore.field} />
        <ProfileItem
          firstText="Gained stars"
          secondText={userStore.stars.toString()}
        />
        <ProfileItem firstText="Study role" secondText={userStore.studyRole} />
        <ProfileItem
          firstText="Joined at"
          secondText={buildDate(userStore.joinedAt)}
        />
      </div>
    </div>
  );
}
