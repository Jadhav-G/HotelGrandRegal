import React, { useState, useEffect, useRef } from "react";
import styles from "./Animator.module.css"; // Import CSS module

export default function Animator ({ ComponentToRender, direction = "left", speed = "0.8s", ...props }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once it's visible
        }
      },
      { threshold: 0.05 } // Trigger when 20% of the component is visible
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.slideContainer} ${
        isVisible ? (direction === "left" ? styles.slideLeft : styles.slideRight) : ""
      }`}
      style={{ animationDuration: speed }}
    >
      <ComponentToRender {...props} />
    </div>
  );
};
