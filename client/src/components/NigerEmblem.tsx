/**
 * Niger State emblem — animated decorative seal used in Hero, Auth, Footer.
 * Pure SVG + Tailwind, no external assets.
 */
interface Props {
  size?: number;
  className?: string;
  variant?: "light" | "dark";
}

export function NigerEmblem({
  size = 160,
  className = "",
  variant = "light",
}: Props) {
  const ringStroke = variant === "light" ? "#d6b25a" : "#b98a2e";
  const innerFill = variant === "light" ? "#0d4d2c" : "#fbf6e7";
  const innerStroke = variant === "light" ? "#fbf6e7" : "#0d4d2c";
  const accent = variant === "light" ? "#d6b25a" : "#b98a2e";

  return (
    <div
      data-testid="niger-emblem"
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer rotating gold ring */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 niger-spin-slow"
        style={{ width: size, height: size }}
      >
        <defs>
          <path
            id="niger-circle-text"
            d="M 100,100 m -82,0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0"
            fill="none"
          />
        </defs>
        <text
          fill={ringStroke}
          fontSize="11"
          fontWeight="900"
          letterSpacing="6"
          fontFamily="Montserrat, sans-serif"
        >
          <textPath href="#niger-circle-text" startOffset="0">
           · NIGER STATE · POWER · EXCELLENCE · HARVEST · NIGER STATE ·
          </textPath>
        </text>
      </svg>

      {/* Tick marks (12-position) */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0"
        style={{ width: size, height: size }}
      >
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          const long = i % 2 === 0;
          return (
            <line
              key={i}
              x1="100"
              y1="32"
              x2="100"
              y2={long ? 40 : 36}
              stroke={accent}
              strokeWidth={long ? 2 : 1}
              strokeLinecap="round"
              transform={`rotate(${angle} 100 100)`}
              opacity={long ? 0.95 : 0.5}
            />
          );
        })}
      </svg>

      {/* Inner deep-green stamp */}
      <div className="absolute inset-[18%] rounded-full flex items-center justify-center"
           style={{ background: innerFill, border: `2px solid ${innerStroke}` }}>
        <div className="text-center">
          <div
            className="text-[9px] font-black tracking-[0.35em]"
            style={{ color: accent }}
          >
            NIGER
          </div>
          <div
            className="text-[18px] font-black leading-none mt-1 mb-1"
            style={{ color: variant === "light" ? "#fbf6e7" : "#0d4d2c" }}
          >
            STATE
          </div>
          <div
            className="mx-auto h-[2px] w-6 rounded-full"
            style={{ background: accent }}
          />
          <div
            className="text-[8px] font-black tracking-[0.25em] mt-1"
            style={{ color: accent }}
          >
            EST · 1976
          </div>
        </div>
      </div>

      {/* Floating gold pulse */}
      <span className="absolute top-1 right-3 w-2.5 h-2.5 rounded-full bg-brand-sun ring-2 ring-brand-sun/30 niger-pulse-ring" />
    </div>
  );
}
