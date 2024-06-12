import { useLocation } from "react-router-dom";

export function usePathId() {
  const location = useLocation();
  const paths = location.pathname.split("/");
  const id = paths[paths.length - 1];
  return id;
}
