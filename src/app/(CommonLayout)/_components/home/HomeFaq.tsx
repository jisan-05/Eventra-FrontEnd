"use client";

const faqs = [
  {
    q: "Can I create both free and paid events?",
    a: "Yes. You can choose public/private and free/paid while creating your event.",
  },
  {
    q: "How do private invitations work?",
    a: "Organizers can invite specific users, and invited users can accept or decline from their dashboard.",
  },
  {
    q: "Is payment secure on Eventra?",
    a: "Payments are processed through Stripe with secure checkout flow.",
  },
  {
    q: "Can attendees leave ratings and reviews?",
    a: "Yes. After joining events, attendees can submit ratings and feedback.",
  },
];

export default function HomeFaq() {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">FAQs</h2>
          <p className="mt-3 text-muted-foreground">
            Common questions from organizers and attendees.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-4xl gap-4">
          {faqs.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <h3 className="font-semibold text-foreground">{item.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
