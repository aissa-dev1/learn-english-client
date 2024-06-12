import { unitService } from "@/api/unit";
import useUnitStore from "@/features/unit";
import { getAccessToken } from "@/utils/jwt";
import { usePathId } from "../use-pathid";

export function useGetUnitTopics() {
  const id = usePathId();
  const setTopicsLoading = useUnitStore((state) => state.setTopicsLoading);
  const updateTopics = useUnitStore((state) => state.updateTopics);

  async function getUnitTopics() {
    const accessToken = getAccessToken();
    if (!accessToken) return;
    setTopicsLoading(true);
    const axiosRes = await unitService.findUnitTopics(id, accessToken);
    updateTopics(axiosRes.data.topics);
    setTopicsLoading(false);
  }

  return { getUnitTopics };
}
