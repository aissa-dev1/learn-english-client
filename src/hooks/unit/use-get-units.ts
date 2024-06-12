import { unitService } from "@/api/unit";
import useUnitStore from "@/features/unit";
import { useUserStore } from "@/features/user";
import { getAccessToken } from "@/utils/jwt";

export function useGetUnits() {
  const userStudyRole = useUserStore((state) => state.studyRole);
  const setUnitsLoading = useUnitStore((state) => state.setUnitsLoading);
  const updateUnits = useUnitStore((state) => state.updateUnits);

  async function getUnits() {
    const accessToken = getAccessToken();
    if (!accessToken) return;
    setUnitsLoading(true);
    const axiosRes = await unitService.findUnits(userStudyRole, accessToken);
    updateUnits(axiosRes.data.units);
    setUnitsLoading(false);
  }

  return { getUnits };
}
