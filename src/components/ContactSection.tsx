import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import React, { useState } from "react";
import { fadeUp, stagger } from "./motion";

const contactInfo = [
  {
    icon: Mail,
    label: "hulak@krishnaakhanal.com.np",
    href: "mailto:hulak@krishnaakhanal.com.np",
    accent: "text-cyan-400",
  },
  {
    icon: Phone,
    label: "+977 9867402144",
    href: "tel:+9779867402144",
    accent: "text-orange-400",
  },
  { icon: MapPin, label: "Kathmandu, Nepal", accent: "text-green-400" },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/krishnakhanal77" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/krishna-khanal-85b98021a/",
  },
  { icon: Twitter, label: "X / Twitter", href: "https://x.com/Krishna20744" },
];

const inputClass =
  "w-full rounded-lg border border-white/10 bg-gray-900/60 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20";

type Status = "" | "success" | "error";

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<Status>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const serviceKey = import.meta.env.VITE_EMAILJS_SERVICE_KEY;
      const templateKey = import.meta.env.VITE_EMAILJS_TEMPLATE_KEY;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceKey || !templateKey || !publicKey) {
        throw new Error(
          "EmailJS configuration missing. Please restart the dev server and check environment variables.",
        );
      }

      if (
        !formData.name.trim() ||
        !formData.email.trim() ||
        !formData.message.trim()
      ) {
        throw new Error("Please fill in all required fields.");
      }

      await emailjs.send(
        serviceKey,
        templateKey,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: "Krishna Khanal",
        },
        publicKey,
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
      console.error("Failed to send email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="mx-auto max-w-5xl"
      variants={stagger(0, 0.1)}
      initial="hidden"
      animate="show"
    >
      <motion.header variants={fadeUp} className="mb-10 space-y-3 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          <span className="gradient-text">Get In Touch</span>
        </h1>
        <p className="text-gray-400 md:text-lg">
          Let's create something amazing together
        </p>
      </motion.header>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        {/* Contact info */}
        <motion.aside
          variants={fadeUp}
          className="card flex flex-col gap-6 p-6"
        >
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-white">
              Contact information
            </h2>
            <p className="text-sm text-gray-400">
              Have a project in mind or just want to say hi? My inbox is open.
            </p>
          </div>

          <ul className="space-y-4">
            {contactInfo.map(({ icon: Icon, label, href, accent }) => (
              <li
                key={label}
                className="flex items-center gap-3 text-sm text-gray-300"
              >
                <span className="rounded-lg bg-white/5 p-2">
                  <Icon className={`h-4 w-4 ${accent}`} />
                </span>
                {href ? (
                  <a
                    href={href}
                    className="break-all transition-colors hover:text-white"
                  >
                    {label}
                  </a>
                ) : (
                  <span>{label}</span>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex gap-2 border-t border-white/10 pt-6">
            {socials.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                whileHover={{ y: -3 }}
                className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-gray-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-400"
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </motion.aside>

        {/* Form */}
        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit}
          className="card space-y-5 p-6"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleInputChange}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className={inputClass}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell me about your project…"
              value={formData.message}
              onChange={handleInputChange}
              className={`${inputClass} resize-none`}
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white shadow-lg shadow-cyan-500/10 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending…" : "Send Message"}
          </motion.button>

          <AnimatePresence>
            {submitStatus && (
              <motion.div
                key={submitStatus}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="status"
                className={`rounded-lg border p-4 text-sm ${
                  submitStatus === "success"
                    ? "border-green-500/40 bg-green-900/30 text-green-300"
                    : "border-red-500/40 bg-red-900/30 text-red-300"
                }`}
              >
                {submitStatus === "success"
                  ? "Message sent successfully! I'll get back to you soon."
                  : "Failed to send message. Please try again, or email me directly at hulak@krishnaakhanal.com.np."}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default ContactSection;
