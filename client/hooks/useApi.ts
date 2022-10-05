import { useEffect } from "react";
import { extractDocument, invokeRequest, RequestProps } from "../sdk";

export const useAPI = (
  options: RequestProps & { onShowLoading?: () => void } & {
    timeReload?: number;
  }
) => {
  const { onShowLoading, timeReload, ...rest } = options;
  // const dispatchNotification = useNotificationStore((store) => store.dispatchNotification)
  const dispatchNotification = null;
  let intervalId: NodeJS.Timer;

  useEffect(() => {
    if (rest.baseURL) {
      onShowLoading && onShowLoading();
      invokeRequest({ ...rest, onError: dispatchNotification });
      if (timeReload) {
        intervalId = setInterval(() => {
          invokeRequest({ ...rest, onError: dispatchNotification });
        }, timeReload);
      }
    }
    return () => clearInterval(intervalId);
  }, [rest.baseURL, timeReload]);
};