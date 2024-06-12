import Container from "@/components/container";
import NavBar from "@/components/dashboard/navBar";
import PageTitle from "@/components/dashboard/pageTitle";
import AdvancedSettings from "@/components/dashboard/settings/advanced";
import InformationSettings from "@/components/dashboard/settings/information";
import { useTitle } from "@/hooks/use-title";

export default function Settings() {
  useTitle("Dashboard | Settings");

  return (
    <>
      <Container className="flex flex-col gap-4 pb-24 mt-4">
        <PageTitle>Settings</PageTitle>
        <InformationSettings />
        <AdvancedSettings />
      </Container>
      <NavBar />
    </>
  );
}
