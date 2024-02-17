import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import Settings from "./../../pages/Settings";

export const useSettings = () => {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: () => getSettings(),
  });

  return { isLoading, error, settings };
};
