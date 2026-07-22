import Link from "next/link";

export default function LockedContent({
  title,
  productUrl,
}: {
  title: string;
  productUrl: string;
}) {
  return (
    <div className="mt-8 border border-gold/20 rounded-lg bg-navy-light p-10 text-center">
      <div className="text-gold/40 mb-4">
        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h3 className="text-white font-heading font-semibold text-lg">
        Unlock {title}
      </h3>
      <p className="mt-2 text-gray-400 text-sm max-w-md mx-auto">
        This content requires an active subscription. Purchase access to view
        all materials.
      </p>
      <Link
        href={productUrl}
        className="mt-6 inline-block rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-navy tracking-wide uppercase hover:bg-gold-light transition-colors"
      >
        Get Access
      </Link>
    </div>
  );
}
