export const TOPICS = [
  { id: "living", label: "Living" },
  { id: "materials", label: "Materials" },
  { id: "forces", label: "Forces" },
  { id: "earth", label: "Earth" },
  { id: "space", label: "Space" },
  { id: "body", label: "Body" },
  { id: "unusual", label: "Unusual" },
] as const;

export type TopicId = (typeof TOPICS)[number]["id"];
export type Kind = "fact" | "theory" | "guess";

export type Q = {
  prompt: string;
  choices: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
};

export type Fact = {
  slug: string;
  topic: TopicId;
  title: string;
  sentence: string;
  kind: Kind;
  how: string;
  extra?: string;
  unsure?: string;
  person?: string;
  quiz: Q[];
};

export const FIELDS = [
  { id: "living", label: "Living things" },
  { id: "materials", label: "Materials and chemistry" },
  { id: "forces", label: "Forces and physics" },
  { id: "earth", label: "Earth and space" },
] as const;

export type FieldId = (typeof FIELDS)[number]["id"];

export type HairStyle =
  | "bun"
  | "long"
  | "bob"
  | "short"
  | "afro"
  | "puff"
  | "braids"
  | "bald"
  | "wavy"
  | "curls"
  | "crop"
  | "ponytail"
  | "side";

export type Look = {
  skin: 1 | 2 | 3 | 4 | 5 | 6;
  hair: 1 | 2 | 3 | 4 | 5;
  style: HairStyle;
  woman: boolean;
  beard?: boolean;
  glasses?: boolean;
  hat?: "cap" | "bonnet";
  coat: "leaf" | "cobalt" | "chalk" | "ink";
};

export type Person = {
  slug: string;
  name: string;
  field: FieldId;
  when: string;
  lines: string[];
  extra?: string;
  unsure?: string;
  look: Look;
  scene: string;
  sceneAlt: string;
  quiz: Q;
  audit?: { w?: boolean; m?: boolean };
};

export type Place = {
  id: string;
  pin: string;
  title: string;
  where: string;
  lines: string[];
  x: number;
  y: number;
  image: string;
  alt: string;
};

export type Step = {
  id: string;
  title: string;
  when: string;
  sentence: string;
  more: string;
  unsure?: string;
  image: string;
  alt: string;
};

export type WorkCard = {
  slug: string;
  stage: "P1" | "P2" | "P3" | "P4" | "P5" | "P6" | "P7" | "Print";
  mode: "solo" | "team" | "print";
  title: string;
  time: string;
  need: string[];
  steps: string[];
  done: string;
};

export function topicLabel(id: string): string {
  return TOPICS.find((t) => t.id === id)?.label ?? id;
}

export function fieldLabel(id: string): string {
  return FIELDS.find((f) => f.id === id)?.label ?? id;
}

export function kindLabel(kind: Kind): string {
  if (kind === "theory") return "A theory";
  if (kind === "guess") return "A guess";
  return "Measured fact";
}
