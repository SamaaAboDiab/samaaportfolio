import React, { useEffect, useRef, useState } from "react";

/**
 * Wraps its children and fades/slides them into view the first time
 * they cross into the viewport. Pass `delay` (ms) to stagger siblings.
 */
const Reveal = ({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  direction = "up",
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const directionClass =
    direction === "left"
      ? "reveal-left"
      : direction === "right"
        ? "reveal-right"
        : direction === "zoom"
          ? "reveal-zoom"
          : "";

  return (
    <Tag
      ref={ref}
      className={`reveal ${directionClass} ${visible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
