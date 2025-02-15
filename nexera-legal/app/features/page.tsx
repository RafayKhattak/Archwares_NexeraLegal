// app/features/page.tsx
import Link from "next/link";

const features = [
  {
    title: "Legal Guardian",
    href: "/legal-guardian",
    description: "AI-powered legal insights & compliance checks.",
  },
  {
    title: "Smart Tax",
    href: "/smart-tax",
    description: "Automated tax assistance & optimization.",
  },
  {
    title: "Litigation Assistance",
    href: "/litigation-assistance",
    description: "Case preparation & argument enhancement.",
  },
];

export default function Features() {
  return (
    <main className="min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Our Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Link key={feature.href} href={feature.href} className="block">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
              <h2 className="text-xl font-semibold">{feature.title}</h2>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
