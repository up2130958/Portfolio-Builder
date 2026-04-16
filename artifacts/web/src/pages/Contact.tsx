import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Mail } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email";
  }
  if (!data.subject.trim()) errors.subject = "Subject is required";
  if (data.message.trim().length < 10) errors.message = "Message must be at least 10 characters";
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");
    setServerError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.status === 429) {
        setServerError("Too many submissions. Please wait a few minutes and try again.");
        setStatus("error");
        return;
      }

      if (!res.ok) {
        const data = await res.json() as { error?: string };
        setServerError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto py-32 text-center">
        <CheckCircle size={48} className="text-[#722F37] mx-auto mb-6" />
        <h1 className="text-4xl font-['Playfair_Display'] font-bold text-[#2A2A2A] mb-4">Message sent.</h1>
        <p className="text-[#5C5C5C] font-['Merriweather'] mb-8">Thank you for reaching out. I'll be in touch soon.</p>
        <button
          onClick={() => setStatus("idle")}
          className="text-xs font-bold uppercase tracking-widest text-[#722F37] hover:underline transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto py-20">
      {/* Header */}
      <div className="border-b border-[#2A2A2A]/10 pb-16 mb-16">
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#5C5C5C] mb-3">Get in Touch</p>
        <div className="w-12 h-px bg-[#722F37] mb-8" />
        <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] font-black leading-tight">
          Let's build something <span className="italic font-normal text-[#722F37]">meaningful.</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4">
          <p className="font-['Merriweather'] text-[#5C5C5C] leading-relaxed mb-10">
            Currently accepting new opportunities. Whether it's a massive system redesign or just grabbing coffee in the Mission, my inbox is open.
          </p>
          <div className="space-y-5">
            <div className="border-t border-[#2A2A2A]/15 pt-5">
              <p className="text-xs uppercase tracking-widest font-bold text-[#5C5C5C] mb-1">Email</p>
              <a href="mailto:alex@example.com" className="text-[#722F37] font-bold hover:underline flex items-center gap-2">
                <Mail size={14} /> alex@example.com
              </a>
            </div>
            <div className="border-t border-[#2A2A2A]/15 pt-5">
              <p className="text-xs uppercase tracking-widest font-bold text-[#5C5C5C] mb-1">Location</p>
              <p className="text-[#2A2A2A] font-bold font-['Playfair_Display']">San Francisco, CA</p>
            </div>
            <div className="border-t border-[#2A2A2A]/15 pt-5">
              <p className="text-xs uppercase tracking-widest font-bold text-[#5C5C5C] mb-1">Response time</p>
              <p className="text-[#2A2A2A] font-bold">Usually within 24 hours</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="lg:col-span-8 space-y-6">
          {serverError && (
            <div className="flex items-start gap-3 border border-[#722F37]/30 bg-[#722F37]/5 p-4 text-[#722F37] text-sm font-['Merriweather']">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              {serverError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field label="Name" error={errors.name}>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className={inputClass(!!errors.name)}
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputClass(!!errors.email)}
              />
            </Field>
          </div>

          <Field label="Subject" error={errors.subject}>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="What's this about?"
              className={inputClass(!!errors.subject)}
            />
          </Field>

          <Field label="Message" error={errors.message}>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your message..."
              rows={7}
              className={inputClass(!!errors.message) + " resize-none"}
            />
          </Field>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center gap-2 bg-[#2A2A2A] text-[#FDFBF7] px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#722F37] disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300"
          >
            {status === "submitting" ? (
              <>
                <span className="animate-spin w-3 h-3 border-2 border-white/30 border-t-white rounded-full" />
                Sending...
              </>
            ) : (
              <>
                <Send size={14} /> Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full bg-white border font-['Lato'] px-4 py-3 text-[#2A2A2A] placeholder-[#9C9C9C] focus:outline-none focus:ring-1 transition-colors text-sm ${
    hasError
      ? "border-[#722F37] focus:ring-[#722F37]/30"
      : "border-[#2A2A2A]/20 focus:ring-[#2A2A2A]/30 focus:border-[#2A2A2A]/40"
  }`;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-[#5C5C5C] mb-2">{label}</label>
      {children}
      {error && <p className="text-[#722F37] text-xs mt-1 font-bold">{error}</p>}
    </div>
  );
}
