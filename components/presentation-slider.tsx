"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

// Slide data
const slides = [
  {
    id: "hero",
    chapter: "Introduction",
    title: "Oscar Wilde",
    subtitle: "Biography and Literary Style",
    content: "An exploration of the life, works, and distinctive literary techniques of one of Victorian England's most celebrated writers.",
    type: "hero",
    image: "/images/oscar-wilde-portrait.jpg",
  },
  {
    id: "biography",
    chapter: "Chapter One",
    title: "The Life of Oscar Wilde",
    type: "timeline",
    image: "/images/victorian-london.jpg",
    items: [
      { year: "1854", title: "Birth", text: "Born in Dublin, Ireland" },
      { year: "1874", title: "Oxford", text: "Enters Magdalen College" },
      { year: "1881", title: "Poems", text: "First published collection" },
      { year: "1884", title: "Marriage", text: "Weds Constance Lloyd" },
      { year: "1890", title: "Dorian Gray", text: "Novel published" },
      { year: "1895", title: "Trials", text: "Imprisonment begins" },
      { year: "1900", title: "Death", text: "Dies in Paris, age 46" },
    ],
  },
  {
    id: "works",
    chapter: "Chapter Two",
    title: "Literary Works",
    type: "grid",
    image: "/images/antique-books.jpg",
    items: [
      { title: "The Picture of Dorian Gray", year: "1890", type: "Novel", quote: "The only way to get rid of a temptation is to yield to it." },
      { title: "The Importance of Being Earnest", year: "1895", type: "Play", quote: "To lose one parent may be regarded as a misfortune; to lose both looks like carelessness." },
      { title: "Lady Windermere's Fan", year: "1892", type: "Play", quote: "We are all in the gutter, but some of us are looking at the stars." },
      { title: "An Ideal Husband", year: "1895", type: "Play", quote: "To love oneself is the beginning of a lifelong romance." },
      { title: "De Profundis", year: "1905", type: "Letter", quote: "Where there is sorrow, there is holy ground." },
      { title: "The Happy Prince", year: "1888", type: "Fairy Tale", quote: "The nightingale sang so sweetly that the rose began to bloom." },
    ],
  },
  {
    id: "style",
    chapter: "Chapter Three",
    title: "Writing Style",
    subtitle: '"I have one instrument that I know I can command, and that is the English language."',
    type: "cards",
    image: "/images/writing-desk.jpg",
    items: [
      { name: "Epigram", description: "Witty, paradoxical statements", example: '"I can resist everything except temptation."' },
      { name: "Irony", description: "Subtle contrast between appearance and reality", example: '"Experience is the name everyone gives to their mistakes."' },
      { name: "Metaphor", description: "Vivid symbolic comparisons", example: '"Memory is the diary we all carry about with us."' },
      { name: "Antithesis", description: "Contrasting ideas in parallel structure", example: '"Life imitates Art far more than Art imitates Life."' },
      { name: "Rhetorical Questions", description: "Questions posed for effect", example: '"What is a cynic? A man who knows the price of everything and the value of nothing."' },
      { name: "Repetition", description: "Emphasis through recurring words", example: '"Nowadays people know the price of everything and the value of nothing."' },
    ],
  },
  {
    id: "symbolism",
    chapter: "Chapter Four",
    title: "Symbolism",
    subtitle: "Recurring motifs that convey deeper meanings about morality, beauty, and the human condition.",
    type: "symbols",
    image: "/images/mirror-roses.jpg",
    items: [
      { name: "The Portrait", tag: "Identity & Conscience", text: "Represents the hidden soul and moral decay, showing the consequences of a life devoted solely to pleasure." },
      { name: "The Mirror", tag: "Self-Reflection", text: "Reflects the duality of human nature—the public facade versus private reality." },
      { name: "The Yellow Book", tag: "Corruption", text: "Symbolizes the dangerous influence of art and ideas on an impressionable mind." },
      { name: "Flowers", tag: "Beauty & Mortality", text: "Beauty that blooms and fades, mirroring themes of youth, decay, and impermanence." },
    ],
  },
  {
    id: "translation",
    chapter: "Chapter Five",
    title: "Translation Analysis",
    subtitle: "Wilde's wit depends on precise word choice, rhythm, and cultural context.",
    type: "table",
    image: "/images/translation-books.jpg",
    items: [
      { original: "I can resist everything except temptation.", literal: "I can resist everything except temptation.", dynamic: "Nothing tempts me more than temptation itself.", issue: "Loses paradox" },
      { original: "Experience is simply the name we give our mistakes.", literal: "Experience is simply the name we give our mistakes.", dynamic: "We call our failures 'experience' to feel better.", issue: "Too casual" },
      { original: "To live is the rarest thing in the world.", literal: "To live is the rarest thing in the world.", dynamic: "Truly living is a rare achievement.", issue: "Misses rhythm" },
    ],
  },
  {
    id: "conclusion",
    chapter: "Conclusion",
    title: "A Legacy of Wit and Wisdom",
    type: "conclusion",
    image: "/images/oscar-wilde-grave.jpg",
    content: "Oscar Wilde remains one of the most quotable and influential writers in the English language. Through his masterful use of epigrams, irony, and paradox, he created a unique literary voice that challenged Victorian hypocrisy while celebrating beauty and art.",
    quote: '"To live is the rarest thing in the world. Most people exist, that is all."',
  },
  {
    id: "thanks",
    chapter: "",
    title: "Thank You",
    type: "thanks",
    image: "/images/flowers-soft.jpg",
    author: "Elen Badalyan",
    university: "Yerevan State University",
    faculty: "Faculty of Romance and Germanic Philology",
    year: "2024",
  },
]

