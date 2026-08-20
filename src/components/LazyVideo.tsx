"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

export type LazyVideoProps = {
  src: string
  poster: string
  alt?: string
  className?: string
  videoClassName?: string
  maskStyle?: React.CSSProperties
  zIndex?: number
  priority?: boolean
}

/**
 * Poster-first video that mounts lazily and plays on visibility.
 *
 * Two observers with two jobs:
 *  - mount: the <video> element is only created once the container first
 *    touches the viewport (10%), so offscreen videos cost nothing;
 *  - playback: the clip plays only while meaningfully visible (≥50%), and
 *    RESTARTS from the top on each arrival. The site's clips are short
 *    stories, not wallpapers — before this, autoplay began at first pixel,
 *    so by the time a panel was actually readable the viewer landed
 *    mid-story and never saw a full pass ("les vidéos ne jouent pas au
 *    complet"). Fully offscreen pauses the element.
 *
 * Muted + playsInline keeps programmatic play() allowed everywhere.
 */
export default function LazyVideo({
  src,
  poster,
  alt = "Video background",
  className = "absolute inset-0 overflow-hidden",
  videoClassName = "w-full h-full object-contain mx-auto",
  maskStyle,
  zIndex = 0,
  priority = false,
}: LazyVideoProps) {
  const [showVideo, setShowVideo] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowVideo(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!showVideo || !ref.current) return
    let settle: ReturnType<typeof setTimeout> | null = null
    const obs = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current
        if (!v) return
        if (entry.intersectionRatio >= 0.8) {
          /* nearly fully on screen: give the scroll a beat to settle, then
             play the story from the top — starting at the 50% line meant the
             opening seconds ran while the viewer was still scrolling in */
          if (settle) clearTimeout(settle)
          settle = setTimeout(() => {
            if (v.currentTime > 0.25) v.currentTime = 0
            v.play().catch(() => {})
          }, 250)
        } else if (!entry.isIntersecting) {
          if (settle) clearTimeout(settle)
          v.pause()
        }
      },
      { threshold: [0, 0.8] }
    )
    obs.observe(ref.current)
    return () => {
      if (settle) clearTimeout(settle)
      obs.disconnect()
    }
  }, [showVideo])

  return (
    <div ref={ref} className={`${className} pointer-events-none`} style={{ zIndex }}>
      {showVideo ? (
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="auto"
          poster={poster}
          className={videoClassName}
          style={maskStyle}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <div className="relative w-full aspect-video">
          <Image
            src={poster}
            alt={alt}
            fill
            priority={priority}
            className="object-cover"
            sizes="100vw"
            style={maskStyle}
          />
        </div>
      )}
    </div>
  )
}
