"use client";

import { useState } from "react";
import imageMobile from "@/images/iphone-mockup.png";
import Image from "next/image";

export const PhoneMock = () => {
  const [style, setStyle] = useState({});

  const handleMouseMove = (e: {
    clientX: number;
    clientY: number;
    target: any;
  }) => {
    const { clientX, clientY, target } = e;
    const { left, top, width, height } = target.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 40;
    const y = ((clientY - top) / height - 0.5) * 40;
    setStyle({
      transform: `rotateY(${x}deg) rotateX(${y}deg)`,
      transition: "transform 0.2s",
    });
  };

  return (
    <>
      <Image
       data-aos="fade-left"
        src={imageMobile}
        alt="Frontend Day"
        width={1920}
        height={2500}
        onMouseMove={handleMouseMove}
        style={style}
        className="rounded-lg max-sm:w-[80%] max-md:w-[50%] mt-12 h-[100%] object-cover"
      />
    </>
  );
};
