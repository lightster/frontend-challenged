import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Challenged</h1>
      <ul>
        <li>
          <Link href="/phrase-changer">Phrase Changer</Link>
        </li>
      </ul>
    </div>
  );
}

