import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { LogIn, LogOut, Mail, AlertCircle, Lock } from "lucide-react";

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface AdminState {
  loggedIn: boolean;
  username: string | null;
}

async function fetchContacts(): Promise<Contact[]> {
  const res = await fetch("/api/admin/contacts", { credentials: "include" });
  if (res.status === 401) throw new Error("unauthorized");
  if (!res.ok) throw new Error("Failed to fetch contacts");
  return res.json() as Promise<Contact[]>;
}

async function loginAdmin(creds: { username: string; password: string }): Promise<{ username: string }> {
  const res = await fetch("/api/admin/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(creds),
  });
  if (!res.ok) {
    const data = await res.json() as { error?: string };
    throw new Error(data.error ?? "Login failed");
  }
  return res.json() as Promise<{ username: string }>;
}

async function logoutAdmin(): Promise<void> {
  await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
}

export default function Admin() {
  const [state, setState] = useState<AdminState>({ loggedIn: false, username: null });
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const contactsQuery = useQuery<Contact[], Error>({
    queryKey: ["admin-contacts"],
    queryFn: fetchContacts,
    enabled: state.loggedIn,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: loginAdmin,
    onSuccess: (data) => {
      setState({ loggedIn: true, username: data.username });
      setLoginError(null);
    },
    onError: (err: Error) => {
      setLoginError(err.message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutAdmin,
    onSuccess: () => {
      setState({ loggedIn: false, username: null });
    },
  });

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!loginForm.username || !loginForm.password) {
      setLoginError("Username and password are required");
      return;
    }
    loginMutation.mutate(loginForm);
  }

  if (!state.loggedIn) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 border border-[#722F37]/30 mb-6">
              <Lock size={20} className="text-[#722F37]" />
            </div>
            <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#2A2A2A]">Admin</h1>
            <p className="text-[#5C5C5C] text-sm mt-1 font-['Merriweather']">Sign in to view contact submissions</p>
          </div>

          <form onSubmit={handleLogin} className="bg-white border border-[#2A2A2A]/10 p-8 space-y-5">
            {loginError && (
              <div className="flex items-center gap-2 text-[#722F37] text-sm border border-[#722F37]/30 bg-[#722F37]/5 px-4 py-3 font-['Merriweather']">
                <AlertCircle size={14} /> {loginError}
              </div>
            )}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#5C5C5C] mb-2">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm((f) => ({ ...f, username: e.target.value }))}
                className="w-full border border-[#2A2A2A]/20 px-4 py-2.5 text-[#2A2A2A] text-sm focus:outline-none focus:ring-1 focus:ring-[#2A2A2A]/30"
                placeholder="admin"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#5C5C5C] mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))}
                className="w-full border border-[#2A2A2A]/20 px-4 py-2.5 text-[#2A2A2A] text-sm focus:outline-none focus:ring-1 focus:ring-[#2A2A2A]/30"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full flex items-center justify-center gap-2 bg-[#2A2A2A] text-[#FDFBF7] py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#722F37] disabled:opacity-60 transition-colors duration-300"
            >
              {loginMutation.isPending ? (
                <span className="animate-spin w-3 h-3 border-2 border-white/30 border-t-white rounded-full" />
              ) : (
                <LogIn size={14} />
              )}
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2A2A2A] font-['Lato']">
      <header className="border-b border-[#2A2A2A]/10 bg-[#FDFBF7]">
        <div className="mx-auto max-w-5xl px-6 md:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-[#722F37]" />
            <span className="font-bold text-sm uppercase tracking-widest">Contact Submissions</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#5C5C5C] text-xs">{state.username}</span>
            <button
              onClick={() => logoutMutation.mutate()}
              className="flex items-center gap-1.5 text-[#5C5C5C] hover:text-[#722F37] text-xs font-bold uppercase tracking-widest transition-colors"
            >
              <LogOut size={12} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 md:px-12 py-10">
        {contactsQuery.isLoading && (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border border-[#2A2A2A]/10 bg-white p-6 animate-pulse">
                <div className="h-4 bg-[#2A2A2A]/10 rounded w-1/3 mb-2" />
                <div className="h-3 bg-[#2A2A2A]/8 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {contactsQuery.error && (
          <div className="border border-[#722F37]/30 bg-[#722F37]/5 p-6 text-[#722F37] text-sm font-['Merriweather']">
            Failed to load contact submissions.
          </div>
        )}

        {contactsQuery.data && contactsQuery.data.length === 0 && (
          <div className="text-center py-24 text-[#5C5C5C]">
            <Mail size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-['Merriweather']">No contact submissions yet.</p>
          </div>
        )}

        {contactsQuery.data && contactsQuery.data.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-[#5C5C5C] mb-6">
              {contactsQuery.data.length} submission{contactsQuery.data.length !== 1 ? "s" : ""} total
            </p>
            <div className="divide-y divide-[#2A2A2A]/10 border border-[#2A2A2A]/10 bg-white">
              {contactsQuery.data.map((contact) => (
                <div key={contact.id}>
                  <button
                    className="w-full flex items-start justify-between p-5 text-left hover:bg-[#FDFBF7] transition-colors"
                    onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <span className="font-bold text-[#2A2A2A] font-['Playfair_Display']">{contact.name}</span>
                        <span className="text-[#722F37] text-sm">{contact.email}</span>
                      </div>
                      <p className="text-[#5C5C5C] text-sm">{contact.subject}</p>
                    </div>
                    <span className="text-[#5C5C5C] text-xs font-bold uppercase tracking-widest ml-4 shrink-0">
                      {new Date(contact.createdAt).toLocaleDateString("en-US", {
                        year: "numeric", month: "short", day: "numeric",
                      })}
                    </span>
                  </button>
                  {expandedId === contact.id && (
                    <div className="border-t border-[#2A2A2A]/10 px-5 pb-5 pt-4 bg-[#FDFBF7]">
                      <p className="text-[#2A2A2A] text-sm leading-relaxed font-['Merriweather'] whitespace-pre-wrap">{contact.message}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
