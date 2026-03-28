export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-600 leading-relaxed">
        Eventra stores account and event data needed to run the service. Payment details are handled by your configured provider (Stripe or SSLCommerz).
        Do not share passwords; use a strong unique password for your account.
      </p>
    </div>
  );
}
