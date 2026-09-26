"use client";

import { useState } from "react";

interface SubscribeFormProps {
  source: string;
  dark?: boolean;
}

export function SubscribeForm({ source, dark = false }: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("err");
      setMessage("Enter a valid email address.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (res.status === 409) {
        setStatus("err");
        setMessage("This email is already subscribed.");
        return;
      }
      if (!res.ok) {
        setStatus("err");
        setMessage("Could not subscribe. Try again.");
        return;
      }
      setStatus("ok");
      setMessage("You're subscribed. The next report will land in your inbox.");
      setEmail("");
    } catch {
      setStatus("err");
      setMessage("Could not subscribe. Try again.");
    }
  }

  const inputId = `email-${source}`;

  return (
    <form className="sub-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor={inputId}>Email address</label>
      <div className="row flex flex-col gap-2.5 sm:flex-row">
        <input
          id={inputId}
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
        />
        <button type="submit" className={dark ? "btn btn-primary" : "btn btn-dark"} disabled={status === "loading"}>
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      <p
        role="status"
        aria-live="polite"
        className={
          status === "ok"
            ? dark
              ? "text-green-pill"
              : "text-green"
            : status === "err"
              ? "text-red-400"
              : "min-h-[22px]"
        }
      >
        {message}
      </p>
    </form>
  );
}
