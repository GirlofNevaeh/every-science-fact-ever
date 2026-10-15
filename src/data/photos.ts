export type Shot = {
  src: string;
  alt: string;
  credit: string;
  href: string;
};

function commons(file: string, src: string, alt: string, credit: string): Shot {
  const name = file.replace(/ /g, "_");
  return {
    src,
    alt,
    credit,
    href: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(name)}`,
  };
}

function nasa(id: string, src: string, alt: string, credit: string): Shot {
  return {
    src,
    alt,
    credit,
    href: `https://images.nasa.gov/details/${id}`,
  };
}

export const SHOTS = {
  frog: commons(
    "Lithobates sylvaticus.jpg",
    "/photos/frog.jpg",
    "A wood frog",
    "The Cosmonaut. CC BY-SA 2.5.",
  ),
  bee: commons(
    "The Lone Pollinator.jpg",
    "/photos/bee.jpg",
    "A honey bee on a flower",
    "Tanner Smida. CC BY 4.0.",
  ),
  mushroom: commons(
    "ChampignonMushroom.jpg",
    "/photos/mushroom.jpg",
    "A button mushroom",
    "chris_73. CC BY-SA 3.0.",
  ),
  chimp: commons(
    "015 Chimpanzee at Kibale forest National Park Photo by Giles Laurent.jpg",
    "/photos/chimp.jpg",
    "A chimpanzee in a forest",
    "Giles Laurent. CC BY-SA 4.0.",
  ),
  amazon: commons(
    "Amazon17 (5641020319).jpg",
    "/photos/amazon.jpg",
    "Rainforest canopy in the Amazon",
    "CIAT. CC BY-SA 2.0.",
  ),
  wormwood: commons(
    "Artemisia annua.jpeg",
    "/photos/wormwood.jpg",
    "Sweet wormwood, the plant artemisinin comes from",
    "Kristian Peters. CC BY-SA 3.0.",
  ),
  lab: commons(
    "At Manchester 2023 2023 006.jpg",
    "/photos/lab.jpg",
    "A university science building",
    "Mike Peel. CC BY-SA 4.0.",
  ),
  magnet: commons(
    "Magnetite sample with neodymium magnet.jpg",
    "/photos/magnet.jpg",
    "A magnet pulling a piece of magnetite",
    "GOKLuLe. CC BY-SA 3.0.",
  ),
  earth: commons(
    "The Earth seen from Apollo 17.jpg",
    "/photos/earth.jpg",
    "Earth, photographed from Apollo 17",
    "NASA. Public domain.",
  ),
  jupiter: nasa(
    "PIA21974",
    "/photos/jupiter.jpg",
    "Jupiter's clouds, from NASA's Juno spacecraft",
    "NASA / JPL-Caltech / SwRI / MSSS. Public domain.",
  ),
  hubble: nasa(
    "s31-10-018",
    "/photos/hubble.jpg",
    "The Hubble Space Telescope above Earth",
    "NASA. Public domain.",
  ),
  keck: commons(
    "KeckTelescopes-hi.png",
    "/photos/keck.jpg",
    "Telescope domes on Mauna Kea",
    "T. Wynne / NASA JPL. Public domain.",
  ),
  heart: commons(
    "Heart model front back views.png",
    "/photos/heart.jpg",
    "A model of a human heart",
    "RWhitwam. CC BY-SA 4.0. Cropped to the front view.",
  ),
  octopus: commons(
    "Octopus2.jpg",
    "/photos/octopus.jpg",
    "A common octopus",
    "Albert Kok. CC BY-SA 3.0.",
  ),
  stonehenge: commons(
    "Stonehenge2007 07 30.jpg",
    "/photos/stonehenge.jpg",
    "Stonehenge, an old stone circle used to track the sky",
    "garethwiscombe. CC BY 2.0.",
  ),
  scope: commons(
    "Ukrainian microscope (cropped).jpg",
    "/photos/scope.jpg",
    "A microscope on a bright table",
    "Ann 2000. CC BY-SA 4.0.",
  ),
  petri: commons(
    "Antonio e Biagio e Cesare Arrigo Petri dish.jpg",
    "/photos/petri.jpg",
    "A lab dish with spots of germs",
    "SS. Antonio e Biagio e Cesare Arrigo. CC BY-SA 4.0.",
  ),
  flight: commons(
    "Wright Flyer replica (4-9-2024).jpg",
    "/photos/flight.jpg",
    "A Wright Flyer replica hanging in a museum",
    "ZLEA. CC BY-SA 4.0.",
  ),
  dna: commons(
    "20251019 Replica DNA double helix model Berlin 03.jpg",
    "/photos/dna.jpg",
    "A museum model of the DNA double helix",
    "Flocci Nivis. CC BY 4.0.",
  ),
  engine: commons(
    "Babbage Difference Engine.jpg",
    "/photos/engine.jpg",
    "Part of Babbage's Difference Engine",
    "geni. CC BY-SA 4.0.",
  ),
  lyme: commons(
    "Lyme Regis, View of the town over Victoria pier - geograph.org.uk - 4401760.jpg",
    "/photos/lyme.jpg",
    "Lyme Regis, England, beside the sea cliffs",
    "Eugene Birchall. CC BY-SA 2.0.",
  ),
  hospital: commons(
    "St Mary's Hospital.jpg",
    "/photos/hospital.jpg",
    "St Mary's Hospital in London",
    "Enric. CC BY-SA 2.0.",
  ),
} satisfies Record<string, Shot>;

export type ShotId = keyof typeof SHOTS;

const BY_SRC = new Map(Object.values(SHOTS).map((shot) => [shot.src, shot]));

export function shotBySrc(src: string): Shot | undefined {
  return BY_SRC.get(src);
}

export const PHOTO_LIST: Shot[] = Object.values(SHOTS);

const SCENE: Record<string, ShotId> = {
  darwin: "amazon",
  goodall: "chimp",
  carver: "amazon",
  mcclintock: "amazon",
  just: "octopus",
  maathai: "amazon",
  curie: "lab",
  franklin: "scope",
  julian: "lab",
  tu: "wormwood",
  mendeleev: "lab",
  ball: "lab",
  newton: "earth",
  faraday: "magnet",
  wu: "lab",
  lovelace: "engine",
  jackson: "lab",
  ibn: "scope",
  anning: "lyme",
  johnson: "earth",
  jemison: "hubble",
  copernicus: "earth",
  galileo: "jupiter",
  chandra: "hubble",
};

export function sceneFor(slug: string): Shot {
  return SHOTS[SCENE[slug] ?? "earth"];
}

export const TOPIC_SHOT: Record<string, Shot> = {
  living: SHOTS.bee,
  materials: SHOTS.lab,
  forces: SHOTS.magnet,
  earth: SHOTS.earth,
  space: SHOTS.hubble,
  body: SHOTS.heart,
  unusual: SHOTS.octopus,
};
