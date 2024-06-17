import { levelService } from "@/api/level";
import useLevelStore from "@/features/level";
import { useUserStore } from "@/features/user";
import { getAccessToken } from "@/utils/jwt";

export function useGetLevels() {
  const userField = useUserStore((state) => state.field);
  const userStudyRole = useUserStore((state) => state.studyRole);
  const setLevelsLoading = useLevelStore((state) => state.setLevelsLoading);
  const updateLevels = useLevelStore((state) => state.updateLevels);

  async function getLevels() {
    const accessToken = getAccessToken();
    if (!accessToken) return;
    setLevelsLoading(true);
    const axiosRes = await levelService.findLevels(
      userField,
      userStudyRole,
      accessToken
    );
    updateLevels(axiosRes.data.levels);
    setLevelsLoading(false);
  }

  return { getLevels };
}
