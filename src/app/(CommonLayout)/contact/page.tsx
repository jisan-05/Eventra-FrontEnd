import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden bg-background py-14 md:py-20">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_60%_at_50%_-30%,rgba(59,130,246,0.12),transparent_55%)]"
        aria-hidden
      />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-widest text-foreground">
            Contact
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Let&apos;s talk about your event
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Need support, partnership details, or help setting up Eventra? Send
            us a message and we&apos;ll get back to you quickly.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-1">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start gap-3">
                <span className="rounded-lg bg-muted p-2 text-foreground">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">
                    support@eventra.com
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start gap-3">
                <span className="rounded-lg bg-muted p-2 text-foreground">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-semibold text-foreground">Phone</p>
                  <p className="text-sm text-muted-foreground">+880 1712-345678</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start gap-3">
                <span className="rounded-lg bg-muted p-2 text-foreground">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-semibold text-foreground">Office</p>
                  <p className="text-sm text-muted-foreground">
                    121 Motijheel C/A, Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Full name
                  </label>
                  <Input placeholder="Your full name" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Email address
                  </label>
                  <Input type="email" placeholder="you@example.com" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  Subject
                </label>
                <Input placeholder="How can we help?" />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  Message
                </label>
                <Textarea
                  placeholder="Write your message..."
                  className="min-h-32"
                />
              </div>

              <Button type="submit" className="w-full sm:w-auto">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
