import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

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
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <CheckCircle size={48} className="text-teal-400 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-slate-100 mb-3">Message sent!</h1>
        <p className="text-slate-400 mb-8">Thank you for reaching out. I'll get back to you as soon as I can.</p>
        <button
          onClick={() => setStatus("idle")}
          className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl font-bold text-slate-100 mb-4">Get in touch</h1>
          <p className="text-slate-400 leading-relaxed mb-8">
            I'm always open to interesting conversations — whether it's about a potential project,
            a job opportunity, or just want to say hello. My inbox is open.
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-slate-500 text-sm uppercase tracking-wide mb-1">Email</p>
              <a href="mailto:alex@example.com" className="text-teal-400 hover:text-teal-300 transition-colors">alex@example.com</a>
            </div>
            <div>
              <p className="text-slate-500 text-sm uppercase tracking-wide mb-1">Location</p>
              <p className="text-slate-300">San Francisco, CA</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm uppercase tracking-wide mb-1">Response time</p>
              <p className="text-slate-300">Usually within 24 hours</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {serverError && (
            <div className="flex items-start gap-3 bg-red-900/20 border border-red-800 rounded-xl p-4 text-red-400 text-sm">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              {serverError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
              rows={6}
              className={inputClass(!!errors.message) + " resize-none"}
            />
          </Field>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            {status === "submitting" ? (
              <>
                <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                Sending...
              </>
            ) : (
              <>
                <Send size={16} /> Send message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full bg-slate-900 border rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 transition-colors ${
    hasError
      ? "border-red-700 focus:ring-red-700/50"
      : "border-slate-700 focus:ring-teal-600/50 focus:border-teal-700"
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
      <label className="block text-slate-400 text-sm font-medium mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
