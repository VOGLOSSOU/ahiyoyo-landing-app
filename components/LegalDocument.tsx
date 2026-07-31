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
    return line === "NOTE DE LECTURE"
      || line === "PRÉAMBULE"
      || line === "RÈGLES ESSENTIELLES À RETENIR"
      || line === "CONTACT"
      || /^(?:[IVX]+\.|ANNEXE \d+\s[-–—])/.test(line)
      || /^Article \d+\s[-–—]/.test(line);
  }
  return line === "À RETENIR" || line === "Cadre de référence" || /^\d+\.\s/.test(line);
}

function paragraphsFromLines(lines: string[]) {
  const paragraphs: string[] = [];
  let prose = "";
  let list: string[] = [];
  let listType: "bullet" | "ordered" | null = null;

  const flushProse = () => {
    if (prose.trim()) paragraphs.push(prose.trim());
    prose = "";
  };
  const flushList = () => {
    if (list.length) paragraphs.push(list.join("\n"));
    list = [];
    listType = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim().replace(/^●\s*/, "• ");
    const bullet = /^•\s*/.test(line);
    const ordered = /^\d+\.\s*/.test(line);

    if (!line) {
      flushProse();
      flushList();
    } else if (bullet || ordered) {
      flushProse();
      const nextType = bullet ? "bullet" : "ordered";
      if (listType && listType !== nextType) flushList();
      listType = nextType;
      list.push(line);
    } else if (list.length && /^\s/.test(rawLine)) {
      list[list.length - 1] += ` ${line}`;
    } else {
      flushList();
      prose += `${prose ? " " : ""}${line}`;
    }
  }

  flushProse();
  flushList();
  return paragraphs;
}

function parseContent(content: string, type: LegalDocumentProps["documentType"]): LegalBlock[] {
  const blocks: LegalBlock[] = [];
  let title = "";
  let body: string[] = [];

  const flush = () => {
    if (!title) return;
    const paragraphs = paragraphsFromLines(body);
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
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  if (lines.length && lines.every((line) => line.startsWith("•"))) {
    return (
      <ul className="space-y-2.5 my-5">
        {lines.map((line, index) => <li key={index} className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-amber mt-2.5 flex-shrink-0" /><span>{line.replace(/^•\s*/, "")}</span></li>)}
      </ul>
    );
  }
  if (lines.length && lines.every((line) => /^\d+\.\s*/.test(line))) {
    const start = Number.parseInt(lines[0], 10) || 1;
    return <ol start={start} className="list-decimal space-y-2.5 my-5 pl-6 marker:text-amber marker:font-semibold">{lines.map((line, index) => <li key={index} className="pl-1">{line.replace(/^\d+\.\s*/, "")}</li>)}</ol>;
  }
  return <p className="whitespace-pre-line">{text}</p>;
}

function LegalSection({ block }: { block: LegalBlock }) {
  const article = /^Article \d+\s[-–—]/.test(block.title);
  const essential = block.title === "RÈGLES ESSENTIELLES À RETENIR";
  return (
    <section id={block.id} className={`scroll-mt-24 ${article ? "py-6 border-b border-ink/8 last:border-0" : "pt-10 first:pt-0"} ${essential ? "rounded-2xl bg-amber/10 border border-amber/25 p-5 sm:p-7 mt-8" : ""}`}>
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
  const toc = blocks.filter((block) => documentType === "privacy" || !/^Article \d+\s[-–—]/.test(block.title));

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
              {documentType === "privacy" && (
                <header className="pb-8 mb-2 border-b border-ink/10">
                  <p className="font-mono-tag text-[10px] text-amber mb-3">NEW MARKETS TECHNOLOGIES SAS — ENSEIGNE AHIYOYO</p>
                  <p className="text-sm text-slate leading-relaxed">Capital social : 2 000 000 FCFA<br />RCCM : RB/COT/25 B 40607 — IFU : 3202585063521<br />Siège : Ilot 1146, Quartier Houéhoun, Parcelle C, Maison ABUDU RAFIOU YESSOUFOU, Cotonou, Bénin<br />Téléphone : +229 01 91 08 41 41 — Email : support@ahiyoyo.com</p>
                </header>
              )}
              {blocks.map((block) => <LegalSection key={block.id} block={block} />)}
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
