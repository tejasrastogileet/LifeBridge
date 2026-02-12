import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import heart from "../assets/heart.json";
import LifeBridgeLogo from "../components/LifeBridgeLogo";

const footerLinks = [
  { label: "Home", path: "/" },
  { label: "Become a Donor", path: "/signup" },
  { label: "Hospitals & Clinics", path: "/signup" },
  { label: "How It Works", path: "/learn-more" },
  { label: "FAQs", path: "/faq" },
];

const Home = () => {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Left: Logo & Brand Name */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <LifeBridgeLogo width="48" height="48" />
            <span className="hidden sm:block text-lg font-semibold text-teal-700 dark:text-teal-400 tracking-tight">
              LifeBridge
            </span>
          </div>

          {/* Center / Right */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-blue-600 transition"
            >
              Home
            </button>

            <button
              onClick={() => navigate("/login")}
              className="hover:text-blue-600 transition"
            >
              Login
            </button>

            <button
              onClick={toggleDark}
              className="text-xl"
              aria-label="Toggle Dark Mode"
            >
              {dark ? "🌞" : "🌙"}
            </button>
          </div>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <div className="px-6 md:px-12 pt-32">
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex flex-col md:flex-row items-center justify-between gap-10
                     bg-white dark:bg-gray-900
                     rounded-2xl p-8 md:p-12
                     shadow-md hover:shadow-xl
                     transition-shadow duration-300"
        >
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-lg"
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Bridge the Gap Between Life and Hope
            </h1>

            <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
              LifeBridge connects compassionate donors with patients in urgent need. Our secure, intelligent platform accelerates organ matching while maintaining the highest standards of medical ethics and patient care.
            </p>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => navigate("/signup")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg
                           shadow-md hover:bg-blue-700 hover:shadow-lg
                           transition-all font-medium pulse-heartbeat"
              >
                Become a Donor
              </button>

              <button
                onClick={() => navigate("/learn-more")}
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg
                           hover:bg-blue-50 dark:hover:bg-gray-800 transition"
              >
                Learn More
              </button>
            </div>
          </motion.div>

          {/* Right Animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Lottie animationData={heart} loop className="w-[320px] md:w-[420px]" />
          </motion.div>
        </motion.div>
      </div>

      {/* ================= WHY SECTION ================= */}
      <div className="text-center py-20 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">
          The Urgency of Organ Donation
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Globally, <span className="font-semibold">50,000+ patients</span> are waiting for a life-saving transplant—many running out of time. Yet, fewer than <span className="font-semibold">3% of eligible donors</span> register. One donor can save <span className="font-semibold">up to 8 lives</span> and improve dozens more. LifeBridge removes barriers and accelerates this critical connection.
        </p>
      </div>

      {/* ================= HOW IT WORKS ================= */}
      <div className="py-16 px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center mb-12">
          How LifeBridge Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Register Your Intent",
              desc: "Create a secure account and document your donation preferences with medical-grade encryption. Your consent is legally binding and always under your control.",
            },
            {
              title: "Intelligent Matching",
              desc: "Our AI-powered system analyzes medical criteria in real-time to find the best match for patients in need, considering compatibility and urgency.",
            },
            {
              title: "Seamless Coordination",
              desc: "Hospitals coordinate directly through our platform, ensuring transparent communication and regulatory compliance from match to transplant.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= IMAGE + STORY ================= */}
      <div className="py-20 px-6 md:px-12 flex flex-col md:flex-row items-center gap-10">
        {/* <img
          src={donor}
          alt="Organ Donation"
          className="w-full md:w-1/2 rounded-2xl shadow-lg"
        /> */}

        <div className="max-w-xl">
          <h2 className="text-3xl font-bold mb-4">
            Your Gift. A Second Lifetime.
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Organ donation is an act of profound compassion. By registering with LifeBridge today, you unlock the power to save lives even after your own. Your choice creates a ripple effect—transforming waiting rooms into recovery rooms, and heartbreak into hope.
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
          >
            Register as a Donor Today
          </button>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 px-6 md:px-12">
        {[
          { value: "8+", label: "Lives Saved Per Registered Donor" },
          { value: "50K+", label: "Patients Waiting Globally" },
          { value: "99.9%", label: "Uptime Medical Compliance" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow text-center"
          >
            <div className="text-4xl font-bold text-blue-600 mb-1">{s.value}</div>
            <div className="text-gray-700 dark:text-gray-300">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">

  <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

    {/* Brand & Mission */}
    <div className="lg:col-span-2">
      <h3 className="text-2xl font-bold tracking-wide">LifeBridge</h3>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        LifeBridge is a secure, intelligent organ donation coordination platform powered by AI and built on trust. We connect eligible donors, hospitals, and patients while eliminating barriers, reducing wait times, and ensuring every donation saves lives—ethically, transparently, and compassionately.
      </p>

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
        Transforming hope into action. One life at a time.
      </p>
    </div>

    {/* Platform */}
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-4">
        Platform
      </h4>
      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
  {footerLinks.map((link, i) => (
    <li key={i}>
      <Link
        to={link.path}
        className="hover:text-blue-600 transition-colors"
      >
        {link.label}
      </Link>
    </li>
  ))}
</ul>

    </div>

    {/* Legal */}
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-4">
        Legal
      </h4>
      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <li className="hover:text-blue-600 cursor-pointer">Privacy Policy</li>
        <li className="hover:text-blue-600 cursor-pointer">Terms of Service</li>
        <li className="hover:text-blue-600 cursor-pointer">Medical Disclaimer</li>
        <li className="hover:text-blue-600 cursor-pointer">Consent Policy</li>
        <li className="hover:text-blue-600 cursor-pointer">Data Protection</li>
      </ul>
    </div>

    {/* Trust & Compliance */}
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-4">
        Trust & Compliance
      </h4>
      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <li>✔ Verified Medical Institutions</li>
        <li>✔ Encrypted Health Records</li>
        <li>✔ Ethical Transplant Guidelines</li>
        <li>✔ Government Norms Followed</li>
        <li>✔ Secure Consent Management</li>
      </ul>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="border-t border-gray-200 dark:border-gray-800 py-6 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">

      <p>
        © {new Date().getFullYear()} LifeBridge. All rights reserved.
      </p>

      <p className="text-center md:text-right text-xs leading-relaxed">
        LifeBridge does not facilitate organ trade. All donations are voluntary
        and comply with applicable medical and legal regulations.
      </p>

    </div>
  </div>
</footer>
    </div>
  );
};

export default Home;
