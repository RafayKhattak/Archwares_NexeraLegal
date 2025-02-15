import Link from "next/link";
import { FaBalanceScale, FaCalculator, FaGavel } from "react-icons/fa";

const features = [
  {
    title: "Legal Guardian",
    href: "/legal-guardian",
    description: "AI-powered legal insights & compliance checks, ensuring you stay legally protected.",
    icon: <FaBalanceScale className="text-blue-600 text-5xl mb-4" />,
  },
  {
    title: "Smart Tax",
    href: "/smart-tax",
    description: "Automated tax assistance & optimization, making tax filing seamless and efficient.",
    icon: <FaCalculator className="text-green-600 text-5xl mb-4" />,
  },
  {
    title: "Litigation Assistance",
    href: "/litigation-assistance",
    description: "AI-driven case preparation & argument enhancement for better legal outcomes.",
    icon: <FaGavel className="text-red-600 text-5xl mb-4" />,
  },
];

export default function Features() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section className="h-[50vh] bg-gradient-to-r from-blue-600 to-purple-600 flex flex-col justify-center items-center text-center text-white p-6">
        <h1 className="text-5xl font-extrabold">Discover Nexera Legal™ Features</h1>
        <p className="mt-4 text-lg max-w-3xl">
          Our AI-driven legal solutions are designed to simplify legal complexities in Pakistan. 
          Explore how Nexera Legal™ can help you with compliance, taxes, and litigation.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center">Our Core Features</h2>
        <p className="text-gray-600 text-center mt-2 max-w-2xl mx-auto">
          Empowering individuals and businesses with AI-driven legal assistance.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Link key={feature.href} href={feature.href} className="block">
              <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 flex flex-col items-center text-center cursor-pointer">
                {feature.icon}
                <h2 className="text-2xl font-semibold mt-2">{feature.title}</h2>
                <p className="text-gray-600 mt-2">{feature.description}</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all">
                  Learn More
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold">Start Using Nexera Legal™ Today!</h2>
        <p className="mt-2 text-lg">Experience AI-powered legal assistance like never before.</p>
        <Link href="/legal-guardian">
          <button className="mt-6 px-6 py-3 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-gray-200 transition-all">
            Get Started
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-800 text-white text-center text-sm">
        Created by <span className="font-semibold">Team Archwares™</span> for <span className="font-semibold">NETSOL AI Hackathon 2025</span>.
      </footer>
    </main>
  );
}
