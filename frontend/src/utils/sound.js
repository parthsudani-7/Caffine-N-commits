const audio = new Audio("/sounds/click.mp3");

export const clickSound = () => {
  audio.play().catch(() => {});
};