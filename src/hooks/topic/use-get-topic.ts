import { getAccessToken } from "@/utils/jwt";
import { usePathId } from "../use-pathid";
import { useNavigate } from "react-router-dom";
import { topicService } from "@/api/topic";
import useTopicStore from "@/features/topic";

export function useGetTopic() {
  const id = usePathId();
  const navigate = useNavigate();
  const setTopicLoading = useTopicStore((state) => state.setLoading);
  const updateTopic = useTopicStore((state) => state.update);

  async function getTopic() {
    const accessToken = getAccessToken();
    if (!accessToken) return;
    try {
      setTopicLoading(true);
      const axiosRes = await topicService.findOne(id, accessToken);
      updateTopic(axiosRes.data.topic);
      setTopicLoading(false);
    } catch (error) {
      navigate("/dashboard/levels");
    }
  }

  return { getTopic };
}
