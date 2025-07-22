// src/hooks/usePlayMusic.js
import { useRef, useEffect, useCallback } from 'react';
import { getDynamicAudio } from '../utils/getDynamicAudio';

export default function usePlayMusic(id, tracks = []) {
  // Giữ ref đến Audio instance
  const audioRef = useRef(null);

  // Hàm tạo hoặc recreate Audio
  const resetAudio = (url) => {
    // Hủy instance cũ nếu có
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    // Tạo mới và gán src
    const audio = new Audio(url);
    audio.loop = false;
    audioRef.current = audio;
    return audio;
  };

  // play trả về Promise từ audio.play()
  const play = useCallback(() => {
    const currentTrack = tracks.find(item => item.id === id);
    if (!currentTrack) return Promise.resolve();

    const url = getDynamicAudio(currentTrack.url);
    if (!url) return Promise.resolve();

    // Destroy + recreate trước khi play
    const audio = resetAudio(url);
    // Bắt sự kiện ended nếu cần
    audio.addEventListener('ended', () => {
      audio.pause();
      audio.currentTime = 0;
    });
    // Play và trả về promise
    return audio.play();
  }, [id, tracks]);

  // cleanup khi component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  return play;
}
