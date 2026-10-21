"use client";

import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { testimonialsData } from "./testimonialsData";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonials() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="section section-brand">
      <div className="site-container">
        <SectionHeading
          eyebrow="Loved by travellers"
          title="What our riders say"
        />

        {!mounted ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonialsData.map(({ name, route, rating, quote }) => (
              <figure key={name} className="feature-card flex h-full flex-col">
                <Quote size={26} strokeWidth={2.5} aria-hidden="true" />

                <div
                  role="img"
                  aria-label={`${rating} out of 5 stars`}
                  className="mt-3 flex gap-0.5"
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={16}
                      aria-hidden="true"
                      className={i < rating ? "fill-highlight" : ""}
                    />
                  ))}
                </div>

                <blockquote className="mt-3 flex-1 text-sm leading-6">
                  “{quote}”
                </blockquote>

                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="avatar" aria-hidden="true">
                    {initials(name)}
                  </span>

                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {route}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <SwiperTestimonials />
        )}
      </div>
    </section>
  );
}

function SwiperTestimonials() {
  const [SwiperComponents, setSwiperComponents] = useState<{
    Swiper: typeof import("swiper/react").Swiper;
    SwiperSlide: typeof import("swiper/react").SwiperSlide;
    Navigation: typeof import("swiper/modules").Navigation;
    A11y: typeof import("swiper/modules").A11y;
  } | null>(null);

  useEffect(() => {
    let active = true;

    Promise.all([
      import("swiper/react"),
      import("swiper/modules"),
      import("swiper/css"),
      import("swiper/css/navigation"),
    ]).then(([reactSwiper, modules]) => {
      if (active) {
        setSwiperComponents({
          Swiper: reactSwiper.Swiper,
          SwiperSlide: reactSwiper.SwiperSlide,
          Navigation: modules.Navigation,
          A11y: modules.A11y,
        });
      }
    });

    return () => {
      active = false;
    };
  }, []);

  if (!SwiperComponents) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonialsData.map(({ name, route, rating, quote }) => (
          <figure key={name} className="feature-card">
            <p className="text-sm leading-6">“{quote}”</p>
            <p className="mt-3 text-sm font-semibold">{name}</p>
            <p className="text-xs text-muted-foreground">{route}</p>
            <p className="mt-2 text-xs">{rating} out of 5 stars</p>
          </figure>
        ))}
      </div>
    );
  }

  const { Swiper, SwiperSlide, Navigation, A11y } = SwiperComponents;

  return (
    <Swiper
      modules={[Navigation, A11y]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      watchOverflow
      breakpoints={{
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
      }}
      className="testimonials-swiper"
    >
      {testimonialsData.map(({ name, route, rating, quote }) => (
        <SwiperSlide key={name} className="h-auto">
          <figure className="feature-card flex h-full flex-col">
            <Quote size={26} strokeWidth={2.5} aria-hidden="true" />
            <div
              role="img"
              aria-label={`${rating} out of 5 stars`}
              className="mt-3 flex gap-0.5"
            >
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={16}
                  aria-hidden="true"
                  className={i < rating ? "fill-highlight" : ""}
                />
              ))}
            </div>
            <blockquote className="mt-3 flex-1 text-sm leading-6">
              “{quote}”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="avatar" aria-hidden="true">
                {initials(name)}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{name}</span>
                <span className="block text-xs text-muted-foreground">
                  {route}
                </span>
              </span>
            </figcaption>
          </figure>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
