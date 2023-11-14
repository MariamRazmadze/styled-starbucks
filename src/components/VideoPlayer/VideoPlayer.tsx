import { useRef, useState, useEffect } from "react";
import {
  VideoContainer,
  Controls,
  ProgressBar,
  ProgressBarFill,
  VideoButton,
} from "./StyledPlayer";

import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { BsFillVolumeUpFill, BsFillVolumeMuteFill } from "react-icons/bs";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
        setHasEnded(false);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  useEffect(() => {
    const currentVideoRef = videoRef.current;

    const interval = setInterval(() => {
      if (currentVideoRef) {
        setProgress(
          (currentVideoRef.currentTime / currentVideoRef.duration) * 100
        );
      }
    }, 1000);

    const handleEnded = () => {
      setHasEnded(true);
      setIsPlaying(false);
    };

    if (currentVideoRef) {
      currentVideoRef.addEventListener("ended", handleEnded);
    }

    return () => {
      clearInterval(interval);
      if (currentVideoRef) {
        currentVideoRef.removeEventListener("ended", handleEnded);
      }
    };
  }, []);

  return (
    <div className="App">
      <VideoContainer>
        <video ref={videoRef} controls={false} width={"100%"}>
          <source src="/venti.mp4" type="video/mp4"></source>
        </video>
        <Controls>
          <VideoButton onClick={handlePlayPause}>
            {isPlaying && !hasEnded ? <BsPauseFill /> : <BsPlayFill />}
          </VideoButton>
          <VideoButton onClick={handleMute}>
            {isMuted ? <BsFillVolumeMuteFill /> : <BsFillVolumeUpFill />}
          </VideoButton>
        </Controls>
        <ProgressBar>
          <ProgressBarFill $progress={progress}></ProgressBarFill>
        </ProgressBar>
      </VideoContainer>
    </div>
  );
}
