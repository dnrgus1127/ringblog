import { useCallback, useEffect, useState } from "react";

export default function useScroll(handler, delay = 500) {
  const [throttle, setThrottle] = useState(false);

  const handleScroll = useCallback(() => {
    if (!throttle) {
      setThrottle(true);
      setTimeout(() => {
        handler();
        setThrottle(false);
      }, delay);
    }
  }, [delay, handler, throttle]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [delay, handleScroll]);
}
