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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-600/20 rounded-xl mb-4">
              <Lock size={24} className="text-teal-400" />
            </div>
            <h1 className="text-2xl font-bold text-slate-100">Admin login</h1>
            <p className="text-slate-500 text-sm mt-1">Sign in to view contact submissions</p>
          </div>

          <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-4">
            {loginError && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg px-4 py-3">
                <AlertCircle size={14} />
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-1.5">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm((f) => ({ ...f, username: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-600/50 focus:border-teal-700 transition-colors"
                placeholder="admin"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-1.5">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-600/50 focus:border-teal-700 transition-colors"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg transition-colors"
            >
              {loginMutation.isPending ? (
                <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
              ) : (
                <LogIn size={16} />
              )}
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mail size={18} className="text-teal-400" />
            <span className="font-semibold">Contact submissions</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-500 text-sm">{state.username}</span>
            <button
              onClick={() => logoutMutation.mutate()}
              className="flex items-center gap-1.5 text-slate-400 hover:text-slate-100 text-sm transition-colors"
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        {contactsQuery.isLoading && (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5 animate-pulse">
                <div className="h-4 bg-slate-700 rounded w-1/3 mb-2" />
                <div className="h-3 bg-slate-800 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {contactsQuery.error && (
          <div className="bg-red-900/20 border border-red-800 rounded-xl p-6 text-red-400 text-sm">
            Failed to load contact submissions.
          </div>
        )}

        {contactsQuery.data && contactsQuery.data.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <Mail size={40} className="mx-auto mb-4 opacity-40" />
            <p>No contact submissions yet.</p>
          </div>
        )}

        {contactsQuery.data && contactsQuery.data.length > 0 && (
          <div className="space-y-3">
            <p className="text-slate-500 text-sm mb-6">
              {contactsQuery.data.length} submission{contactsQuery.data.length !== 1 ? "s" : ""} total
            </p>
            {contactsQuery.data.map((contact) => (
              <div key={contact.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors">
                <button
                  className="w-full flex items-start justify-between p-5 text-left"
                  onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-slate-100 font-medium">{contact.name}</span>
                      <span className="text-teal-400 text-sm">{contact.email}</span>
                    </div>
                    <p className="text-slate-400 text-sm">{contact.subject}</p>
                  </div>
                  <span className="text-slate-600 text-xs font-mono ml-4 shrink-0">
                    {new Date(contact.createdAt).toLocaleDateString("en-US", {
                      year: "numeric", month: "short", day: "numeric",
                    })}
                  </span>
                </button>
                {expandedId === contact.id && (
                  <div className="border-t border-slate-800 px-5 pb-5 pt-4">
                    <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">{contact.message}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
