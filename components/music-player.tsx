"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, VolumeX, Music, ExternalLink } from "lucide-react"
import { useUserProfileStore } from "@/lib/stores/user-profile-store"

interface MusicService {
  name: string
  icon: string
  color: string
  embedUrl: (trackId: string) => string
}

const musicServices: MusicService[] = [
  {
    name: "Spotify",
    icon: "🎵",
    color: "#1DB954",
    embedUrl: (trackId) => `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`,
  },
  {
    name: "Pandora",
    icon: "📻",
    color: "#005483",
    embedUrl: (trackId) => `https://www.pandora.com/embed?trackId=${trackId}`,
  },
  {
    name: "YouTube Music",
    icon: "🎬",
    color: "#FF0000",
    embedUrl: (trackId) => `https://music.youtube.com/embed/${trackId}`,
  },
]

const frontierPlaylist = [
  {
    title: "Frontier Days",
    artist: "Western Winds",
    service: "Spotify",
    trackId: "4uLU6hMCjMI75M1A2tKUQC",
    genre: "Western",
  },
  {
    title: "Crypto Canyon",
    artist: "Digital Cowboys",
    service: "Spotify",
    trackId: "2takcwOaAZWiXQijPHIx7B",
    genre: "Electronic Western",
  },
  {
    title: "Steam Engine Blues",
    artist: "Steampunk Saloon",
    service: "Pandora",
    trackId: "steampunk-station",
    genre: "Steampunk",
  },
  {
    title: "Wyoming Wind",
    artist: "Prairie Echoes",
    service: "YouTube Music",
    trackId: "dQw4w9WgXcQ",
    genre: "Ambient Western",
  },
]

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)
  const { profile } = useUserProfileStore()

  const currentSong = frontierPlaylist[currentTrack]
  const currentService = musicServices.find((s) => s.name === currentSong.service)

  useEffect(() => {
    // Auto-play ambient frontier music when user enters
    const timer = setTimeout(() => {
      if (profile?.preferences?.notifications) {
        setIsPlaying(true)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [profile])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % frontierPlaylist.length)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + frontierPlaylist.length) % frontierPlaylist.length)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  if (isMinimized) {
    return (
      <div className="music-player">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMinimized(false)}
          className="text-white hover:bg-white/20"
        >
          <Music className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="music-player w-80">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-vintage text-sm">🎼 Frontier Radio</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMinimized(true)}
          className="text-white hover:bg-white/20 h-6 w-6 p-0"
        >
          ×
        </Button>
      </div>

      <div className="mb-3">
        <div className="text-xs font-vintage mb-1">{currentSong.title}</div>
        <div className="text-xs opacity-75">
          by {currentSong.artist} • {currentSong.genre}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Button variant="ghost" size="sm" onClick={prevTrack} className="text-white hover:bg-white/20 h-8 w-8 p-0">
          ⏮
        </Button>
        <Button variant="ghost" size="sm" onClick={togglePlay} className="text-white hover:bg-white/20 h-8 w-8 p-0">
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="sm" onClick={nextTrack} className="text-white hover:bg-white/20 h-8 w-8 p-0">
          ⏭
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="sm" onClick={toggleMute} className="text-white hover:bg-white/20 h-6 w-6 p-0">
          {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
        </Button>
        <Slider
          value={[isMuted ? 0 : volume]}
          onValueChange={(value) => setVolume(value[0])}
          max={100}
          step={1}
          className="flex-1"
        />
      </div>

      <div className="flex items-center justify-between text-xs">
        <span style={{ color: currentService?.color }}>
          {currentService?.icon} {currentService?.name}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.open(currentService?.embedUrl(currentSong.trackId), "_blank")}
          className="text-white hover:bg-white/20 h-6 w-6 p-0"
        >
          <ExternalLink className="h-3 w-3" />
        </Button>
      </div>

      {/* Hidden iframe for actual music playback */}
      {isPlaying && currentService && (
        <iframe
          src={currentService.embedUrl(currentSong.trackId)}
          width="0"
          height="0"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{ display: "none" }}
        />
      )}
    </div>
  )
}
