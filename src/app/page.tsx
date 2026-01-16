"use client";

import { useLayoutEffect, useEffect, useMemo, useState } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";

export default function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  const randomImages = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= 7; i++) {
      const size = Math.random() * 180 + 80;
      const left = Math.random() * 70;
      const top = Math.random() * 70;
      const opacity = Math.random() * 0.5 + 0.4;
      const rotate = Math.random() * 30 - 15;

      arr.push({
        id: i,
        img: `/${i}.jpg`,
        size,
        left,
        top,
        opacity,
        rotate,
      });
    }
    return arr;
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // animate title
    gsap.fromTo(
      ".hero-title span",
      { y: 50, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.05,
        ease: "back.out(1.7)",
        duration: 0.7,
      }
    );

    // animate hero-bg scale
    gsap.fromTo(
      ".hero-bg",
      { scale: 0.5 },
      {
        scale: 1.2,
        scrollTrigger: {
          trigger: ".hero-main-container",
          start: "top top",
          end: "+=200vh",
          scrub: true,
          pin: true,
          pinSpacing: true,
        },
      }
    );

    // animate logo
    gsap.fromTo(
      ".logo",
      { scale: 0.8 },
      {
        scale: 7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".hero-main-container",
          start: "bottom bottom",
          end: "+=2000vh",
          scrub: true,
        },
      }
    );
  }, []);

  // **สร้าง ScrollTrigger ของ box หลัง images โหลด**
  useLayoutEffect(() => {
    if (!images.length) return;

    gsap.utils.toArray<HTMLElement>(".box").forEach((box) => {
      ScrollTrigger.create({
        trigger: box,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });
    });
  }, [images]);

  return (
    <ReactLenis root>
      <div className="flex flex-col min-h-screen">
        <div className="hero-main-container relative w-screen h-[100vh] overflow-hidden flex">
          <div className="w-screen h-screen absolute overflow-hidden">
            {randomImages.map((item) => (
              <div
                key={item.id}
                className="absolute bg-center bg-no-repeat hero-bg z-20"
                style={{
                  width: item.size,
                  height: item.size,
                  left: `${item.left}%`,
                  top: `${item.top}%`,
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: "contain",
                  opacity: item.opacity,
                  transform: `rotate(${item.rotate}deg)`,
                }}
              />
            ))}
          </div>

          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/hero.jpg')" }}
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute top-0 z-20 left-0 flex items-center w-[100vw] h-[100vh] justify-center flex-col">
            <div
              className="w-[150px] h-[150px] rounded-full logo z-40"
              style={{
                backgroundImage: `url(/logo.jpg)`,
                backgroundSize: "contain",
                backgroundPosition: "center",
              }}
            ></div>

            <p
              className="text-[28px] font-black text-white hero-title sm:text-[50px] lg:text-[100px]"
              style={{
                textShadow: `
                  2px 2px 0 #000,
                  4px 4px 0 #000,
                  6px 6px 0 #000,
                  8px 8px 0 #000
                `,
              }}
            >
              {"BIZ INNOVATION CAMP".split("").map((char, i) => (
                <span key={i} className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </p>

            <p className="text-[14px] sm:text-[25px] lg:text-[50px] font-black text-white/70 font-semibold">
              Potisarnpittayakorn school
            </p>
          </div>
        </div>

        {/* box section */}
        {images.map((img, idx) => (
          <div
            key={idx}
            className="box w-[100vw] h-[100vh]"
            style={{
              zIndex: idx + 1,
              backgroundImage: `url('/${img}')`,
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>
    </ReactLenis>
  );
}
