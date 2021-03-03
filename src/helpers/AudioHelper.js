import stepSound from './sounds/step.wav';
import winSound from './sounds/win.wav';
import backgroundMusic from './sounds/backgroundmusic.wav';

export const stepAudio = new Audio(stepSound);

export const winAudio = new Audio(winSound);

export const backgroundAudio = new Audio(backgroundMusic);

export const playSound = (audioFile) => {
  audioFile.play();
};

export const playMusic = (audioFile) => {
  audioFile.loop = true;
  audioFile.play();
};

export const stopMusic = (audioFile) => {
  audioFile.pause();
};

export const setVolume = (audioFile, volume) => {
  audioFile.volume = volume;
};
