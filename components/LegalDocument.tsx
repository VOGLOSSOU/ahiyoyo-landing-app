import Navbar from "./Navbar";
import Footer from "./Footer";
import Stamp from "./Stamp";

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  description: string;
  version: string;
  pdfUrl: string;
};

export default function LegalDocument({ eyebrow, title, description, version, pdfUrl }: LegalDocumentProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-paper">
        <section className="relative overflow-hidden border-b border-ink/5">
          <div className="grain" />
          <div className="relative max-w-5xl mx-auto px-5 md:px-6 py-12 md:py-16 text-center">
            <Stamp variant="amber" dot className="mb-6">{eyebrow}</Stamp>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight mb-5">{title}</h1>
            <p className="text-slate max-w-2xl mx-auto leading-relaxed">{description}</p>
            <p className="font-mono-tag text-[10px] text-slate mt-5">{version}</p>

            <div className="flex flex-wrap justify-center gap-3 mt-7">
              <a href={pdfUrl} target="_blank" rel="noreferrer" className="btn-primary bg-amber text-[#111827] rounded-full px-5 py-3 text-sm font-semibold">
                <i className="fa-solid fa-up-right-from-square mr-2" />Ouvrir en plein écran
              </a>
              <a href={pdfUrl} download className="btn-ghost border border-ink/20 rounded-full px-5 py-3 text-sm font-semibold">
                <i className="fa-solid fa-download text-amber mr-2" />Télécharger le PDF
              </a>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-3 sm:px-5 md:px-6 py-6 md:py-10">
          <div className="waybill border border-ink/10 !rounded-xl md:!rounded-2xl p-1.5 md:p-2 overflow-hidden">
            <object data={pdfUrl} type="application/pdf" className="w-full h-[75vh] md:h-[calc(100vh-6rem)] min-h-[560px] rounded-lg bg-paperAlt" aria-label={title}>
              <div className="min-h-[560px] flex flex-col items-center justify-center text-center px-6">
                <i className="fa-solid fa-file-pdf text-amber text-4xl mb-5" />
                <h2 className="font-display font-bold text-xl mb-2">Aperçu indisponible dans ce navigateur</h2>
                <p className="text-slate text-sm max-w-md mb-6">Le document reste accessible dans son format original.</p>
                <a href={pdfUrl} target="_blank" rel="noreferrer" className="bg-amber text-[#111827] rounded-full px-6 py-3 text-sm font-semibold">Ouvrir le document</a>
              </div>
            </object>
          </div>
          <p className="text-center text-xs text-slate mt-4">Le document affiché ci-dessus est la version officielle intégrale, sans modification de son contenu.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
