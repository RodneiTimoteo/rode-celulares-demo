"use client";

import { useSyncExternalStore } from "react";

type Listener = () => void;

const listeners = new Set<Listener>();
let currentTime = Date.now();
let timer: ReturnType<typeof setInterval> | null = null;

function notify() {
  currentTime = Date.now();
  listeners.forEach((listener) => listener());
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  currentTime = Date.now();

  if (timer === null) {
    timer = setInterval(notify, 1000);
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  };
}

function getSnapshot() {
  return currentTime;
}

function getServerSnapshot() {
  return 0;
}

export function useOfferClock() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