export function PresentationSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const overlayRef = useRef<HTMLDivElement>(null)

  const animateSlideContent = useCallback((index: number) => {
    const slide = slideRefs.current[index]
    if (!slide) return

    const tl = gsap.timeline()

    // Animate background image
    tl.fromTo(slide.querySelector(".slide-bg"),
      { scale: 1.1 },
      { scale: 1, duration: 1.4, ease: "power2.out" },
      0
    )

    // Chapter label slides up
    tl.fromTo(slide.querySelectorAll(".anim-chapter"),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      0.3
    )

    // Title characters cascade in
    const chars = slide.querySelectorAll(".anim-char")
    tl.fromTo(chars,
      { y: 100, opacity: 0, rotateX: -80 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.03, ease: "power4.out" },
      0.4
    )

    // Decorative lines grow
    tl.fromTo(slide.querySelectorAll(".anim-line"),
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: "power2.inOut" },
      0.6
    )

    // Content cards float up
    tl.fromTo(slide.querySelectorAll(".anim-content"),
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "power3.out" },
      0.7
    )

    return tl
  }, [])

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentSlide || index < 0 || index >= slides.length) return

    setIsAnimating(true)

    const currentEl = slideRefs.current[currentSlide]
    const nextEl = slideRefs.current[index]
    const overlay = overlayRef.current
    const direction = index > currentSlide ? 1 : -1

    if (!currentEl || !nextEl || !overlay) {
      setIsAnimating(false)
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentSlide(index)
        setIsAnimating(false)
      }
    })

    // Prepare next slide - completely hidden with clip-path
    gsap.set(nextEl, {
      visibility: "visible",
      clipPath: direction > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
      zIndex: 20,
    })

    // Reset next slide content to hidden
    gsap.set(nextEl.querySelectorAll(".anim-chapter, .anim-content"), { opacity: 0, y: 40 })
    gsap.set(nextEl.querySelectorAll(".anim-char"), { opacity: 0, y: 100, rotateX: -80 })
    gsap.set(nextEl.querySelectorAll(".anim-line"), { scaleX: 0 })
    gsap.set(nextEl.querySelector(".slide-bg"), { scale: 1.1 })

    // Animate overlay wipe
    tl.to(overlay, {
      clipPath: direction > 0 ? "inset(0 0 0 0%)" : "inset(0 0% 0 0)",
      duration: 0.6,
      ease: "power3.inOut",
    })

    // Reveal next slide with clip-path
    tl.to(nextEl, {
      clipPath: "inset(0 0% 0 0%)",
      duration: 0.8,
      ease: "power3.inOut",
    }, "-=0.3")

    // Hide overlay
    tl.to(overlay, {
      clipPath: direction > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
      duration: 0.5,
      ease: "power3.inOut",
    }, "-=0.5")

    // Hide current slide
    tl.set(currentEl, { visibility: "hidden", zIndex: 10 }, "-=0.3")

    // Animate content of next slide
    tl.add(() => animateSlideContent(index), "-=0.6")

    // Reset next slide z-index
    tl.set(nextEl, { zIndex: 10 })

  }, [currentSlide, isAnimating, animateSlideContent])

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1)
  }, [currentSlide, goToSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        nextSlide()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        prevSlide()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  // Initial setup
  useEffect(() => {
    // Hide all slides except first
    slideRefs.current.forEach((slide, i) => {
      if (slide) {
        gsap.set(slide, {
          visibility: i === 0 ? "visible" : "hidden",
          clipPath: "inset(0 0% 0 0%)",
          zIndex: 10,
        })
        // Reset all animated elements
        gsap.set(slide.querySelectorAll(".anim-chapter, .anim-content"), { opacity: 0, y: 40 })
        gsap.set(slide.querySelectorAll(".anim-char"), { opacity: 0, y: 100, rotateX: -80 })
        gsap.set(slide.querySelectorAll(".anim-line"), { scaleX: 0 })
        gsap.set(slide.querySelector(".slide-bg"), { scale: 1.1 })
      }
    })

    // Setup overlay
    if (overlayRef.current) {
      gsap.set(overlayRef.current, { clipPath: "inset(0 0 0 100%)" })
    }

    // Animate first slide
    const timer = setTimeout(() => {
      animateSlideContent(0)
    }, 300)

    return () => clearTimeout(timer)
  }, [animateSlideContent])

  const renderTitle = (title: string) => (
    <span className="inline-block overflow-hidden">
      {title.split("").map((char, i) => (
        <span
          key={i}
          className="anim-char inline-block"
          style={{ transformStyle: "preserve-3d" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  )

  const renderSlideContent = (slide: typeof slides[0], index: number) => {
    switch (slide.type) {
      case "hero":
        return (
          <>
            <div className="slide-bg absolute inset-0">
              <Image
                src={slide.image}
                alt="Oscar Wilde"
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
            </div>
            <div className="relative z-10 text-center max-w-5xl mx-auto">
              <p className="anim-chapter text-sm uppercase tracking-[0.5em] text-primary mb-6">
                {slide.chapter}
              </p>
              <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-none">
                {renderTitle(slide.title)}
              </h1>
              <div className="anim-line h-px w-48 bg-primary/60 mx-auto mb-8 origin-center" />
              <p className="anim-content font-serif text-2xl md:text-3xl text-primary italic mb-8">
                {slide.subtitle}
              </p>
              <p className="anim-content text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {slide.content}
              </p>
            </div>
          </>
        )

      case "timeline":
        return (
          <>
            <div className="slide-bg absolute inset-0">
              <Image src={slide.image} alt="Victorian London" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
            </div>
            <div className="relative z-10 w-full max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="anim-chapter text-sm uppercase tracking-[0.5em] text-primary mb-4">
                  {slide.chapter}
                </p>
                <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight">
                  {renderTitle(slide.title)}
                </h2>
              </div>
              <div className="anim-line h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-12 origin-center" />
              <div className="grid grid-cols-7 gap-6">
                {slide.items?.map((item: any, i) => (
                  <div key={i} className="anim-content text-center">
                    <div className="w-4 h-4 rounded-full bg-primary mx-auto mb-4 shadow-lg shadow-primary/30" />
                    <span className="text-xl font-serif text-primary font-medium">{item.year}</span>
                    <h3 className="font-semibold text-foreground mt-3 text-lg">{item.title}</h3>
                    <p className="text-base text-muted-foreground mt-2">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )

      case "grid":
        return (
          <>
            <div className="slide-bg absolute inset-0">
              <Image src={slide.image} alt="Antique books" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
            </div>
            <div className="relative z-10 w-full max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <p className="anim-chapter text-sm uppercase tracking-[0.5em] text-primary mb-4">
                  {slide.chapter}
                </p>
                <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight">
                  {renderTitle(slide.title)}
                </h2>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {slide.items?.map((item: any, i) => (
                  <div key={i} className="anim-content bg-card/70 backdrop-blur-lg p-6 rounded-2xl border border-primary/20 shadow-2xl shadow-primary/5">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs uppercase tracking-wider text-primary font-medium">{item.type}</span>
                      <span className="text-xs text-muted-foreground">{item.year}</span>
                    </div>
                    <h3 className="font-serif text-xl text-foreground mb-4">{item.title}</h3>
                    <p className="text-base text-muted-foreground italic border-l-2 border-primary/40 pl-4">{item.quote}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )

      case "cards":
        return (
          <>
            <div className="slide-bg absolute inset-0">
              <Image src={slide.image} alt="Writing desk" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
            </div>
            <div className="relative z-10 w-full max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <p className="anim-chapter text-sm uppercase tracking-[0.5em] text-primary mb-4">
                  {slide.chapter}
                </p>
                <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-4 leading-tight">
                  {renderTitle(slide.title)}
                </h2>
                <p className="anim-content text-lg text-muted-foreground italic max-w-3xl mx-auto">{slide.subtitle}</p>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {slide.items?.map((item: any, i) => (
                  <div key={i} className="anim-content bg-card/70 backdrop-blur-lg p-6 rounded-2xl border border-primary/20 shadow-2xl shadow-primary/5">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="w-10 h-10 flex items-center justify-center bg-primary/20 text-primary rounded-full text-lg font-medium">
                        {i + 1}
                      </span>
                      <h3 className="font-serif text-xl text-foreground">{item.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                    <p className="text-base text-foreground/80 italic border-l-2 border-primary/40 pl-4">{item.example}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )

      case "symbols":
        return (
          <>
            <div className="slide-bg absolute inset-0">
              <Image src={slide.image} alt="Mirror and roses" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
            </div>
            <div className="relative z-10 w-full max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <p className="anim-chapter text-sm uppercase tracking-[0.5em] text-primary mb-4">
                  {slide.chapter}
                </p>
                <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-4 leading-tight">
                  {renderTitle(slide.title)}
                </h2>
                <p className="anim-content text-lg text-muted-foreground max-w-3xl mx-auto">{slide.subtitle}</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {slide.items?.map((item: any, i) => (
                  <div key={i} className="anim-content bg-card/70 backdrop-blur-lg p-8 rounded-3xl border border-primary/20 shadow-2xl shadow-primary/5">
                    <span className="text-xs uppercase tracking-wider text-primary font-medium">{item.tag}</span>
                    <h3 className="font-serif text-2xl text-foreground mt-3 mb-4">{item.name}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )

      case "table":
        return (
          <>
            <div className="slide-bg absolute inset-0">
              <Image src={slide.image} alt="Translation books" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
            </div>
            <div className="relative z-10 w-full max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <p className="anim-chapter text-sm uppercase tracking-[0.5em] text-primary mb-4">
                  {slide.chapter}
                </p>
                <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-4 leading-tight">
                  {renderTitle(slide.title)}
                </h2>
                <p className="anim-content text-lg text-muted-foreground max-w-3xl mx-auto">{slide.subtitle}</p>
              </div>
              <div className="anim-content bg-card/70 backdrop-blur-lg rounded-3xl border border-primary/20 overflow-hidden shadow-2xl shadow-primary/5">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary/20">
                      <th className="py-5 px-6 text-left text-sm uppercase tracking-wider text-primary font-medium">Original</th>
                      <th className="py-5 px-6 text-left text-sm uppercase tracking-wider text-primary font-medium">Literal</th>
                      <th className="py-5 px-6 text-left text-sm uppercase tracking-wider text-primary font-medium">Dynamic</th>
                      <th className="py-5 px-6 text-left text-sm uppercase tracking-wider text-primary font-medium">Issue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slide.items?.map((item: any, i) => (
                      <tr key={i} className="border-b border-primary/10 last:border-0">
                        <td className="py-5 px-6 font-serif italic text-lg text-foreground">&quot;{item.original}&quot;</td>
                        <td className="py-5 px-6 text-base text-muted-foreground">&quot;{item.literal}&quot;</td>
                        <td className="py-5 px-6 text-base text-muted-foreground">&quot;{item.dynamic}&quot;</td>
                        <td className="py-5 px-6 text-base text-primary font-medium">{item.issue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )

      case "conclusion":
        return (
          <>
            <div className="slide-bg absolute inset-0">
              <Image src={slide.image} alt="Oscar Wilde memorial" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/75 to-background" />
            </div>
            <div className="relative z-10 text-center max-w-6xl mx-auto">
              <p className="anim-chapter text-sm uppercase tracking-[0.5em] text-primary mb-4">
                {slide.chapter}
              </p>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-10 leading-tight">
                {renderTitle(slide.title)}
              </h2>
              <div className="anim-line h-px w-48 bg-primary/60 mx-auto mb-10 origin-center" />
              <p className="anim-content text-lg md:text-xl text-muted-foreground leading-relaxed mb-12">
                {slide.content}
              </p>
              <blockquote className="anim-content">
                <p className="font-serif text-2xl md:text-3xl text-foreground italic leading-relaxed mb-6">
                  {slide.quote}
                </p>
                <footer className="text-lg text-primary font-medium">— Oscar Wilde</footer>
              </blockquote>
            </div>
          </>
        )

      case "thanks":
        return (
          <>
            <div className="slide-bg absolute inset-0">
              <Image src={slide.image} alt="Soft flowers" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
            </div>
            <div className="relative z-10 text-center">
              <div className="anim-line h-px w-40 bg-primary/60 mx-auto mb-12 origin-center" />
              <h2 className="font-serif text-5xl md:text-6xl lg:text-8xl text-foreground mb-12 leading-none">
                {renderTitle(slide.title)}
              </h2>
              <div className="anim-content space-y-4 text-muted-foreground">
                <p className="text-2xl text-foreground font-medium">{slide.author}</p>
                <p className="text-lg">{slide.university}</p>
                <p className="text-lg">{slide.faculty}</p>
                <p className="text-xl text-primary font-medium mt-8">{slide.year}</p>
              </div>
            </div>
          </>
        )

      default:
        return null
    }
  }

  return (
    <div ref={containerRef} className="h-screen w-screen overflow-hidden bg-background relative">
      {/* Transition overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-30 bg-primary/20 backdrop-blur-sm pointer-events-none"
        style={{ clipPath: "inset(0 0 0 100%)" }}
      />

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          ref={(el) => { slideRefs.current[index] = el }}
          className="absolute inset-0 flex items-center justify-center px-16 py-24"
          style={{ visibility: index === 0 ? "visible" : "hidden" }}
        >
          {renderSlideContent(slide, index)}
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        disabled={currentSlide === 0 || isAnimating}
        className="absolute left-12 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-card/70 border border-primary/20 flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-card/90 hover:scale-110 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none shadow-xl z-40"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>
      <button
        onClick={nextSlide}
        disabled={currentSlide === slides.length - 1 || isAnimating}
        className="absolute right-12 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-card/70 border border-primary/20 flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-card/90 hover:scale-110 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none shadow-xl z-40"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Progress dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-40">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className={`h-3 rounded-full transition-all duration-500 ${index === currentSlide
              ? "w-12 bg-primary shadow-lg shadow-primary/40"
              : "w-3 bg-primary/30 hover:bg-primary/50"
              }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-12 right-12 text-lg text-muted-foreground z-40">
        <span className="text-foreground font-medium text-2xl">{String(currentSlide + 1).padStart(2, "0")}</span>
        <span className="mx-3 text-primary/50">/</span>
        <span className="text-xl">{String(slides.length).padStart(2, "0")}</span>
      </div>
    </div>
  )
}
