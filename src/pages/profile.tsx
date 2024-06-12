import Container from "@/components/container";
import NavBar from "@/components/dashboard/navBar";
import PageTitle from "@/components/dashboard/pageTitle";
import ProfileInformation from "@/components/dashboard/profile/information";
import { CardTitle } from "@/components/ui/card";
import { useUserStore } from "@/features/user";
import { useTitle } from "@/hooks/use-title";

export default function Profile() {
  const userName = useUserStore((state) => state.userName);
  useTitle("Dashboard | Profile");

  return (
    <>
      <Container className="flex flex-col gap-4 pb-24 mt-4">
        <div className="flex flex-col gap-2">
          <PageTitle>Profile</PageTitle>
          <CardTitle>Hi {userName} 👋</CardTitle>
        </div>
        <ProfileInformation />
      </Container>
      <NavBar />
    </>
  );
}
