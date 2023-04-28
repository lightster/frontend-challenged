import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Challenged</h1>
      <ul>
        <li>
          <Link href="/phrase-changer">Phrase Changer</Link>
        </li>
        <li>
          <Link href="/pillars">Pillars</Link>
        </li>
        <li>
          <Link href="/scroll-spy">Scroll Spy</Link>
        </li>
      </ul>
    </div>
  );
}

