export function SectionHead({
  id,
  kicker,
  title,
  intro,
  center = false,
}: {
  id: string;
  kicker: string;
  title: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} data-reveal>
      <p className="kicker">{kicker}</p>
      <h2 id={id} className="h-section">
        {title}
      </h2>
      {intro && <p className={`lead mt-4 ${center ? "mx-auto" : ""}`}>{intro}</p>}
    </div>
  );
}
