import { getAccessToken } from "@/utils/jwt";
import { usePathId } from "../use-pathid";
import useTopicStore from "@/features/topic";
import { topicService } from "@/api/topic";

export function useGetTopicDefinitions() {
  const id = usePathId();
  const setDefinitionsLoading = useTopicStore(
    (state) => state.setDefinitionsLoading
  );
  const updateDefinitions = useTopicStore((state) => state.updateDefinitions);

  async function getTopicDefinitions() {
    const accessToken = getAccessToken();
    if (!accessToken) return;
    setDefinitionsLoading(true);
    const axiosRes = await topicService.findTopicDefinitions(id, accessToken);
    updateDefinitions(axiosRes.data.definitions);
    setDefinitionsLoading(false);
  }

  return { getTopicDefinitions };
}
