import { InjectionToken } from "@angular/core";

export interface ConfettiConfig {
  angle: number;
  spread: number;
  width: string;
  height: string;
  perspective: string;
  duration: number;
  dragFriction: number;
  stagger: number;
  startVelocity: number;
  elementCount: number;
  decay: number;
  colors: string[];
  random: () => number;
}

export const NGX_CONFETTI_GLOBAL_CONFIG = new InjectionToken<ConfettiConfig>(
  'ngx-confetti-global-config',
);

const defaultColors = ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"];

export const defaultsConfettiConfig = {
  angle: 90,
  spread: 45,
  startVelocity: 45,
  elementCount: 50,
  width: "10px",
  height: "10px",
  perspective: "",
  colors: defaultColors,
  duration: 3000,
  stagger: 0,
  dragFriction: 0.1,
  random: Math.random
}
