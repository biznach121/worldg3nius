import type { Metadata } from "next";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Size Guide",
  description: "Chest, length, and shoulder measurements for every WORLD G3NIUS piece.",
};

interface SizeRow {
  size: string;
  chest: string;
  length: string;
  shoulder: string;
}

const TOPS_CHART: SizeRow[] = [
  { size: "XS", chest: "104 cm / 41 in", length: "68 cm / 26.8 in", shoulder: "50 cm / 19.7 in" },
  { size: "S", chest: "110 cm / 43.3 in", length: "70 cm / 27.5 in", shoulder: "52 cm / 20.5 in" },
  { size: "M", chest: "116 cm / 45.7 in", length: "72 cm / 28.3 in", shoulder: "54 cm / 21.3 in" },
  { size: "L", chest: "122 cm / 48 in", length: "74 cm / 29.1 in", shoulder: "56 cm / 22 in" },
  { size: "XL", chest: "128 cm / 50.4 in", length: "76 cm / 29.9 in", shoulder: "58 cm / 22.8 in" },
  { size: "2XL", chest: "134 cm / 52.7 in", length: "78 cm / 30.7 in", shoulder: "60 cm / 23.6 in" },
  { size: "3XL", chest: "140 cm / 55.1 in", length: "80 cm / 31.5 in", shoulder: "62 cm / 24.4 in" },
];

const BOTTOMS_CHART: { size: string; waist: string; hip: string; inseam: string }[] = [
  { size: "XS", waist: "72 cm / 28 in", hip: "92 cm / 36 in", inseam: "78 cm / 30.7 in" },
  { size: "S", waist: "76 cm / 30 in", hip: "96 cm / 38 in", inseam: "78 cm / 30.7 in" },
  { size: "M", waist: "82 cm / 32 in", hip: "102 cm / 40 in", inseam: "80 cm / 31.5 in" },
  { size: "L", waist: "88 cm / 35 in", hip: "108 cm / 42.5 in", inseam: "80 cm / 31.5 in" },
  { size: "XL", waist: "94 cm / 37 in", hip: "114 cm / 45 in", inseam: "82 cm / 32.3 in" },
  { size: "2XL", waist: "102 cm / 40 in", hip: "122 cm / 48 in", inseam: "82 cm / 32.3 in" },
];

export default function SizeGuidePage() {
  return (
    <article className="max-w-4xl mx-auto px-6 sm:px-8 py-16">
      <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary mb-2">
        Size guide
      </p>
      <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] uppercase mb-4 leading-[0.95]">
        Find your fit.
      </h1>
      <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mb-12">
        Our pieces are cut for an oversized, dropped-shoulder fit. Order true to size for
        the intended fit; size down for a regular cut. All measurements are flat-laid
        garment measurements.
      </p>

      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-2">Tops & outerwear</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Hoodies, tees, sweats, jackets. Chest measured pit-to-pit, doubled. Length
          measured from highest shoulder seam to hem.
        </p>
        <SizeTable
          headings={["Size", "Chest", "Length", "Shoulder"]}
          rows={TOPS_CHART.map((r) => [r.size, r.chest, r.length, r.shoulder])}
        />
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-2">Bottoms</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Trousers, shorts, sweats. Waist measured flat across the top of the
          waistband, doubled.
        </p>
        <SizeTable
          headings={["Size", "Waist", "Hip", "Inseam"]}
          rows={BOTTOMS_CHART.map((r) => [r.size, r.waist, r.hip, r.inseam])}
        />
      </section>

      <section className="rounded-2xl bg-foreground text-background p-8">
        <h2 className="text-xl font-bold mb-3">How to measure yourself</h2>
        <ul className="space-y-3 text-background/85 leading-relaxed">
          <li>
            <strong className="text-background">Chest</strong> — Wrap a soft tape around
            the fullest part of your chest, under the arms, keeping the tape level.
          </li>
          <li>
            <strong className="text-background">Waist</strong> — Around the narrowest part
            of your waist, just above the navel.
          </li>
          <li>
            <strong className="text-background">Hip</strong> — Around the fullest part of
            your hips, feet together.
          </li>
          <li>
            <strong className="text-background">Inseam</strong> — From the very top of the
            inside of your leg down to the floor (no shoes).
          </li>
        </ul>
      </section>

      <p className="mt-12 text-sm text-muted-foreground">
        Still unsure?{" "}
        <a
          href={`mailto:${brand.faq.contactEmail}`}
          className="text-primary font-semibold hover:underline"
        >
          Email us your usual size in another brand
        </a>{" "}
        and we'll recommend a fit.
      </p>
    </article>
  );
}

function SizeTable({
  headings,
  rows,
}: {
  headings: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            {headings.map((h) => (
              <th
                key={h}
                className="text-left font-semibold uppercase tracking-wider text-[11px] text-muted-foreground px-4 py-3"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r[0]}
              className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}
            >
              {r.map((cell, j) => (
                <td
                  key={j}
                  className={[
                    "px-4 py-3 tabular-nums",
                    j === 0 ? "font-semibold text-foreground" : "text-foreground/80",
                  ].join(" ")}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
