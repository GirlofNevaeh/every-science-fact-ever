import type { HairStyle, Look } from "@/data/types";

function hairFill(hair: Look["hair"]) {
  return `var(--color-hair-${hair})`;
}

function skinFill(skin: Look["skin"]) {
  return `var(--color-skin-${skin})`;
}

function coatFill(coat: Look["coat"]) {
  if (coat === "leaf") return "var(--color-leaf)";
  if (coat === "cobalt") return "var(--color-cobalt)";
  if (coat === "chalk") return "var(--color-chalk)";
  return "var(--color-ink)";
}

function BackHair({ style, fill }: { style: HairStyle; fill: string }) {
  if (style === "bald") return null;
  if (style === "bun") return <circle cx="100" cy="58" r="16" fill={fill} />;
  if (style === "afro") return <circle cx="100" cy="104" r="62" fill={fill} />;
  if (style === "puff") return <circle cx="100" cy="96" r="52" fill={fill} />;
  if (style === "long" || style === "ponytail") {
    return (
      <path
        d="M64 96 Q58 168 80 196 H120 Q142 168 136 96 Q120 70 100 66 Q80 70 64 96"
        fill={fill}
      />
    );
  }
  if (style === "bob") {
    return (
      <path d="M60 108 Q58 156 80 162 H120 Q142 156 140 108 Q122 62 100 60 Q78 62 60 108" fill={fill} />
    );
  }
  if (style === "braids") {
    return (
      <g fill={fill}>
        <rect x="46" y="96" width="16" height="78" rx="8" />
        <rect x="138" y="96" width="16" height="78" rx="8" />
        <path d="M66 104 Q100 52 134 104 Q118 72 100 68 Q82 72 66 104" />
      </g>
    );
  }
  if (style === "curls") {
    return (
      <g fill={fill}>
        <circle cx="60" cy="124" r="16" />
        <circle cx="56" cy="150" r="14" />
        <circle cx="140" cy="124" r="16" />
        <circle cx="144" cy="150" r="14" />
        <path d="M68 100 Q100 48 132 100 Q116 70 100 66 Q84 70 68 100" />
      </g>
    );
  }
  if (style === "wavy") {
    return (
      <path
        d="M66 92 Q52 140 72 176 Q92 154 100 176 Q110 154 130 176 Q150 140 134 92 Q116 58 100 56 Q84 58 66 92"
        fill={fill}
      />
    );
  }
  const cap =
    style === "crop"
      ? "M70 100 Q78 64 100 60 Q128 62 136 96 Q122 78 100 76 Q82 78 70 100"
      : "M62 102 Q70 56 100 52 Q142 58 144 104 Q128 76 100 72 Q76 76 62 102";
  return <path d={cap} fill={fill} />;
}

export function Portrait({ look, className }: { look: Look; className?: string }) {
  const skin = skinFill(look.skin);
  const fill = hairFill(look.hair);
  const coat = coatFill(look.coat);
  const faceRy = look.woman ? 48 : 44;
  return (
    <svg viewBox="0 0 200 220" className={className} aria-hidden="true">
      <circle cx="100" cy="112" r="96" fill="var(--color-chalk)" />
      <BackHair style={look.style} fill={fill} />
      <path d="M28 222 Q100 150 172 222 Z" fill={coat} stroke="var(--color-ink)" strokeWidth="3" />
      <rect x="86" y="142" width="28" height="28" rx="10" fill={skin} />
      <ellipse cx="58" cy="116" rx="8" ry="12" fill={skin} />
      <ellipse cx="142" cy="116" rx="8" ry="12" fill={skin} />
      <ellipse cx="100" cy="108" rx="40" ry={faceRy} fill={skin} />
      {look.style !== "bald" && look.style !== "afro" && look.style !== "puff" ? (
        <path d="M68 96 Q100 78 132 96 Q120 86 100 84 Q80 86 68 96" fill={fill} />
      ) : null}
      {look.hat === "cap" ? (
        <path d="M52 96 Q100 36 148 96 L156 106 H44 Z" fill="var(--color-ink)" />
      ) : null}
      {look.hat === "bonnet" ? (
        <path
          d="M42 108 Q100 28 158 108 Q140 128 100 120 Q60 128 42 108"
          fill="var(--color-chalk)"
          stroke="var(--color-ink)"
          strokeWidth="3"
        />
      ) : null}
      <ellipse cx="84" cy="108" rx="7" ry="8" fill="var(--color-lab)" />
      <ellipse cx="116" cy="108" rx="7" ry="8" fill="var(--color-lab)" />
      <circle cx="85" cy="109" r="3.2" fill="var(--color-ink)" />
      <circle cx="117" cy="109" r="3.2" fill="var(--color-ink)" />
      {look.woman ? (
        <g stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round">
          <path d="M74 100 L78 104" />
          <path d="M92 98 L90 104" />
          <path d="M108 98 L110 104" />
          <path d="M126 100 L122 104" />
        </g>
      ) : null}
      {look.glasses ? (
        <g fill="none" stroke="var(--color-ink)" strokeWidth="2.5">
          <circle cx="84" cy="108" r="12" />
          <circle cx="116" cy="108" r="12" />
          <path d="M96 108 H104" />
        </g>
      ) : null}
      <path d="M100 114 Q106 122 100 124" fill="none" stroke="var(--color-ink)" strokeWidth="2" opacity="0.55" />
      <path
        d="M86 128 Q100 140 114 128"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {look.beard ? <path d="M70 132 Q100 176 130 132 Q114 150 100 154 Q86 150 70 132" fill={fill} /> : null}
    </svg>
  );
}

export const KID_LOOKS: Look[] = [
  { skin: 6, hair: 1, style: "braids", woman: true, coat: "leaf" },
  { skin: 3, hair: 1, style: "short", woman: false, coat: "cobalt" },
  { skin: 1, hair: 4, style: "ponytail", woman: true, coat: "chalk" },
  { skin: 5, hair: 1, style: "afro", woman: false, coat: "leaf" },
  { skin: 2, hair: 2, style: "bob", woman: true, glasses: true, coat: "cobalt" },
  { skin: 1, hair: 3, style: "crop", woman: false, hat: "cap", coat: "chalk" },
  { skin: 4, hair: 1, style: "puff", woman: true, coat: "leaf" },
  { skin: 2, hair: 1, style: "side", woman: false, glasses: true, coat: "ink" },
  { skin: 6, hair: 1, style: "bun", woman: true, coat: "cobalt" },
  { skin: 3, hair: 3, style: "curls", woman: false, coat: "leaf" },
  { skin: 1, hair: 5, style: "bob", woman: true, coat: "chalk" },
  { skin: 5, hair: 1, style: "crop", woman: false, coat: "cobalt" },
  { skin: 4, hair: 2, style: "long", woman: true, coat: "leaf" },
  { skin: 2, hair: 4, style: "wavy", woman: false, coat: "chalk" },
  { skin: 6, hair: 1, style: "short", woman: true, glasses: true, coat: "ink" },
  { skin: 1, hair: 2, style: "side", woman: false, coat: "leaf" },
  { skin: 3, hair: 1, style: "braids", woman: true, coat: "chalk" },
  { skin: 5, hair: 1, style: "puff", woman: false, coat: "cobalt" },
  { skin: 2, hair: 3, style: "curls", woman: true, coat: "leaf" },
  { skin: 4, hair: 1, style: "bun", woman: false, hat: "cap", coat: "chalk" },
];
