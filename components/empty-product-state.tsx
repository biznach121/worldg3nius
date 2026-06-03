import Link from "next/link";

export function EmptyProductState({
  label = "This rack is loading",
  detail = "No pieces are on this rail right now. The next run is being staged.",
}: {
  label?: string;
  detail?: string;
}) {
  return (
    <div className="relative isolate overflow-hidden border border-black bg-white px-5 py-10 text-black sm:px-8 sm:py-12">
      <div className="absolute inset-0 -z-10 opacity-[0.04] [background-image:linear-gradient(90deg,black_1px,transparent_1px),linear-gradient(black_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="mx-auto grid max-w-5xl gap-7 md:grid-cols-[0.86fr_1.14fr] md:items-center md:gap-8">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[210px] overflow-hidden bg-black text-white sm:max-w-[250px]">
          <div className="absolute inset-x-7 top-7 h-8 border-t border-white/35" />
          <div className="absolute left-1/2 top-12 h-10 w-10 -translate-x-1/2 rounded-full border border-white/60 bg-white/10" />
          <div className="absolute left-1/2 top-[5.8rem] h-32 w-28 -translate-x-1/2 rounded-t-[44%] border border-white/55 bg-white/10" />
          <div className="absolute left-[4.2rem] top-[8.2rem] h-24 w-7 -rotate-12 rounded-full border border-white/40 bg-white/10" />
          <div className="absolute right-[4.2rem] top-[8.2rem] h-24 w-7 rotate-12 rounded-full border border-white/40 bg-white/10" />
          <div className="absolute bottom-7 left-1/2 h-20 w-14 -translate-x-[80%] rotate-3 border border-white/40 bg-white/10" />
          <div className="absolute bottom-7 left-1/2 h-20 w-14 -translate-x-[20%] -rotate-3 border border-white/40 bg-white/10" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-[repeating-linear-gradient(135deg,transparent_0_10px,rgba(255,255,255,0.12)_10px_11px)]" />
          <p className="absolute bottom-4 left-4 m-0 max-w-28 font-display text-2xl uppercase leading-[0.82]">
            World in our eyes.
          </p>
        </div>

        <div>
          <p className="mb-3 text-[11px] font-display uppercase tracking-[0.2em] text-black/45">
            Empty rail
          </p>
          <h2 className="m-0 max-w-2xl break-words font-display text-[clamp(2.15rem,13vw,5.8rem)] uppercase leading-[0.78] sm:text-[clamp(2.4rem,7vw,5.8rem)]">
            {label}
          </h2>
          <p className="mt-5 max-w-xl text-sm uppercase leading-6 text-black/58 sm:text-base">
            {detail}
          </p>
          <Link
            href="/shop"
            className="mt-7 inline-flex h-12 w-full items-center justify-center border border-black bg-black px-5 font-display text-sm uppercase text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black sm:w-auto"
          >
            Enter the shop
          </Link>
        </div>
      </div>
    </div>
  );
}
