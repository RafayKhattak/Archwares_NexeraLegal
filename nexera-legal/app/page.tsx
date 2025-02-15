// app/page.tsx (Landing Page)
import Link from "next/link";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Empowering Legal Assistance with AI
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl">
          Nexera Legal™ offers AI-powered legal insights, tax optimization, and litigation support, simplifying legal complexities in Pakistan.
        </p>
        <Link href="/features">
          <button className="mt-6 px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all">
            Get Started
          </button>
        </Link>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          {[
            { title: "Legal Guardian", description: "AI-driven legal insights & compliance checks.", href: "/legal-guardian" },
            { title: "Smart Tax", description: "Automated tax assistance & optimization.", href: "/smart-tax" },
            { title: "Litigation Assistance", description: "Case preparation & argument enhancement.", href: "/litigation-assistance" },
          ].map((feature) => (
            <Link key={feature.href} href={feature.href}>
              <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600 mt-2">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us? */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold">Why Choose Nexera Legal?</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg">
          Our AI-powered legal solutions are designed to be fast, reliable, and accessible for everyone.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          {[
            "✔️ AI-Powered Insights",
            "✔️ 24/7 Legal Assistance",
            "✔️ Cost-Effective & Efficient",
          ].map((point, index) => (
            <div key={index} className="p-6 bg-white text-gray-900 rounded-lg shadow-md">
              <p className="text-lg font-semibold">{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-6">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
          {[
            { name: "Rafay Khattak", linkedin: "https://www.linkedin.com/in/rafaykhattak/", github: "https://github.com/RafayKhattak" },
            { name: "Idrees Ghazi", linkedin: "https://www.linkedin.com/in/idrees-ghazi-6447ba210/" },
            { name: "Qasim Hussain", linkedin: "https://www.linkedin.com/in/syed-qasim-h-11b734110/" },
            { name: "Ali Irfan", github: "https://github.com/eli-xir" },
          ].map((member) => (
            <div key={member.name} className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <div className="mt-3 flex space-x-4">
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    <FaLinkedin size={24} />
                  </a>
                )}
                {member.github && (
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-gray-700">
                    <FaGithub size={24} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <h2 className="text-3xl font-bold">Ready to Simplify Legal Processes?</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Join thousands of users leveraging Nexera Legal™ to make legal processes seamless and stress-free.
        </p>
        <Link href="/features">
          <button className="mt-6 px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all">
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
