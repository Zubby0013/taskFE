import useSwr from "swr";
import { getStore } from "../Api/MarchantApi";

export const useStore = () => {
  const { data } = useSwr(`api/view-all-store`, getStore);
  return { data };
};
