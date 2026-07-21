import Navbar from "./Navbar";
import Footer from "./Footer";
import Stamp from "./Stamp";

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  version: string;
  pdfUrl: string;
  content: string;
  documentType: "cgu" | "privacy";
};

type LegalBlock = { title: string; id: string; paragraphs: string[] };

function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function isHeading(line: string, type: LegalDocumentProps["documentType"]) {
  if (type === "cgu") {
    return line === "PRÉAMBULE" || line === "CONTACT" || /^(?:[IVX]+\.|ANNEXE \d+ -)/.test(line) || /^Article \d+ -/.test(line);
  }
  return line === "À RETENIR" || line === "Cadre de référence" || /^\d+\.\s/.test(line);
}

function parseContent(content: string, type: LegalDocumentProps["documentType"]): LegalBlock[] {
  const blocks: LegalBlock[] = [];
  let title = "";
  let body: string[] = [];

  const flush = () => {
    if (!title) return;
    const paragraphs = body.join("\n").split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);
    blocks.push({ title, id: slugify(title), paragraphs });
  };

  const lines = content.split("\n");
  for (let index = 0; index < lines.length; index += 1) {
    const rawLine = lines[index];
    const line = rawLine.trim();
    if (isHeading(line, type)) {
      flush();
      const continuation = type === "cgu" && line.startsWith("ANNEXE") && /^[A-ZÀ-ÖØ-Ý\s]+$/.test(lines[index + 1]?.trim() || "")
        ? lines[++index].trim()
        : "";
      title = continuation ? `${line} ${continuation}` : line;
      body = [];
    } else {
      body.push(rawLine);
    }
  }
  flush();
  return blocks;
}

function Paragraph({ text }: { text: string }) {
  const bulletParts = text.split(/(?=^•\s)/m).map((part) => part.trim()).filter(Boolean);
  if (bulletParts.length > 1 || text.trim().startsWith("•")) {
    return (
      <ul className="space-y-2.5 my-5">
        {bulletParts.map((part, index) => <li key={index} className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-amber mt-2.5 flex-shrink-0" /><span>{part.replace(/^•\s*/, "").replace(/\n/g, " ")}</span></li>)}
      </ul>
    );
  }
  return <p className="whitespace-pre-line">{text}</p>;
}

function LegalSection({ block }: { block: LegalBlock }) {
  const article = /^Article \d+ -/.test(block.title);
  return (
    <section id={block.id} className={`scroll-mt-24 ${article ? "py-6 border-b border-ink/8 last:border-0" : "pt-10 first:pt-0"}`}>
      {article
        ? <h3 className="font-display text-lg md:text-xl font-bold mb-4 text-ink">{block.title}</h3>
        : <h2 className="font-display text-xl md:text-2xl font-bold mb-6 flex items-start gap-3"><span className="w-1.5 self-stretch rounded-full bg-amber flex-shrink-0" />{block.title}</h2>}
      <div className="legal-copy text-slate text-[15px] md:text-base leading-[1.85] space-y-4">
        {block.paragraphs.map((paragraph, index) => <Paragraph key={index} text={paragraph} />)}
      </div>
    </section>
  );
}

export default function LegalDocument({ eyebrow, title, subtitle, description, version, pdfUrl, content, documentType }: LegalDocumentProps) {
  const blocks = parseContent(content, documentType);
  const toc = blocks.filter((block) => documentType === "privacy" || !/^Article \d+ -/.test(block.title));

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-paper">
        <section className="relative overflow-hidden border-b border-ink/5">
          <div className="grain" />
          <div className="relative max-w-5xl mx-auto px-5 md:px-6 py-14 md:py-20 text-center">
            <Stamp variant="amber" dot className="mb-6">{eyebrow}</Stamp>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight mb-4">{title}</h1>
            <p className="font-display font-semibold text-amber mb-5">{subtitle}</p>
            <p className="text-slate max-w-2xl mx-auto leading-relaxed">{description}</p>
            <p className="font-mono-tag text-[10px] text-slate mt-5">{version}</p>
            <a href={pdfUrl} download className="btn-primary inline-flex items-center bg-amber text-[#111827] rounded-full px-5 py-3 text-sm font-semibold mt-7"><i className="fa-solid fa-download mr-2" />Télécharger la version PDF</a>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-5 md:px-6 py-10 md:py-16">
          <div className="grid lg:grid-cols-[280px_minmax(0,1fr)] gap-8 lg:gap-12 items-start">
            <aside className="lg:sticky lg:top-24 waybill border border-ink/8 !shadow-[0_14px_40px_-32px_rgba(0,0,0,.5)] p-5 max-h-[calc(100vh-7rem)] overflow-auto">
              <p className="font-mono-tag text-[10px] text-slate mb-4">SOMMAIRE</p>
              <nav aria-label={`Sommaire — ${title}`}>
                <ol className="space-y-1.5">
                  {toc.map((block) => <li key={block.id}><a href={`#${block.id}`} className="block rounded-lg px-3 py-2 text-xs text-slate hover:text-ink hover:bg-amber/10 transition">{block.title}</a></li>)}
                </ol>
              </nav>
            </aside>

            <article className="waybill border border-ink/8 !shadow-[0_18px_60px_-38px_rgba(0,0,0,.55)] p-5 sm:p-7 md:p-10 lg:p-12 min-w-0">
              <header className="pb-8 mb-2 border-b border-ink/10">
                <p className="font-mono-tag text-[10px] text-amber mb-3">NEW MARKETS TECHNOLOGIES SAS — ENSEIGNE AHIYOYO</p>
                <p className="text-sm text-slate leading-relaxed">Capital social : 2 000 000 FCFA<br />RCCM : RB/COT/25 B 40607 — IFU : 3202585063521<br />Siège : Ilot 1146, Quartier Houéhoun, Parcelle C, Maison ABUDU RAFIOU YESSOUFOU, Cotonou, Bénin<br />Téléphone : +229 01 91 08 41 41 — Email : support@ahiyoyo.com</p>
              </header>
              {blocks.map((block) => <LegalSection key={block.id} block={block} />)}
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
