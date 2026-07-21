import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Ahiyoyo",
  description: "Retrouvez les réponses à vos questions sur les services, tarifs, paiements, expéditions et le suivi Ahiyoyo.",
};

const categories = [
  { id: "presentation", label: "Présentation" },
  { id: "transport", label: "Transport" },
  { id: "tarifs-paiements", label: "Tarifs & Paiements" },
  { id: "suivi-securite", label: "Suivi & Sécurité" },
  { id: "douane", label: "Douane" },
  { id: "export", label: "Export" },
  { id: "compte", label: "Compte & Assistance" },
  { id: "frequentes", label: "Questions fréquentes" },
];

const faqData: Record<string, Array<{ q: string; a: string | React.ReactNode }>> = {
  presentation: [
    {
      q: "Qu'est-ce que Ahiyoyo ?",
      a: "Ahiyoyo est une plateforme digitale spécialisée dans la logistique et le commerce international, conçue pour aider les particuliers, entrepreneurs et entreprises africaines à importer, exporter et vendre à l'international de manière simple, sécurisée et professionnelle. Ahiyoyo combine solutions logistiques, accompagnement opérationnel, appui commercial et digital pour fluidifier les échanges entre l'Afrique et le reste du monde."
    },
    {
      q: "À qui s'adresse Ahiyoyo ?",
      a: (
        <>
          <p className="mb-3">Ahiyoyo s&apos;adresse notamment à :</p>
          <ul className="space-y-1.5 mb-3">
            <li className="flex items-start gap-2"><i className="fa-solid fa-circle text-amber text-[8px] mt-1.5 flex-shrink-0" />Entrepreneurs et e-commerçants</li>
            <li className="flex items-start gap-2"><i className="fa-solid fa-circle text-amber text-[8px] mt-1.5 flex-shrink-0" />PME, commerçants et grossistes</li>
            <li className="flex items-start gap-2"><i className="fa-solid fa-circle text-amber text-[8px] mt-1.5 flex-shrink-0" />Artisans et producteurs locaux</li>
            <li className="flex items-start gap-2"><i className="fa-solid fa-circle text-amber text-[8px] mt-1.5 flex-shrink-0" />Exportateurs agroalimentaires ou industriels</li>
            <li className="flex items-start gap-2"><i className="fa-solid fa-circle text-amber text-[8px] mt-1.5 flex-shrink-0" />Importateurs débutants ou expérimentés</li>
          </ul>
          <p>Nos services s&apos;adaptent aux opérations ponctuelles comme aux flux commerciaux récurrents.</p>
        </>
      )
    },
    {
      q: "Dans quelles zones Ahiyoyo opère-t-il ?",
      a: "Ahiyoyo opère principalement en Afrique de l'Ouest et connecte la région avec la Chine, l'Europe et d'autres pays africains. Les corridors sont étendus progressivement selon les besoins clients."
    }
  ],
  transport: [
    {
      q: "Quels types de transport propose Ahiyoyo ?",
      a: (
        <>
          <p className="mb-3">Ahiyoyo propose une offre logistique multimodale :</p>
          <ul className="space-y-2 mb-3">
            <li>🚢 <strong className="text-ink">Maritime</strong> — volumes moyens à importants (groupage ou conteneur), optimisation des coûts.</li>
            <li>✈️ <strong className="text-ink">Aérien</strong> — expéditions urgentes, sensibles ou à faible volume.</li>
            <li>🚚 <strong className="text-ink">Terrestre</strong> — acheminement régional, cross-border, trajets ports–entrepôts–clients.</li>
          </ul>
          <p>Ces solutions peuvent être combinées pour une logistique intégrée.</p>
        </>
      )
    },
    {
      q: "Puis-je expédier de petites quantités ?",
      a: "Oui. Grâce au groupage (consolidation), Ahiyoyo permet d'expédier même de petites quantités à des tarifs accessibles."
    },
    {
      q: "Quels types de marchandises sont acceptés ?",
      a: (
        <>
          <p className="mb-3">Ahiyoyo prend en charge la majorité des marchandises commerciales légales, notamment :</p>
          <ul className="space-y-1.5 mb-3">
            <li className="flex items-start gap-2"><i className="fa-solid fa-circle text-amber text-[8px] mt-1.5 flex-shrink-0" />Textiles et habillement</li>
            <li className="flex items-start gap-2"><i className="fa-solid fa-circle text-amber text-[8px] mt-1.5 flex-shrink-0" />Électronique et accessoires</li>
            <li className="flex items-start gap-2"><i className="fa-solid fa-circle text-amber text-[8px] mt-1.5 flex-shrink-0" />Articles ménagers et biens de consommation</li>
            <li className="flex items-start gap-2"><i className="fa-solid fa-circle text-amber text-[8px] mt-1.5 flex-shrink-0" />Produits industriels et équipements</li>
            <li className="flex items-start gap-2"><i className="fa-solid fa-circle text-amber text-[8px] mt-1.5 flex-shrink-0" />Produits agroalimentaires secs (selon réglementation)</li>
          </ul>
          <p className="text-postal">⚠️ Certains produits peuvent être soumis à restrictions ou autorisations spécifiques.</p>
        </>
      )
    },
    {
      q: "Les articles personnels sont-ils acceptés ?",
      a: "Non. Ahiyoyo est orienté exclusivement vers les marchandises commerciales, afin de garantir la conformité et la fluidité des opérations."
    }
  ],
  "tarifs-paiements": [
    {
      q: "Comment sont calculés les tarifs ?",
      a: (
        <>
          <p className="mb-3">Les tarifs sont déterminés en fonction :</p>
          <ul className="space-y-1.5 mb-3">
            <li className="flex items-start gap-2"><i className="fa-solid fa-circle text-amber text-[8px] mt-1.5 flex-shrink-0" />du volume (CBM) ou du poids</li>
            <li className="flex items-start gap-2"><i className="fa-solid fa-circle text-amber text-[8px] mt-1.5 flex-shrink-0" />du mode de transport (mer, air, terre)</li>
            <li className="flex items-start gap-2"><i className="fa-solid fa-circle text-amber text-[8px] mt-1.5 flex-shrink-0" />de l&apos;origine et de la destination</li>
            <li className="flex items-start gap-2"><i className="fa-solid fa-circle text-amber text-[8px] mt-1.5 flex-shrink-0" />des services inclus (douane, livraison, stockage, accompagnement)</li>
          </ul>
          <p>Chaque devis est clair, détaillé et validé avant expédition.</p>
        </>
      )
    },
    { q: "Y a-t-il des frais cachés ?", a: "Non. Ahiyoyo applique une tarification transparente. Tous les coûts sont communiqués à l'avance." },
    {
      q: "Quels moyens de paiement sont acceptés ?",
      a: (
        <>
          <p className="mb-2">Ahiyoyo accepte :</p>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-2"><i className="fa-solid fa-circle text-amber text-[8px] mt-1.5 flex-shrink-0" />Paiements mobiles (selon le pays)</li>
            <li className="flex items-start gap-2"><i className="fa-solid fa-circle text-amber text-[8px] mt-1.5 flex-shrink-0" />Virements bancaires</li>
            <li className="flex items-start gap-2"><i className="fa-solid fa-circle text-amber text-[8px] mt-1.5 flex-shrink-0" />Autres moyens de paiement locaux sécurisés</li>
          </ul>
        </>
      )
    }
  ],
  "suivi-securite": [
    { q: "Puis-je suivre mon expédition ?", a: "Oui. Chaque expédition bénéficie d'un suivi en temps réel, accessible via votre espace client." },
    { q: "Mes marchandises sont-elles sécurisées ?", a: "Oui. Les marchandises sont identifiées et étiquetées, contrôlées et suivies à chaque étape du processus logistique." },
    { q: "Que se passe-t-il en cas de retard ?", a: "En cas de retard exceptionnel, Ahiyoyo informe le client, explique la situation et accompagne jusqu'à la résolution." }
  ],
  douane: [
    { q: "Ahiyoyo s'occupe-t-il du dédouanement ?", a: "Oui. Ahiyoyo accompagne ses clients sur les formalités douanières, la conformité documentaire et la coordination avec les acteurs locaux." },
    {
      q: "Quels documents dois-je fournir ?",
      a: (
        <>
          <p className="mb-3">Selon la marchandise, il peut être demandé :</p>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-2"><i className="fa-solid fa-circle text-amber text-[8px] mt-1.5 flex-shrink-0" />Une facture commerciale</li>
            <li className="flex items-start gap-2"><i className="fa-solid fa-circle text-amber text-[8px] mt-1.5 flex-shrink-0" />Une description précise des produits</li>
            <li className="flex items-start gap-2"><i className="fa-solid fa-circle text-amber text-[8px] mt-1.5 flex-shrink-0" />Des photos claires hors carton</li>
            <li className="flex items-start gap-2"><i className="fa-solid fa-circle text-amber text-[8px] mt-1.5 flex-shrink-0" />D&apos;autres documents réglementaires spécifiques</li>
          </ul>
        </>
      )
    }
  ],
  export: [
    {
      q: "Comment Ahiyoyo accompagne-t-il les exportateurs ?",
      a: (
        <>
          <p className="mb-3">Ahiyoyo propose un accompagnement export global :</p>
          <ul className="space-y-2">
            <li>🌍 <strong className="text-ink">Marketplaces internationales</strong> — structuration des offres et logistique e-commerce.</li>
            <li>📦 <strong className="text-ink">Expéditions B2C et B2B</strong> — vers clients finaux ou acheteurs pro.</li>
            <li>🤝 <strong className="text-ink">Représentation B2B</strong> — prospection, mise en relation acheteurs.</li>
            <li>📑 <strong className="text-ink">Contrats B2B</strong> — volumes, délais, conditions logistiques.</li>
          </ul>
        </>
      )
    },
    { q: "Ahiyoyo se limite-t-il uniquement à la logistique ?", a: "Non. Ahiyoyo agit comme un facilitateur de commerce international, combinant logistique, accompagnement commercial et structuration export." }
  ],
  compte: [
    { q: "Dois-je créer un compte pour expédier ?", a: "Oui. Le compte Ahiyoyo permet le suivi des expéditions, l'historique des opérations et un accompagnement personnalisé." },
    { q: "Comment contacter le support Ahiyoyo ?", a: "Le support Ahiyoyo est accessible via WhatsApp, email et le site web Ahiyoyo." },
    { q: "Le support est-il réactif ?", a: "Oui. Ahiyoyo propose un support humain, professionnel et orienté solutions." }
  ],
  frequentes: [
    { q: "Puis-je importer et exporter en même temps ?", a: "Oui. Ahiyoyo gère les opérations d'import et d'export, en B2C comme en B2B." },
    { q: "Ahiyoyo est-il adapté aux débutants ?", a: "Oui. Ahiyoyo est conçu pour être accessible, guidé et structuré, même sans expérience préalable." },
    {
      q: "Pourquoi choisir Ahiyoyo ?",
      a: (
        <ul className="space-y-2">
          <li>✔ Solutions multimodales (mer, air, terre)</li>
          <li>✔ Import & export B2C / B2B</li>
          <li>✔ Suivi en temps réel</li>
          <li>✔ Accompagnement logistique, commercial et digital</li>
          <li>✔ Expertise Afrique – international</li>
        </ul>
      )
    }
  ]
};

