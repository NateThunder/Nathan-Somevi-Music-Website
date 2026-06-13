import Link from "next/link";

type PageIntroAction = {
  label: string;
  href: string;
  external?: boolean;
};

type PageIntroProps = {
  eyebrow: string;
  title: string;
  summary: string;
  actions?: PageIntroAction[];
  backgroundImage?: string;
};

function ActionLink({ action }: { action: PageIntroAction }) {
  const className =
    "inline-flex min-h-[54px] min-w-[150px] items-center justify-center rounded-[8px] border border-[#e7aa35] bg-[#e7aa35] px-7 text-sm font-extrabold uppercase text-black shadow-none hover:bg-black hover:text-[#e7aa35]";

  if (action.external) {
    return (
      <a href={action.href} target="_blank" rel="noopener noreferrer" className={className}>
        {action.label}
      </a>
    );
  }

  return (
    <Link href={action.href} className={className}>
      {action.label}
    </Link>
  );
}

export default function PageIntro({ eyebrow, title, summary, actions = [], backgroundImage }: PageIntroProps) {
  return (
    <section className="relative isolate overflow-hidden px-6 pb-8 pt-32 sm:px-8 lg:px-12">
      {backgroundImage ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-cover bg-[position:center_24%] opacity-55"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      ) : null}
      {backgroundImage ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,6,11,0.94)_0%,rgba(4,6,11,0.74)_48%,rgba(4,6,11,0.3)_100%),linear-gradient(180deg,rgba(4,6,11,0.68)_0%,rgba(4,6,11,0.2)_48%,#04060b_100%)]"
        />
      ) : null}
      <div className="relative mx-auto w-full max-w-6xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2.7rem,7vw,5.4rem)] leading-[0.96] text-white">{title}</h1>
        <p className="mt-6 max-w-2xl text-[clamp(1.02rem,2vw,1.18rem)] leading-[1.6] text-[var(--muted-strong)]">
          {summary}
        </p>
        {actions.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-3">
            {actions.map((action) => (
              <ActionLink key={`${action.href}-${action.label}`} action={action} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
