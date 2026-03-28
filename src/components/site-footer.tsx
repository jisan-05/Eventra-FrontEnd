import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-slate-950 text-slate-400 mt-auto">
      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
        <div>
          <p className="text-white font-semibold">Planora</p>
          <p className="text-sm mt-1">Events, payments, and community in one place.</p>
        </div>
        <nav className="flex flex-wrap gap-6 text-sm">
          <Link href="/about" className="hover:text-amber-400 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-amber-400 transition-colors">
            Contact
          </Link>
          <Link href="/privacy" className="hover:text-amber-400 transition-colors">
            Privacy Policy
          </Link>
        </nav>
      </div>
      <div className="border-t border-slate-800 text-center text-xs py-4 text-slate-500">
        © {new Date().getFullYear()} Planora
      </div>
    </footer>
  );
}
