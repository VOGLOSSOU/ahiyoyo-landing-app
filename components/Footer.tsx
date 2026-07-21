import Link from "next/link";
import Image from "next/image";

const agencies = [
  { country: "Bénin", flag: "🇧🇯", address: "Gbégamey, avant dernier von avant le carrefour Kossi en prenant le trafic local en quittant l'étoile Rouge, Cotonou", phone: "+229 01 91 08 41 41" },
  { country: "Togo", flag: "🇹🇬", address: "Zone administrative, Tokouin, Lomé", phone: "+228 71 53 18 42" },
  { country: "Côte d'Ivoire", flag: "🇨🇮", address: "Gbagba Lot 50, Quartier Savane, Bingerville, Abidjan", phone: "+225 07 13 59 37 75" },
];

const usefulLinks = [
  { href: "https://ahiyoyo.com/comment-ca-marche/", label: "Comment ça marche" },
  { href: "/faq", label: "Foire aux questions (FAQ)" },
  { href: "/cgu", label: "Conditions générales d’utilisation" },
  { href: "/confidentialite", label: "Politique de confidentialité" },
  { href: "https://ahiyoyo.com/cga", label: "Conditions générales d'achat" },
  { href: "https://ahiyoyo.com/mentions-legales/", label: "Mentions légales" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1.3fr_1fr] gap-10 md:gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/ahiyoyo.png" alt="Ahiyoyo" width={512} height={167} className="h-8 w-auto" />
            </div>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs mb-6">
              Votre partenaire pour acheter, vendre et expédier entre l&apos;Afrique et l&apos;international. Rapide, sûr et transparent.
            </p>
            <h4 className="font-mono-tag text-[11px] font-semibold text-white/70 mb-3">Service client</h4>
            <ul className="space-y-2 text-sm text-white/60 font-mono-tag text-xs">
              <li><i className="fa-solid fa-phone text-amber mr-2" />+229 01 91 08 41 41</li>
              <li><i className="fa-solid fa-envelope text-amber mr-2" />support@ahiyoyo.com</li>
              <li><i className="fa-solid fa-envelope text-amber mr-2" />contactahiyoyo@gmail.com</li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono-tag text-[11px] font-semibold text-white/70 mb-4">Nos agences</h4>
            <ul className="space-y-5 text-sm text-white/60">
              {agencies.map((agency) => (
                <li key={agency.country}>
                  <p className="font-display font-semibold text-white/85 mb-1">{agency.flag} {agency.country}</p>
                  <p className="leading-relaxed">{agency.address}</p>
                  <p className="mt-1 font-mono-tag text-xs">{agency.phone}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono-tag text-[11px] font-semibold text-white/70 mb-4">Liens utiles</h4>
            <ul className="space-y-3 text-sm text-white/60">
              {usefulLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="sep-soft-dark mt-12 md:mt-16" />
        <div className="pt-6 md:pt-8">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} <Link href="/confidentialite" className="hover:text-white transition">NEW MARKETS TECHNOLOGIES</Link>. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
