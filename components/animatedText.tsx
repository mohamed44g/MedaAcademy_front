import React, { useRef } from "react";
import { Typography } from "@mui/material";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

const AnimatedText = ({ text, variant, component, sx }: any) => {
  const TextRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(TextRef.current, {
        opacity: 0,
        y: 100,
        ease: "power2.inOut",
        duration: 0.8,
        stagger: 0.4,
        scrollTrigger: {
          trigger: TextRef.current,
          start: "top 100%",
          end: "bottom 20%",
        },
      });
    },
    { scope: TextRef }
  );

  return (
    <Typography
      ref={TextRef}
      variant={variant}
      component={component}
      sx={{ overflow: "hidden", ...sx }}
    >
      {text}
    </Typography>
  );
};

export default AnimatedText;
