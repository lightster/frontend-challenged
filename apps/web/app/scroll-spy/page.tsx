"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./page.module.css";

const headings = Array.from(new Array(10), (_, index) => {
  return {
    id: `heading-${index.toString()}`,
    title: `Heading ${index + 1}`,
    spacing: index * 100,
  };
});

function Spy({
  on,
  headers,
}: {
  on: Map<string, HTMLElement>;
  headers: typeof headings;
}) {
  const [headingsInView, setHeadingsInView] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const updatedHeadings: Record<string, boolean> = {};
      entries.forEach((entry) => {
        if (
          entry.target instanceof HTMLElement &&
          entry.target.dataset.scrollSpyId
        ) {
          updatedHeadings[entry.target.dataset.scrollSpyId] =
            entry.isIntersecting;
        }
      });

      setHeadingsInView((h) => ({ ...h, ...updatedHeadings }));
    });

    on.forEach((node) => {
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, [on]);

  const activeHeading = headers.find(({ id }) => {
    return headingsInView[id];
  });

  return (
    <>
      {headers.map(({ id, title }) => (
        <div
          key={id}
          style={{ fontWeight: id === activeHeading?.id ? "bold" : "normal" }}
        >
          {title}
        </div>
      ))}
    </>
  );
}

function ScrollSpy() {
  const refs = useRef<Map<string, HTMLElement> | null>(null);
  const [counter, setCounter] = useState(0);

  function getMap() {
    if (!refs.current) {
      refs.current = new Map<string, HTMLElement>();
    }

    return refs.current;
  }

  return (
    <div className={styles.container}>
      <div className={styles.headings}>
        {counter}
        {headings.map(({ id, title, spacing }) => (
          <div
            key={id}
            ref={(node) => {
              if (node) {
                getMap().set(id, node);
              } else {
                getMap().delete(id);
              }
            }}
            data-scroll-spy-id={id}
          >
            <h2>{title}</h2>
            <div style={{ height: `${spacing}px` }} />
          </div>
        ))}
      </div>
      <div className={styles.spyContainer}>
        <div className={styles.spy}>
          <Spy on={getMap()} headers={headings} />
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <h1>Scroll spy</h1>
      <ScrollSpy />
    </div>
  );
}
