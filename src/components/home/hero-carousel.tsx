"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Container } from "@/components/ui";
import { whatsappUrl } from "@/utils/whatsapp";

const AUTOPLAY_DELAY = 6000;
const INTERACTION_PAUSE = 8000;

const slides = [
  {
    eyebrow: "RODE Celulares",
    title: "Seu próximo smartphone está aqui.",
    description:
      "Celulares, acessórios e tecnologia para deixar você sempre conectado.",
    ctaLabel: "Ver smartphones",
    href: "/produtos",
    theme: "institutional",
    image: "/images/home/hero-smartphones.svg",
    imageAlt:
      "Smartphone moderno em uma composição tecnológica laranja e grafite",
    highlights: [
      "Modelos para diferentes rotinas",
      "Atendimento personalizado",
      "Consulta rápida pelo WhatsApp",
    ],
  },
  {
    eyebrow: "Ofertas da semana",
    title: "Tecnologia para acompanhar sua rotina.",
    description:
      "Confira seleções e condições demonstrativas em smartphones e acessórios.",
    ctaLabel: "Ver ofertas",
    href: "/ofertas",
    theme: "weekly",
    image: "/images/home/hero-ofertas-tech.svg",
    imageAlt: "Smartphones em destaque sobre uma composição grafite e laranja",
  },
  {
    eyebrow: "Lançamentos",
    title: "Novidades para ficar de olho.",
    description:
      "Conheça os produtos que acabam de chegar e encontre seu próximo celular.",
    ctaLabel: "Conhecer novidades",
    href: "/produtos",
    theme: "pink",
    image: "/images/home/hero-acessorios.svg",
    imageAlt: "Fone de ouvido em uma composição minimalista de tecnologia",
  },
  {
    eyebrow: "Acessórios",
    title: "Complete sua experiência.",
    description:
      "Capinhas, carregadores, fones e mais para aproveitar melhor sua tecnologia.",
    ctaLabel: "Ver acessórios",
    href: "/produtos",
    theme: "mothers",
    image: "/images/home/hero-atendimento.svg",
    imageAlt: "Smartphone exibindo uma confirmação de atendimento",
    subtheme: "Tecnologia para o seu dia",
  },
] as const;

function subscribeToReducedMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [temporarilyPaused, setTemporarilyPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const pauseTemporarily = useCallback(() => {
    setTemporarilyPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(
      () => setTemporarilyPaused(false),
      INTERACTION_PAUSE,
    );
  }, []);

  const showSlide = useCallback(
    (index: number) => {
      setActiveIndex((index + slides.length) % slides.length);
      pauseTemporarily();
    },
    [pauseTemporarily],
  );

  useEffect(
    () => () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (reducedMotion || hovered || focusWithin || temporarilyPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [focusWithin, hovered, reducedMotion, temporarilyPaused]);

  const activeSlide = slides[activeIndex];

  return (
    <section
      id="inicio"
      className="home-hero"
      aria-label="Destaques RODE Celulares"
    >
      <Container className="home-hero__container">
        <div
          className="home-hero-carousel"
          role="region"
          aria-roledescription="carrossel"
          aria-label="Destaques principais"
          tabIndex={0}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocusWithin(true)}
          onBlurCapture={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget as Node | null)
            ) {
              setFocusWithin(false);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              showSlide(activeIndex + (event.key === "ArrowRight" ? 1 : -1));
            }
          }}
          onTouchStart={(event) => {
            const touch = event.touches[0];
            touchStart.current = { x: touch.clientX, y: touch.clientY };
            pauseTemporarily();
          }}
          onTouchEnd={(event) => {
            const start = touchStart.current;
            const touch = event.changedTouches[0];
            touchStart.current = null;
            if (!start) return;
            const deltaX = touch.clientX - start.x;
            const deltaY = touch.clientY - start.y;
            if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY)) {
              return;
            }
            showSlide(activeIndex + (deltaX < 0 ? 1 : -1));
          }}
        >
          <div className="home-hero-carousel__viewport">
            {slides.map((slide, index) => {
              const active = index === activeIndex;
              return (
                <article
                  key={slide.eyebrow}
                  className={`home-hero-slide home-hero-slide--${slide.theme} ${
                    active ? "is-active" : ""
                  }`}
                  aria-roledescription="slide"
                  aria-label={`${index + 1} de ${slides.length}`}
                  aria-hidden={!active}
                >
                  <Image
                    className="home-hero-slide__image"
                    src={slide.image}
                    alt={slide.imageAlt}
                    fill
                    sizes="100vw"
                    preload={index === 0}
                  />
                  <div className="home-hero-slide__veil" aria-hidden="true" />
                  <div className="home-hero-slide__content">
                    {"subtheme" in slide && (
                      <span className="home-hero-slide__subtheme">
                        {slide.subtheme}
                      </span>
                    )}
                    <p className="home-hero-slide__eyebrow">{slide.eyebrow}</p>
                    {index === 0 ? (
                      <h1>{slide.title}</h1>
                    ) : (
                      <h2>{slide.title}</h2>
                    )}
                    <p className="home-hero-slide__description">
                      {slide.description}
                    </p>
                    <div className="home-hero-slide__actions">
                      <Link
                        className="home-hero-slide__primary"
                        href={slide.href}
                        tabIndex={active ? 0 : -1}
                      >
                        {slide.ctaLabel} <span aria-hidden="true">↗</span>
                      </Link>
                      {index === 0 && (
                        <a
                          className="home-hero-slide__secondary"
                          href={whatsappUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          tabIndex={active ? 0 : -1}
                        >
                          Falar pelo WhatsApp
                        </a>
                      )}
                    </div>
                    {"highlights" in slide && (
                      <div className="home-hero-slide__highlights">
                        {slide.highlights.map((highlight) => (
                          <span key={highlight}>✓ {highlight}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            className="home-hero-carousel__arrow home-hero-carousel__arrow--previous"
            onClick={() => showSlide(activeIndex - 1)}
            aria-label="Mostrar destaque anterior"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="home-hero-carousel__arrow home-hero-carousel__arrow--next"
            onClick={() => showSlide(activeIndex + 1)}
            aria-label="Mostrar próximo destaque"
          >
            <span aria-hidden="true">→</span>
          </button>

          <div
            className="home-hero-carousel__dots"
            aria-label="Selecionar destaque"
          >
            {slides.map((slide, index) => (
              <button
                key={slide.eyebrow}
                type="button"
                className={index === activeIndex ? "is-active" : ""}
                onClick={() => showSlide(index)}
                aria-label={`Mostrar destaque ${index + 1}: ${slide.eyebrow}`}
                aria-pressed={index === activeIndex}
              />
            ))}
          </div>
          <p
            className="sr-only"
            aria-live={temporarilyPaused || focusWithin ? "polite" : "off"}
          >
            Destaque {activeIndex + 1} de {slides.length}: {activeSlide.title}
          </p>
        </div>
      </Container>
    </section>
  );
}
