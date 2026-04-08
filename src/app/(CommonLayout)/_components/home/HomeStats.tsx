"use client";

const stats = [
  { label: "Events created", value: "1,200+" },
  { label: "Active organizers", value: "320+" },
  { label: "Tickets processed", value: "48K+" },
  { label: "Average rating", value: "4.8/5" },
];

export default function HomeStats() {
  return (
    <section className="bg-background py-14 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
            >
              <p className="text-2xl font-bold text-foreground md:text-3xl">
                {item.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
