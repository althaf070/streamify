"use client"

import { Participant,Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import { useTracks } from "@livekit/components-react"
import { FullScreenControl } from "./FullScreenControl";
import { useEventListener } from "usehooks-ts";
import { VolumeControl } from "./VolumeControl";
interface LiveVideoProps {
    participant: Participant;
  };
  

export const LiveVideo = ({participant}:LiveVideoProps) => {
    const videoref=useRef<HTMLVideoElement>(null)
    const wrapperref=useRef<HTMLDivElement>(null)
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [volume, setVolume] = useState(0);

    const onVolumeChange=(value:number)=>{
        setVolume(+value)
        if(videoref?.current){
            videoref.current.muted = value ===0
            videoref.current.volume = +value *0.01
        }
    }
    const toggleMute = () => {
        const isMuted = volume === 0;
    
        setVolume(isMuted ? 50 : 0);
    
        if (videoref?.current) {
          videoref.current.muted = !isMuted;
          videoref.current.volume = isMuted ? 0.5 : 0;
        }
      };

      useEffect(() => {
        onVolumeChange(0);
      }, []);

    const toggleFullscreen = () => {
        if (isFullscreen) {
          document.exitFullscreen()
        } else if (wrapperref?.current) {
          wrapperref.current.requestFullscreen()
        }
      };
      const handleFullscreenChange = () => {
        const isCurrentlyFullscreen = document.fullscreenElement !== null;
        setIsFullscreen(isCurrentlyFullscreen);
      }
    
      useEventListener("fullscreenchange", handleFullscreenChange, wrapperref);
    
    useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
        if (videoref.current) {
          track.publication.track?.attach(videoref.current)
        }
      });
  return (
    <div ref={wrapperref} className="relative h-full flex">
        <video ref={videoref} width={"100%"}/>
        <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
        <VolumeControl
            onChange={onVolumeChange}
            value={volume}
            onToggle={toggleMute}
          />
            <FullScreenControl
             isFullscreen={isFullscreen}
             onToggle={toggleFullscreen}
            />
            </div>
        </div>
    </div>
  )
}
