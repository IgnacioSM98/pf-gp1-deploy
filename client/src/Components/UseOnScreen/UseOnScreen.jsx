import { useState, useEffect } from "react";

export default function UseOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = new IntersectionObserver(([entry]) =>
    setIntersecting(entry.isIntersecting)
  );

  useEffect(() => {
    console.log(ref.current, "wuwehi");
    if (ref.current) {
      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
    // eslint-disable-next-line
  }, [ref.current]);

  return isIntersecting;
}
