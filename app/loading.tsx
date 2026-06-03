export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="grid min-h-[100svh] place-items-center bg-black px-5 text-white">
        <div className="w-full max-w-5xl text-center">
          <div className="mx-auto mb-8 h-3 w-40 wg-skeleton bg-white/20" />
          <div className="mx-auto h-20 w-full max-w-3xl wg-skeleton bg-white/16 sm:h-32" />
          <div className="mx-auto mt-4 h-20 w-[82%] max-w-2xl wg-skeleton bg-white/16 sm:h-32" />
          <div className="mx-auto mt-10 h-11 w-36 wg-skeleton bg-white/24" />
        </div>
      </section>
      <section className="px-5 py-14 sm:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <div className="aspect-[3/4] wg-skeleton" />
              <div className="h-3 w-2/3 wg-skeleton" />
              <div className="h-3 w-1/3 wg-skeleton" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
