import { MutableRefObject, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { extractDocument} from "../sdk";
interface Options {
  params?: string;
  baseURL: string;
}

export const useWindowSize = () => {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

  const updateSize = useDebouncedCallback(() => {
    setSize([window.innerWidth, window.innerHeight]);
  }, 500);

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};

export default function useOnScreen(ref: MutableRefObject<any>) {
  const [isIntersecting, setIntersecting] = useState(false);
  const document = extractDocument();
  const observer = new IntersectionObserver(([entry]) =>
    setIntersecting(entry.isIntersecting)
  );

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [ref]);

  useEffect(() => {
    // User has switched back to the tab
    if (document) {
      const onFocus = () => {
        const state = document.visibilityState;
        if (state === "visible") setIntersecting(true);
        else if (state === "hidden") setIntersecting(false);
      };

      document.addEventListener("visibilitychange", onFocus);
      return () => {
        document.removeEventListener("visibilitychange", onFocus);
      };
    }
  }, []);

  return isIntersecting;
}


