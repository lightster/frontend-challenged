"use client";

import styles from "./page.module.css";

function Pillars() {
  return (
    <div className={styles.container}>
      <div className={`${styles.pillar} ${styles.pillar1}`} />
      <div className={`${styles.header} ${styles.header1}`}>Shadow &amp; Bone</div>
      <div className={`${styles.description} ${styles.description1}`}>
        Dark forces conspire against orphan mapmaker Alina Starkov when she
        unleashes an extraordinary power that could change the fate of her
        war-torn world.
      </div>
      <div className={`${styles.footer} ${styles.footer1}`}>Netflix</div>

      <div className={`${styles.gap} ${styles.gap1}`} />

      <div className={`${styles.pillar} ${styles.pillar2}`} />
      <div className={`${styles.header} ${styles.header2}`}>Better Call Saul</div>
      <div className={`${styles.description} ${styles.description2}`}>
        The trials and tribulations of criminal lawyer Jimmy McGill in the years
        leading up to his fateful run-in with Walter White and Jesse Pinkman.{" "}
      </div>
      <div className={`${styles.footer} ${styles.footer2}`}>AMC</div>

      <div className={`${styles.gap} ${styles.gap2}`} />

      <div className={`${styles.pillar} ${styles.pillar3}`} />
      <div className={`${styles.header} ${styles.header3}`}>The Marvelous Mrs. Maisel</div>
      <div className={`${styles.description} ${styles.description3}`}>
        After her husband leaves her, young mother of two Miriam "Midge" Maisel
        discovers that she has a talent for stand-up comedy. Could this be her
        calling?
      </div>
      <div className={`${styles.footer} ${styles.footer3}`}>Amazon Prime</div>
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <h1>Pillars</h1>
      <Pillars />
    </div>
  );
}
