import { Contact } from "@/types";
import { Mail, Linkedin, Github, Twitter, Send } from "lucide-react";
import { useState } from "react";

interface ContactSectionProps {
  contact: Contact;
}

const SectionTitle: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => (
  <div className="text-center mb-12 sm:mb-16">
    <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tighter">
      {title}
    </h2>
    <p className="mt-2 text-sm sm:text-base font-semibold text-gray-500 tracking-[0.2em] sm:tracking-[0.3em] uppercase">
      {subtitle}
    </p>
  </div>
);

export const ContactSection = ({ contact }: ContactSectionProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contact.web3formsKey) {
      alert("Contact form is not configured. Please add a Web3Forms key.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: contact.web3formsKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-16">
      <SectionTitle title="GET IN TOUCH" subtitle="LET'S CONNECT" />

      {/* Contact Form */}
      {contact.web3formsKey ? (
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200/80 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all text-gray-900"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200/80 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all text-gray-900"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-200/80 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all resize-none text-gray-900 leading-relaxed"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gray-900 text-white px-6 py-3.5 rounded-lg font-bold text-sm tracking-wide hover:bg-gray-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  SENDING...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  SEND MESSAGE
                </>
              )}
            </button>

            {submitStatus === "success" && (
              <div className="p-4 bg-green-50 border border-green-200/80 rounded-lg text-green-800 text-sm font-medium text-center">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-4 bg-red-50 border border-red-200/80 rounded-lg text-red-800 text-sm font-medium text-center">
                Oops! Something went wrong. Please try again.
              </div>
            )}
          </form>

          {/* Social Links - Horizontal */}
          <div className="mt-12 pt-12 border-t border-gray-200/80">
            <p className="text-center text-sm font-semibold text-gray-500 tracking-wider uppercase mb-6">
              Or connect with me on
            </p>
            <div className="flex items-center justify-center gap-4">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-900 hover:text-white transition-all hover:scale-110"
                  title="Email"
                >
                  <Mail className="w-6 h-6" />
                </a>
              )}

              {contact.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-900 hover:text-white transition-all hover:scale-110"
                  title="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              )}

              {contact.github && (
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-900 hover:text-white transition-all hover:scale-110"
                  title="GitHub"
                >
                  <Github className="w-6 h-6" />
                </a>
              )}

              {contact.twitter && (
                <a
                  href={contact.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-900 hover:text-white transition-all hover:scale-110"
                  title="Twitter"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-gray-600 leading-relaxed mb-8">
            Feel free to reach out through any of these channels:
          </p>
          
          {/* Social Links - Horizontal (when no form) */}
          <div className="flex items-center justify-center gap-4">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-900 hover:text-white transition-all hover:scale-110"
                title="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            )}

            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-900 hover:text-white transition-all hover:scale-110"
                title="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            )}

            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-900 hover:text-white transition-all hover:scale-110"
                title="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
            )}

            {contact.twitter && (
              <a
                href={contact.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-900 hover:text-white transition-all hover:scale-110"
                title="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
