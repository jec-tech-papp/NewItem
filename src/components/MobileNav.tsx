"use client";

const items = [
  { href: "#accueil", label: "Accueil" },
  { href: "#cabinet", label: "Cabinet" },
  { href: "#expertise", label: "Expertise" },
  { href: "#contact", label: "Contact" },
  { href: "#actualites", label: "Actus" },
];

type MobileNavProps = {
  doctolibUrl: string;
};

export function MobileNav({ doctolibUrl }: MobileNavProps) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-sky-100/80 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      aria-label="Navigation mobile"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-between gap-0.5 px-1 pt-1">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex min-h-[44px] min-w-0 flex-1 flex-col items-center justify-center rounded-lg px-0.5 py-2 text-[10px] font-medium leading-tight text-slate-600 active:bg-sky-50"
          >
            {item.label}
          </a>
        ))}
      </div>
      <a
        href={doctolibUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="doctolib-cta doctolib-cta-mobile-bar mx-2 mb-2 block text-center"
      >
        Prendre rendez-vous
      </a>
    </nav>
  );
}
