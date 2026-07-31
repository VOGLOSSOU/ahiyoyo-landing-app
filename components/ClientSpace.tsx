import Stamp from "./Stamp";
import Reveal from "./Reveal";

const tools = [
  { icon: "fa-location-crosshairs", title: "Tracking", desc: "Suivez vos colis et commandes en temps réel." },
  { icon: "fa-file-invoice", title: "Tableau de bord", desc: "Pour gérer vos devis, vos factures et autres opérations." },
  { icon: "fa-credit-card", title: "Solutions de paiement", desc: "Payez facilement en monnaie locale pour vos achats et le transport de vos marchandises." },
  { icon: "fa-bell", title: "Alertes", desc: "Des notifications automatiques pour vous tenir informés de chaque étape" },
];

export default function ClientSpace({ dark = false }: { dark?: boolean }) {
  return (
    <section id="espace-client" className={`py-16 md:py-24 relative overflow-hidden ${dark ? "bg-navy text-white" : "bg-paper"}`}>
      {dark && <div className="grain" />}
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-[.82fr_1.18fr] gap-12 lg:gap-20 items-center">
          <Reveal>
            <div>
              <Stamp variant={dark ? "ghost" : "amber"} className="mb-6">Votre espace Ahiyoyo</Stamp>
              <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight mb-5">Une vue claire sur ce qui compte maintenant.</h2>
              <p className={`leading-relaxed mb-8 ${dark ? "text-white/60" : "text-slate"}`}>L’application Ahiyoyo rassemble les opérations, documents et mises à jour qui concernent votre activité — sans vous obliger à chercher l’information dans plusieurs conversations.</p>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">{tools.map((tool) => <div key={tool.title} className={`flex items-center gap-3 rounded-xl border p-3.5 ${dark ? "border-white/10 bg-white/5" : "border-ink/8 bg-paperAlt"}`}><span className="w-9 h-9 rounded-lg bg-amber/12 text-amber flex items-center justify-center flex-shrink-0"><i className={`fa-solid ${tool.icon} text-sm`} /></span><div><p className="font-display font-semibold text-sm">{tool.title}</p><p className={`text-[10px] mt-0.5 ${dark ? "text-white/50" : "text-slate"}`}>{tool.desc}</p></div></div>)}</div>
              <a href="https://app.ahiyoyo.com" className="inline-flex items-center gap-2 text-sm font-semibold text-amber hover:underline">Accéder à mon compte <i className="fa-solid fa-arrow-up-right-from-square text-xs" /></a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className={`rounded-[1.75rem] p-3 sm:p-5 shadow-2xl shadow-black/25 ${dark ? "bg-[#090b10] border border-white/10" : "bg-navy"}`}>
              <div className="rounded-2xl bg-paperAlt border border-white/10 overflow-hidden">
                <div className="h-12 px-4 flex items-center justify-between border-b border-ink/8"><div className="flex gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-postal/60" /><span className="w-2.5 h-2.5 rounded-full bg-amber" /><span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" /></div><span className="font-mono-tag text-[8px] text-slate">APP.AHIYOYO.COM</span></div>
                <div className="p-5 sm:p-7">
                  <div className="flex items-start justify-between gap-4 mb-6"><div><p className="text-xs text-slate">Bonjour,</p><h3 className="font-display font-bold text-xl mt-1">Votre activité en un coup d’œil</h3></div><span className="w-10 h-10 rounded-full bg-amber text-[#111827] flex items-center justify-center"><i className="fa-solid fa-user text-sm" /></span></div>
                  <div className="grid grid-cols-3 gap-2.5 mb-5"><DashboardMetric value="03" label="En cours" /><DashboardMetric value="01" label="À payer" highlight /><DashboardMetric value="08" label="Terminées" /></div>
                  <div className="rounded-xl border border-ink/8 p-4">
                    <div className="flex items-center justify-between mb-4"><div><p className="font-mono-tag text-[8px] text-slate">DERNIÈRE EXPÉDITION</p><p className="font-display font-semibold text-sm mt-1">TRACK-2607-23B8</p></div><span className="rounded-full bg-amber/15 text-amber px-2.5 py-1 text-[9px] font-semibold">En cours</span></div>
                    <div className="h-1.5 rounded-full bg-ink/8 overflow-hidden"><div className="w-3/5 h-full rounded-full bg-amber" /></div>
                    <div className="flex justify-between text-[9px] text-slate mt-2"><span>Reçu au cargo</span><span>Cotonou</span></div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DashboardMetric({ value, label, highlight = false }: { value: string; label: string; highlight?: boolean }) {
  return <div className={`rounded-xl p-3 sm:p-4 ${highlight ? "bg-amber text-[#111827]" : "bg-paper border border-ink/8"}`}><p className="font-display font-bold text-xl">{value}</p><p className={`text-[9px] mt-1 ${highlight ? "text-[#111827]/60" : "text-slate"}`}>{label}</p></div>;
}
