"use client";

import { ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-midnight">Contact Us</h1>
      <p className="mt-2 max-w-xl text-text-muted">
        Reach out for research inquiries, partnerships, or press requests.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <form
          className="space-y-4 border border-border bg-surface p-8 shadow-card"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input className="mt-1" required placeholder="Your name" />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input className="mt-1" type="email" required placeholder="Thesispointresearch.com" />
          </div>
          <div>
            <label className="text-sm font-medium">Subject</label>
            <select className="mt-1 flex h-10 w-full border border-border px-3 text-sm">
              <option>Research Inquiry</option>
              <option>Partnership</option>
              <option>Press</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea
              className="mt-1 flex min-h-[120px] w-full border border-border px-3 py-2 text-sm"
              required
              placeholder="How can we help?"
            />
          </div>
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>

        <div className="space-y-6">
          <div className="border border-border bg-surface p-6">
            <Mail className="h-6 w-6 text-midnight" />
            <h3 className="mt-3 font-semibold text-midnight">Email</h3>
            <a
              href="mailto:research@thesispoint.com"
              className="text-midnight hover:underline"
            >
              research@thesispoint.com
            </a>
          </div>
          <div className="border border-border bg-surface p-6">
            <ExternalLink className="h-6 w-6 text-midnight" />
            <h3 className="mt-3 font-semibold text-midnight">LinkedIn</h3>
            <a
              href="https://www.linkedin.com/in/thesispointresearch/"
              className="text-midnight hover:underline"
            >
              ThesisPoint Research on LinkedIn
            </a>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe
              src="https://cal.com/thesispointresearch/30min?theme=light&brandColor=0f172a?embed_domain=thesispoint.com&embed_type=Inline"
              width="100%"
              height="700"
              frameBorder="0"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
