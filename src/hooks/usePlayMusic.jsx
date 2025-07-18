// hooks/usePlayMusic.js
import { useRef, useEffect, useCallback } from 'react';

export default function usePlayMusic(id, tracks = []) {
  const audioRef = useRef(new Audio());

  const play = useCallback(() => {
    const current = tracks.find(items => items.id == id);
    console.log('Playing track:', current);

    if (current) {
      audioRef.current.pause();
      audioRef.current.src = current.url;
      audioRef.current.play();
    }
  }, [id, tracks]);

  useEffect(() => {
    console.log("useEffect – auto play");
    play();
    return () => {
      audioRef.current.pause();
    };
  }, [play]);

  return play;
}
