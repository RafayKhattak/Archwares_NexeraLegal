// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-bold">Welcome to Nexera Legal</h1>
      <p className="mt-4 text-lg text-gray-600">AI-driven legal assistance for Pakistan</p>
      <Link href="/features">
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Get Started
        </button>
      </Link>
    </main>
  );
}
