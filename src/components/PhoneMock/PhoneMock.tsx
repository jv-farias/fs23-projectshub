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
      <Image
       data-aos="fade-left"
        src={imageMobile}
        alt="Frontend Day"
        width={500}
        height={500}
        onMouseMove={handleMouseMove}
        style={style}
        className="rounded-lg max-sm:w-[70%] max-md:w-[50%] w-[350px] xl:w-[300px] mx-auto mt-12 object-cover"
      />
  );
};
