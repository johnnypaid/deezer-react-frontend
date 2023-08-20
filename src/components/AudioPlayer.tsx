import React from "react";
import { useEffect, useState } from "react";

function AudioPlayer(track: any) {
  const [audio] = useState(new Audio(track.preview));
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return (
    <>
      <div key={track.preview}>
        <audio className="w-100" controls>
          <source src={track.preview} type="audio/mp3" />
        </audio>
      </div>
    </>
  );
}

export default React.memo(AudioPlayer);