export default function FAQ() {
  return (
    <>
      <Navbar />
      <section className="pt-16 overflow-hidden relative">
        <div className="grain" />
        <div className="max-w-4xl mx-auto px-5 md:px-6 py-14 md:py-20 text-center relative">
          <span className="stamp stamp-amber mb-6">
            <span className="stamp-dot" />
            Import • Export • Logistique • Commerce international
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] mb-5">FAQ — Ahiyoyo</h1>
          <p className="text-slate text-base md:text-lg max-w-xl mx-auto">
            Toutes les réponses à vos questions sur nos services, nos tarifs, le suivi et la sécurité de vos expéditions.
          </p>
        </div>
      </section>

      <section className="pb-8 md:pb-10 bg-paper">
        <div className="max-w-4xl mx-auto px-5 md:px-6">
          <div className="flex items-center justify-center gap-2.5 flex-wrap">
            {categories.map((cat) => (
              <a key={cat.id} href={`#${cat.id}`} className="chip font-mono-tag text-[11px] font-semibold uppercase border border-ink/15 rounded-full px-4 py-2">
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {categories.map((cat, idx) => (
        <section key={cat.id} id={cat.id} className={`py-10 md:py-14 ${idx % 2 === 0 ? "" : "bg-paperAlt"} scroll-mt-20`}>
          <div className="max-w-3xl mx-auto px-5 md:px-6">
            <div className="mb-8">
              <span className="stamp stamp-amber mb-4">{idx + 1} — {cat.label}</span>
            </div>

            <div className="waybill divide-y divide-ink/5">
              {faqData[cat.id].map((item, i) => (
                <details key={i} className="faq-item group" style={{ "--i": i } as React.CSSProperties}>
                  <summary className="flex items-center justify-between gap-4 p-6 md:p-7">
                    <span className="font-display font-semibold text-base md:text-lg">{item.q}</span>
                    <i className="fa-solid fa-chevron-down chevron text-amber flex-shrink-0" />
                  </summary>
                  <div className="faq-answer">
                    <div className="faq-answer-inner px-6 md:px-7">
                      <div className={`text-slate text-sm md:text-base leading-relaxed pb-6 md:pb-7 ${typeof item.a === "string" ? "" : ""}`}>
                        {item.a}
                      </div>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 md:py-24 bg-navy text-white relative overflow-hidden">
        <div className="grain" />
        <div className="max-w-3xl mx-auto px-5 md:px-6 text-center relative">
          <span className="stamp stamp-ghost mb-7">Besoin d&apos;aide ?</span>
          <h2 className="text-2xl md:text-4xl font-display font-bold mb-5">Notre équipe répond rapidement et vous guide étape par étape.</h2>
          <div className="flex items-center justify-center gap-4 flex-wrap mt-9">
            <a href="mailto:support@ahiyoyo.com" className="btn-primary bg-amber text-ink font-semibold px-8 py-4 rounded-full text-sm md:text-base">
              Nous contacter
            </a>
            <Link href="/#suivi" className="btn-ghost border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 text-sm md:text-base">
              Suivre un colis
            </Link>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 md:gap-12 text-sm text-white/60 flex-wrap font-mono-tag text-xs">
            <div><i className="fa-solid fa-phone text-amber mr-2" />+229 01 91 08 41 41</div>
            <div><i className="fa-solid fa-envelope text-amber mr-2" />support@ahiyoyo.com</div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
