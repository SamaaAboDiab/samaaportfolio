import React, { useEffect, useRef, useState } from "react";

const HOVERABLE =
  "a, button, .cursor-pointer, input, textarea, [role='button']";

const Cursor = () => {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let mx = 0,
      my = 0,
      fx = 0,
      fy = 0;
    let rafId;

    const handleMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mx + "px";
        dotRef.current.style.top = my + "px";
      }
    };

    const animate = () => {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      if (followerRef.current) {
        followerRef.current.style.left = fx + "px";
        followerRef.current.style.top = fy + "px";
      }
      rafId = requestAnimationFrame(animate);
    };

    const handleOver = (e) => {
      if (e.target.closest(HOVERABLE)) {
        dotRef.current?.classList.add("cursor-hover");
        followerRef.current?.classList.add("cursor-follower-hover");
      }
    };

    const handleOut = (e) => {
      if (e.target.closest(HOVERABLE)) {
        dotRef.current?.classList.remove("cursor-hover");
        followerRef.current?.classList.remove("cursor-follower-hover");
      }
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div id="cursor" ref={dotRef} aria-hidden="true"></div>
      <div id="cursorFollower" ref={followerRef} aria-hidden="true"></div>
    </>
  );
};

export default Cursor;
