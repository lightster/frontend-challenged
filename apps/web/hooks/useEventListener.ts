import { RefObject, useEffect, useRef } from "react";

function useEventListener<K extends keyof DocumentEventMap>(
  element: "document",
  eventName: K,
  listener: (event: DocumentEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void;
function useEventListener<K extends keyof WindowEventMap>(
  element: "window",
  eventName: K,
  listener: (event: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void;
function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement
>(
  element: RefObject<T>,
  eventName: K,
  listener: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void;
function useEventListener<
  WindowEventKey extends keyof WindowEventMap,
  HTMLElementEventKey extends keyof HTMLElementEventMap
>(
  element: "document" | "window" | RefObject<HTMLElement>,
  eventType: WindowEventKey | HTMLElementEventKey,
  listener: (
    event:
      | WindowEventMap[WindowEventKey]
      | HTMLElementEventMap[HTMLElementEventKey]
      | Event
  ) => void,
  options?: boolean | AddEventListenerOptions
) {
  const callback = useRef(listener);

  useEffect(() => {
    callback.current = listener;
  }, [listener]);

  useEffect(() => {
    const target = (() => {
      if (element === "document") {
        return document;
      }
      if (element === "window") {
        return window;
      }

      return "current" in element ? element.current : element;
    })();
    if (!target) {
      return () => {};
    }

    const currentListener: typeof listener = (event) => callback.current(event);
    target.addEventListener(eventType, currentListener, options);

    return () => {
      target.removeEventListener(eventType, currentListener);
    };
  }, [element, eventType, options]);
}

export default useEventListener;
