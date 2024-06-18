import { getAccessToken } from "@/utils/jwt";
import { usePathId } from "../use-pathid";
import { useNavigate } from "react-router-dom";
import useLevelStore from "@/features/level";
import { levelService } from "@/api/level";

export function useGetLevel() {
  const id = usePathId();
  const navigate = useNavigate();
  const setLevelLoading = useLevelStore((state) => state.setLoading);
  const updateLevel = useLevelStore((state) => state.update);

  async function getLevel() {
    const accessToken = getAccessToken();
    if (!accessToken) return;
    try {
      setLevelLoading(true);
      const axiosRes = await levelService.findOne(id, accessToken);
      updateLevel(axiosRes.data.level);
      setLevelLoading(false);
    } catch (error) {
      navigate("/dashboard/levels");
    }
  }

  return { getLevel };
}
