"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Placeholder submit. Hook this to an API route if needed.
      await new Promise((r) => setTimeout(r, 800));
      setSubmitted(true);
      setEmail("");
      setMessage("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>Send us a message</CardTitle>
        <CardDescription>
          We usually respond within 1–2 business days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="How can we help?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[140px]"
              required
            />
          </div>
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Sending..." : "Send message"}
            </Button>
            {submitted && (
              <span className="text-sm text-muted-foreground">
                Thanks! We'll get back to you soon.
              </span>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
