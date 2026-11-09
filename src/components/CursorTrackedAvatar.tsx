import { useEffect, useRef, useState } from 'react'

const poster = '/assets/character-poster.webp'
const clip = '/assets/character-turn-web.mp4'
const trackingQuery = '(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)'

// Pose timings sampled from the supplied 24 fps clip. The first and last
// parts of the file hold the profile, so keep them outside the scrub range.
const poses = [0.5, 0.875, 1.375, 2.0833, 2.9167]
const front = poses[2]
const halfFrame = 1 / 48

function timeAt(position: number) {
  const segment = Math.min(3, Math.floor(position * 4))
  const fraction = position * 4 - segment
  return poses[segment] + (poses[segment + 1] - poses[segment]) * fraction
}

function TrackedVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video || failed) return

    let target = front
    let position = front
    let frame = 0
    let timeout = 0
    let lastTick = 0
    let visible = true
    let initialized = false
    let shown = false
    let stopped = false

    function fail() {
      stopped = true
      cancelAnimationFrame(frame)
      clearTimeout(timeout)
      setFailed(true)
    }

    function seek(time: number) {
      clearTimeout(timeout)
      timeout = window.setTimeout(fail, 3500)
      try {
        video!.currentTime = time
      } catch {
        fail()
      }
    }

    function initialize() {
      if (initialized || stopped) return
      if (!Number.isFinite(video!.duration) || video!.duration <= poses[4]) {
        fail()
        return
      }
      initialized = true
      seek(front)
    }

    function tick(now: number) {
      frame = 0
      if (stopped || !initialized || !visible || video!.seeking) return

      const elapsed = lastTick ? Math.min(now - lastTick, 60) : 16.7
      lastTick = now
      position += (target - position) * (1 - Math.exp(-elapsed / 82))
      if (Math.abs(target - position) < halfFrame) position = target

      if (Math.abs(position - video!.currentTime) >= halfFrame) {
        seek(position)
      } else if (position !== target) {
        schedule()
      } else {
        lastTick = 0
      }
    }

    function schedule() {
      if (!frame && !stopped && initialized && visible && !video!.seeking) {
        frame = requestAnimationFrame(tick)
      }
    }

    function onFrameReady() {
      if (stopped || !initialized || video!.seeking) return
      if (!shown) {
        if (video!.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return
        shown = true
        setReady(true)
      }
      clearTimeout(timeout)
      schedule()
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType === 'touch' || !visible) return
      const fraction = Math.max(0, Math.min(1, event.clientX / Math.max(1, window.innerWidth - 1)))
      target = timeAt(fraction)
      schedule()
    }

    function recenter() {
      target = front
      schedule()
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (!visible) recenter()
      else schedule()
    })
    observer.observe(video)

    video.addEventListener('loadedmetadata', initialize)
    video.addEventListener('seeked', onFrameReady)
    video.addEventListener('loadeddata', onFrameReady)
    video.addEventListener('error', fail)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', recenter)
    window.addEventListener('blur', recenter)

    if (video.error) fail()
    else if (video.readyState >= HTMLMediaElement.HAVE_METADATA) initialize()
    else timeout = window.setTimeout(fail, 12000)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      clearTimeout(timeout)
      video.removeEventListener('loadedmetadata', initialize)
      video.removeEventListener('seeked', onFrameReady)
      video.removeEventListener('loadeddata', onFrameReady)
      video.removeEventListener('error', fail)
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', recenter)
      window.removeEventListener('blur', recenter)
    }
  }, [failed])

  if (failed) return null

  return (
    <video
      ref={videoRef}
      className={ready ? 'avatar-video is-ready' : 'avatar-video'}
      src={clip}
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-hidden="true"
    />
  )
}

export default function CursorTrackedAvatar() {
  const [canTrack, setCanTrack] = useState(false)

  useEffect(() => {
    const query = window.matchMedia(trackingQuery)
    const update = () => setCanTrack(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return (
    <div className="avatar-stage">
      <img src={poster} alt="Portrait of Sasi in a black jacket" width="1600" height="900" fetchPriority="high" />
      {canTrack && <TrackedVideo />}
    </div>
  )
}
