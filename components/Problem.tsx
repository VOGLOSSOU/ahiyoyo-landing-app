import Stamp from "./Stamp";
import Waybill from "./Waybill";
import Reveal from "./Reveal";

const problems = [
  { icon: "fa-user-slash", label: "Fournisseurs peu fiables", desc: "Difficile de vérifier la qualité et le sérieux d'un fournisseur à distance." },
  { icon: "fa-clipboard-question", label: "Tarifs non clairs", desc: "Prix qui changent, frais cachés, pas de devis clair dès le départ." },
  { icon: "fa-eye-low-vision", label: "Suivi incertain", desc: "Plusieurs jours sans nouvelles de sa commande ou de son colis." },
];

export default function Problem() {
  return (
    <section id="probleme" className="py-16 md:py-28">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">

          <div className="flex-1">
            <Reveal>
              <Stamp className="mb-7">Le constat</Stamp>
              <h2 className="text-2xl md:text-3xl font-display font-semibold leading-snug">
                Acheter et faire venir sa marchandise depuis l&apos;international reste un parcours du combattant :
                fournisseurs peu fiables, tarifs opaques, suivi incertain.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={80}>
            <div className="flex-1">
              <Waybill className="p-8 md:p-10 lift">
                <div className="space-y-6">
                  {problems.map((p) => (
                    <div key={p.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-postal/10 flex items-center justify-center flex-shrink-0">
                        <i className={`fa-solid ${p.icon} text-postal`} />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold mb-1">{p.label}</h3>
                        <p className="text-slate text-sm">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Waybill>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}