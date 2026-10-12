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
  darwin: commons(
    "Charles Darwin by Julia Margaret Cameron, c. 1868.jpg",
    "/photos/darwin.jpg",
    "Charles Darwin",
    "Julia Margaret Cameron. Public domain.",
  ),
  goodall: commons(
    "Jane Goodall 2015.jpg",
    "/photos/goodall.jpg",
    "Jane Goodall",
    "U.S. Department of State. Public domain.",
  ),
  carver: commons(
    "George Washington Carver c1910 - Restoration.jpg",
    "/photos/carver.jpg",
    "George Washington Carver",
    "Public domain. Restored by Adam Cuerden.",
  ),
  mcclintock: commons(
    "Barbara McClintock (1902-1992) shown in her laboratory in 1947.jpg",
    "/photos/mcclintock.jpg",
    "Barbara McClintock in her laboratory",
    "Smithsonian Institution. Public domain.",
  ),
  just: commons(
    "Ernest Everett Just.jpg",
    "/photos/just.jpg",
    "Ernest Everett Just",
    "Public domain.",
  ),
  maathai: commons(
    "Wangari Maathai in 2001.jpg",
    "/photos/maathai.jpg",
    "Wangari Maathai",
    "Kingkongphoto. CC BY-SA 2.0.",
  ),
  curie: commons(
    "Marie Curie c1920.jpg",
    "/photos/curie.jpg",
    "Marie Curie",
    "Henri Manuel. Public domain.",
  ),
  franklin: commons(
    "Rosalind Franklin.jpg",
    "/photos/franklin.jpg",
    "Rosalind Franklin at a microscope",
    "MRC Laboratory of Molecular Biology. CC BY-SA 4.0.",
  ),
  julian: commons(
    "Percy Lavon Julian (1899-1975) portrait.jpg",
    "/photos/julian.jpg",
    "Percy Julian",
    "Public domain.",
  ),
  tu: commons(
    "Tu Youyou 5012-1-2015.jpg",
    "/photos/tu.jpg",
    "Tu Youyou",
    "Bengt Nyman. CC BY-SA 4.0.",
  ),
  mendeleev: commons(
    "Dmitri Mendeleev 1890s.jpg",
    "/photos/mendeleev.jpg",
    "Dmitri Mendeleev",
    "Public domain.",
  ),
  ball: commons(
    "Alice Augusta Ball.jpg",
    "/photos/ball.jpg",
    "Alice Ball",
    "Public domain.",
  ),
  newton: commons(
    "GodfreyKneller-IsaacNewton-1689.jpg",
    "/photos/newton.jpg",
    "Isaac Newton",
    "Godfrey Kneller. Public domain.",
  ),
  faraday: commons(
    "Michael Faraday sitting.jpg",
    "/photos/faraday.jpg",
    "Michael Faraday",
    "Public domain.",
  ),
  wu: commons(
    "Chien-Shiung Wu (1912-1997) in 1958.jpg",
    "/photos/wu.jpg",
    "Chien-Shiung Wu",
    "Smithsonian Institution. Public domain.",
  ),
  lovelace: commons(
    "Ada Lovelace portrait.jpg",
    "/photos/lovelace.jpg",
    "Ada Lovelace",
    "Alfred Edward Chalon. Public domain.",
  ),
  jackson: commons(
    "Shirley Ann Jackson World Economic Forum 2010.jpg",
    "/photos/jackson.jpg",
    "Shirley Ann Jackson",
    "World Economic Forum / Qilai Shen. CC BY-SA 2.0.",
  ),
  ibn: commons(
    "Ibn al-Haytham.jpg",
    "/photos/ibn.jpg",
    "A later drawing of Hasan Ibn al-Haytham",
    "Public domain.",
  ),
  anning: commons(
    "Mary Anning painting.jpg",
    "/photos/anning.jpg",
    "Mary Anning",
    "Painting credited to Mr. Grey. Public domain.",
  ),
  johnson: commons(
    "Katherine Johnson at NASA, in 1966.jpg",
    "/photos/johnson.jpg",
    "Katherine Johnson",
    "NASA. Public domain. Restored by Adam Cuerden.",
  ),
  jemison: commons(
    "Mae Jemison.jpg",
    "/photos/jemison.jpg",
    "Mae Jemison",
    "NASA. Public domain.",
  ),
  copernicus: commons(
    "Nikolaus Kopernikus.jpg",
    "/photos/copernicus.jpg",
    "Nicolaus Copernicus",
    "Public domain.",
  ),
  galileo: commons(
    "Justus Sustermans - Portrait of Galileo Galilei, 1636.jpg",
    "/photos/galileo.jpg",
    "Galileo Galilei",
    "Justus Sustermans. Public domain.",
  ),
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
  hands: commons(
    "OCD handwash.jpg",
    "/photos/hands.jpg",
    "Hands being washed with soap",
    "Lars Klintwall Malmqvist. Public domain.",
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
    "First flight2.jpg",
    "/photos/flight.jpg",
    "The Wright Flyer on its first flight in 1903",
    "John T. Daniels. Public domain.",
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

const FACE: Record<string, ShotId> = {
  darwin: "darwin",
  goodall: "goodall",
  carver: "carver",
  mcclintock: "mcclintock",
  just: "just",
  maathai: "maathai",
  curie: "curie",
  franklin: "franklin",
  julian: "julian",
  tu: "tu",
  mendeleev: "mendeleev",
  ball: "ball",
  newton: "newton",
  faraday: "faraday",
  wu: "wu",
  lovelace: "lovelace",
  jackson: "jackson",
  ibn: "ibn",
  anning: "anning",
  johnson: "johnson",
  jemison: "jemison",
  copernicus: "copernicus",
  galileo: "galileo",
  chandra: "hubble",
};

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

export function faceFor(slug: string): Shot {
  return SHOTS[FACE[slug] ?? "earth"];
}

export function sceneFor(slug: string): Shot {
  return SHOTS[SCENE[slug] ?? "earth"];
}

export const TOPIC_SHOT: Record<string, Shot> = {
  living: SHOTS.bee,
  materials: SHOTS.lab,
  forces: SHOTS.magnet,
  earth: SHOTS.earth,
  space: SHOTS.jupiter,
  body: SHOTS.hands,
  unusual: SHOTS.octopus,
};
