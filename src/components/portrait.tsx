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
  if (coat === "brick") return "#c4472d";
  if (coat === "flight") return "#e36a2c";
  return "var(--color-ink)";
}

function BackHair({ style, fill }: { style: HairStyle; fill: string }) {
  if (style === "bald") return null;
  if (style === "bowl") {
    return (
      <g fill={fill}>
        <ellipse cx="62" cy="120" rx="20" ry="32" />
        <ellipse cx="138" cy="120" rx="20" ry="32" />
        <path d="M50 114 Q48 58 100 48 Q152 58 150 114 Q130 76 100 72 Q70 76 50 114" />
      </g>
    );
  }
  if (style === "recede") {
    return (
      <g fill={fill}>
        <path d="M60 120 Q52 86 80 80 Q68 108 74 132 Q88 110 96 98 Q74 108 60 120" />
        <path d="M140 120 Q148 86 120 80 Q132 108 126 132 Q112 110 104 98 Q126 108 140 120" />
      </g>
    );
  }
  if (style === "bun") return <circle cx="100" cy="58" r="16" fill={fill} />;
  if (style === "afro") return <circle cx="100" cy="104" r="62" fill={fill} />;
  if (style === "puff") return <circle cx="100" cy="96" r="52" fill={fill} />;
  if (style === "ponytail") return null;
  if (style === "long") {
    return (
      <g fill={fill}>
        <path d="M64 92 Q46 150 68 202 Q90 158 80 100 Q72 78 64 92" />
        <path d="M136 92 Q154 150 132 202 Q110 158 120 100 Q128 78 136 92" />
        <path d="M70 98 Q100 56 130 98 Q116 76 100 72 Q84 76 70 98" />
      </g>
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

export function Portrait({
  look,
  className,
  label,
}: {
  look: Look;
  className?: string;
  label?: string;
}) {
  const skin = skinFill(look.skin);
  const fill = hairFill(look.hair);
  const coat = coatFill(look.coat);
  const faceRy = look.woman ? 48 : 44;
  const skipFront =
    look.style === "bald" ||
    look.style === "afro" ||
    look.style === "puff" ||
    look.style === "recede" ||
    look.style === "bowl" ||
    look.style === "long";
  return (
    <svg
      viewBox="0 0 200 220"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <circle cx="100" cy="112" r="96" fill="var(--color-chalk)" />
      <BackHair style={look.style} fill={fill} />
      <path d="M34 222 Q100 176 166 222 Z" fill={coat} stroke="var(--color-ink)" strokeWidth="3" />
      <rect x="86" y="142" width="28" height="28" rx="10" fill={skin} />
      <ellipse cx="58" cy="116" rx="8" ry="12" fill={skin} />
      <ellipse cx="142" cy="116" rx="8" ry="12" fill={skin} />
      <ellipse cx="100" cy="108" rx="40" ry={faceRy} fill={skin} />
      {skipFront ? null : <path d="M68 96 Q100 78 132 96 Q120 86 100 84 Q80 86 68 96" fill={fill} />}
      {look.hat === "cap" ? <path d="M52 96 Q100 36 148 96 L156 106 H44 Z" fill="var(--color-ink)" /> : null}
      {look.hat === "bonnet" ? (
        <g>
          <path
            d="M44 90 Q100 18 156 90 Q142 70 100 66 Q58 70 44 90"
            fill="var(--color-chalk)"
            stroke="var(--color-ink)"
            strokeWidth="3"
          />
          <path d="M46 88 Q34 132 64 150" fill="none" stroke="var(--color-ink)" strokeWidth="3" />
          <path d="M154 88 Q166 132 136 150" fill="none" stroke="var(--color-ink)" strokeWidth="3" />
        </g>
      ) : null}
      {look.hat === "turban" ? (
        <g>
          <path
            d="M46 98 Q72 30 100 26 Q158 34 158 98 Q146 68 100 60 Q56 68 46 98"
            fill="var(--color-chalk)"
            stroke="var(--color-ink)"
            strokeWidth="3"
          />
          <ellipse cx="100" cy="62" rx="34" ry="12" fill="var(--color-chalk)" stroke="var(--color-ink)" strokeWidth="2.5" />
        </g>
      ) : null}
      {look.hat === "wrap" ? (
        <g>
          <path
            d="M64 84 Q100 68 142 84 Q136 96 100 92 Q72 96 64 84"
            fill="var(--color-chalk)"
            stroke="var(--color-ink)"
            strokeWidth="2.5"
          />
          <circle cx="146" cy="74" r="11" fill="var(--color-chalk)" stroke="var(--color-ink)" strokeWidth="2.5" />
        </g>
      ) : null}
      {look.older ? (
        <g fill="none" stroke="var(--color-ink)" strokeWidth="1.6" opacity="0.4" strokeLinecap="round">
          <path d="M68 98 Q74 94 80 98" />
          <path d="M120 98 Q126 94 132 98" />
        </g>
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
      {look.mouth === "calm" ? (
        <path d="M88 132 H112" fill="none" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" />
      ) : look.mouth === "wide" ? (
        <g>
          <path d="M76 128 Q100 156 124 128 Q100 146 76 128" fill="var(--color-ink)" />
          <path d="M84 130 Q100 146 116 130" fill="var(--color-lab)" />
        </g>
      ) : (
        <path
          d="M86 128 Q100 140 114 128"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      )}
      {look.beard ? (
        <path
          d="M70 126 C64 168 78 192 100 194 C122 192 136 168 130 126 C118 148 100 156 82 148 C76 140 74 132 70 126 Z"
          fill={fill}
          stroke="var(--color-ink)"
          strokeWidth="2.5"
        />
      ) : null}
      {look.mustache ? (
        <path d="M82 122 Q100 136 118 122 Q108 130 100 130 Q92 130 82 122" fill={fill} stroke="var(--color-ink)" strokeWidth="2" />
      ) : null}
      {look.style === "ponytail" ? (
        <path d="M130 76 C158 96 168 150 146 200 C132 158 120 112 134 84 Z" fill={fill} stroke="var(--color-ink)" strokeWidth="2" />
      ) : null}
      {look.bow ? (
        <g fill="var(--color-ink)">
          <path d="M100 166 L76 156 L76 178 Z" />
          <path d="M100 166 L124 156 L124 178 Z" />
          <circle cx="100" cy="167" r="4" fill="var(--color-chalk)" stroke="var(--color-ink)" strokeWidth="2" />
        </g>
      ) : null}
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
