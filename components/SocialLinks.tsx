import { socialLinks } from "@/lib/site-data";

type SocialLinksProps = {
  showLabels?: boolean;
  tone?: "dark" | "light";
};

function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            fill="currentColor"
            d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm9.8 1.6a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
          />
        </svg>
      );
    case "YouTube":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            fill="currentColor"
            d="M21.8 8.1a3 3 0 0 0-2.1-2.1C17.9 5.5 12 5.5 12 5.5s-5.9 0-7.7.5A3 3 0 0 0 2.2 8.1c-.5 1.8-.5 3.9-.5 3.9s0 2.1.5 3.9a3 3 0 0 0 2.1 2.1c1.8.5 7.7.5 7.7.5s5.9 0 7.7-.5a3 3 0 0 0 2.1-2.1c.5-1.8.5-3.9.5-3.9s0-2.1-.5-3.9ZM10.1 15.3V8.7l5.7 3.3-5.7 3.3Z"
          />
        </svg>
      );
    case "TikTok":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            fill="currentColor"
            d="M14 3c.4 2 1.6 3.2 3.7 3.6V9a7.5 7.5 0 0 1-3.7-1v6.2a5.2 5.2 0 1 1-5.2-5.2c.4 0 .8 0 1.2.1v2.6a2.7 2.7 0 1 0 1.5 2.5V3H14Z"
          />
        </svg>
      );
    case "X":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            fill="currentColor"
            d="M18.9 2H22l-6.8 7.8L23 22h-6.1l-4.8-6.4L6.5 22H3.4l7.3-8.4L1 2h6.3l4.3 5.7L18.9 2Zm-1.1 18h1.7L6.4 3.9H4.6L17.8 20Z"
          />
        </svg>
      );
    case "Facebook":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            fill="currentColor"
            d="M13.5 8.5V6.9c0-.9.2-1.4 1.5-1.4H17V2.8c-.4-.1-1.7-.2-3.2-.2-3.1 0-5.2 1.9-5.2 5.4v1.5H6v3.2h2.6v8.7h3.8v-8.7h3l.5-3.2h-3.5Z"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function SocialLinks({ showLabels = false, tone = "dark" }: SocialLinksProps) {
  const linkTone =
    tone === "light"
      ? "border-black/18 text-black/78 hover:border-black hover:text-black"
      : "border-white/12 text-white/84 hover:border-[var(--accent)] hover:text-white";

  return (
    <div className={`flex flex-wrap gap-3 ${showLabels ? "flex-col items-start" : "items-center"}`}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit Nathan Somevi on ${social.name}`}
          className={`inline-flex items-center gap-3 rounded-[8px] border px-4 py-3 ${linkTone} ${
            showLabels ? "w-full justify-start" : "justify-center"
          }`}
        >
          <SocialIcon name={social.name} />
          {showLabels ? <span className="text-sm font-semibold">{social.name}</span> : null}
        </a>
      ))}
    </div>
  );
}
