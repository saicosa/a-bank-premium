type Props = {
  index: string;
  label?: string;
  className?: string;
  tone?: "light" | "dark";
};

export function SectionIndex({
  index,
  label,
  className = "",
  tone = "light",
}: Props) {
  const muted = tone === "dark" ? "text-white/45" : "text-mute";
  const strong = tone === "dark" ? "text-white/70" : "text-ink";
  const rule = tone === "dark" ? "bg-white/25" : "bg-line";

  return (
    <div className={`meta flex items-center gap-3 ${muted} ${className}`}>
      <span className={strong}>{index}</span>
      {label ? (
        <>
          <span className={`h-px w-6 ${rule}`} aria-hidden />
          <span>{label}</span>
        </>
      ) : null}
    </div>
  );
}
