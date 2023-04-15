"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import useEventListener from "../../hooks/useEventListener";

import styles from "./page.module.css";

interface Dimension {
  width: number;
  height: number;
}

type TransitionState = "measure" | "start" | "end";

function getRefDimensions<T extends HTMLElement>(ref: RefObject<T>) {
  if (!ref?.current) {
    return { width: 0, height: 0 };
  }

  return { width: ref.current.offsetWidth, height: ref.current.offsetHeight };
}

function PhraseChanger() {
  const phrases = [
    "frontend developer",
    "designer",
    "backend developer",
    "product manager",
    "cook",
  ];
  const numberOfPhrases = phrases.length;
  const [index, setIndex] = useState(0);
  const [transitionState, setTransitionState] =
    useState<TransitionState>("measure");
  const ref = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const measureCurrentRef = useRef<HTMLDivElement>(null);
  const measureNextRef = useRef<HTMLDivElement>(null);

  const [currentDimensions, setCurrentDimensions] = useState<Dimension>(
    getRefDimensions(measureCurrentRef)
  );
  const [nextDimensions, setNextDimensions] = useState<Dimension>(
    getRefDimensions(measureNextRef)
  );

  const currentIndex = index;
  const nextIndex = (currentIndex + 1) % numberOfPhrases;
  const currentPhrase = phrases[currentIndex];
  const nextPhrase = phrases[nextIndex];

  useEffect(() => {
    setCurrentDimensions(getRefDimensions(measureCurrentRef));
    setNextDimensions(getRefDimensions(measureNextRef));
  }, [index, transitionState]);

  useEffect(() => {
    if (transitionState !== "measure") {
      return () => {};
    }

    const timer = setTimeout(() => {
      // setTransitionState("start");
    }, 2000);

    return () => clearTimeout(timer);
  }, [transitionState, numberOfPhrases]);

  useEffect(() => {
    if (transitionState !== "end") {
      return () => {};
    }

    setIndex((currentIndex) => (currentIndex + 1) % numberOfPhrases);
    setTransitionState("measure");
  }, [transitionState, numberOfPhrases]);

  useEventListener(ref, "transitionend", () => {
    if (transitionState === "start") {
      setTransitionState("end");
    }
  });

  return (
    <div className={styles.headline}>
      Learn to be
      <br />a{" "}
      <div
        className={styles.cyclePhrase}
        ref={ref}
        style={
          nextDimensions.height != 0
            ? {
                width: `${
                  (transitionState === "measure"
                    ? currentDimensions
                    : nextDimensions
                  ).width
                }px`,
                height: `${
                  (transitionState === "end"
                    ? nextDimensions
                    : currentDimensions
                  ).height
                }px`,
              }
            : {}
        }
      >
        <div
          ref={measureNextRef}
          className={styles.measurePhrase}
          aria-hidden={true}
        >
          {nextPhrase}
        </div>
        <div
          ref={measureCurrentRef}
          className={styles.measurePhrase}
          aria-hidden={true}
        >
          {currentPhrase}
        </div>
        <div
          ref={nextRef}
          style={{
            marginLeft: `50%`,
            position: "absolute",
            left: `-${nextDimensions.width / 2}px`,
            transition:
              transitionState !== "measure"
                ? "top 400ms ease-in-out"
                : "initial",
            top:
              transitionState === "measure"
                ? `-${nextDimensions.height}px`
                : "0px",
            display:
              transitionState === "measure" && nextDimensions.height == 0
                ? "none"
                : "initial",
          }}
        >
          {nextPhrase}
        </div>
        <div
          ref={currentRef}
          style={{
            position: "relative",
            transition:
              transitionState !== "measure"
                ? "top 400ms ease-in-out"
                : "initial",
            top:
              transitionState === "measure"
                ? "0px"
                : `${currentDimensions.height}px`,
            ...(transitionState !== "measure"
              ? {
                  marginLeft: `50%`,
                  left: `-${currentDimensions.width / 2}px`,
                }
              : {}),
          }}
        >
          {currentPhrase}
        </div>
      </div>{" "}
      today
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <h1>Phrase changer</h1>
      <PhraseChanger />
    </div>
  );
}
