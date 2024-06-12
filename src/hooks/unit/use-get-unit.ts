import { unitService } from "@/api/unit";
import { getAccessToken } from "@/utils/jwt";
import { usePathId } from "../use-pathid";
import { useNavigate } from "react-router-dom";
import useUnitStore from "@/features/unit";

export function useGetUnit() {
  const id = usePathId();
  const navigate = useNavigate();
  const setUnitLoading = useUnitStore((state) => state.setLoading);
  const updateUnit = useUnitStore((state) => state.update);

  async function getUnit() {
    const accessToken = getAccessToken();
    if (!accessToken) return;
    try {
      setUnitLoading(true);
      const axiosRes = await unitService.findOne(id, accessToken);
      updateUnit(axiosRes.data.unit);
      setUnitLoading(false);
    } catch (error) {
      navigate("/dashboard/learn");
    }
  }

  return { getUnit };
}
