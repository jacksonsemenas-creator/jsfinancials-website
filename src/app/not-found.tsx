import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-navy min-h-[80vh] flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-gold font-mono text-7xl font-bold mb-4">404</div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-300 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 border border-white/20 text-white hover:border-gold hover:text-gold rounded-lg transition-colors"
          >
            View Products
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-white/20 text-white hover:border-gold hover:text-gold rounded-lg transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
