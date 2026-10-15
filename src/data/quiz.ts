import { FACTS } from "@/data/facts";
import { PEOPLE } from "@/data/people";
import type { Q } from "@/data/types";

export type QuizQuestion = Q & { id: string };

const EXTRA: QuizQuestion[] = [
  {
    id: "time-stars",
    prompt: "Are we sure who first watched the stars with care?",
    choices: ["No. We are not sure.", "Yes. It was Galileo in 1610.", "Yes. It was Jane Goodall.", "Yes. It was last year."],
    answer: 0,
  },
  {
    id: "time-scope",
    prompt: "What did microscopes in the 1600s let people see?",
    choices: ["Tiny things", "The center of Earth by eye", "Sound in empty space", "A magnet's thoughts"],
    answer: 0,
  },
  {
    id: "time-germs",
    prompt: "In which years did strong tests show that germs can cause illness?",
    choices: ["The 1800s", "The year 1610 only", "Before Earth formed, and we are sure", "Last week only"],
    answer: 0,
  },
  {
    id: "time-flight",
    prompt: "When did a powered airplane first fly?",
    choices: ["1903", "1543", "1610", "1992"],
    answer: 0,
  },
  {
    id: "time-dna",
    prompt: "In which year was the twisted-ladder model of DNA shown?",
    choices: ["1953", "1650", "1903", "965"],
    answer: 0,
  },
  {
    id: "time-space",
    prompt: "Why put a telescope in space?",
    choices: ["To get above the blur of the air", "To escape all light", "To freeze frogs", "To mine the Sun"],
    answer: 0,
  },
  {
    id: "place-rain",
    prompt: "The rainforest field station on the map is in",
    choices: ["Ecuador", "The rings of Saturn", "The Moon", "A glacier only"],
    answer: 0,
  },
  {
    id: "place-lab",
    prompt: "The chemistry stop is about",
    choices: ["Turning plant chemicals into new materials", "Flying a shuttle", "Only fossil cliffs", "Moon tides"],
    answer: 0,
  },
  {
    id: "place-sky",
    prompt: "Why is a high mountain good for a telescope?",
    choices: ["It sits above many clouds", "It is under the ocean", "It has no sky", "The air is solid there"],
    answer: 0,
  },
  {
    id: "place-cliff",
    prompt: "Mary Anning's fossil cliffs are in",
    choices: ["England", "Hawaii", "Ecuador", "Orbit"],
    answer: 0,
  },
  {
    id: "place-hospital",
    prompt: "The hospital lab on the map is in",
    choices: ["London", "The Amazon", "Deep space", "A glacier"],
    answer: 0,
  },
  {
    id: "place-ocean",
    prompt: "Ships from Woods Hole go out to study",
    choices: ["The ocean", "The inside of the Sun", "Only classroom chalk", "Window glass"],
    answer: 0,
  },
  {
    id: "idea-fair",
    prompt: "A fair test changes",
    choices: ["One thing", "Every thing at once", "Nothing, ever", "The answer before you start"],
    answer: 0,
  },
  {
    id: "idea-two",
    prompt: "You change both the water and the light in a plant test. What is the problem?",
    choices: [
      "You will not know which change mattered",
      "The test is more fair",
      "Plants stop being alive on purpose",
      "The Sun goes out",
    ],
    answer: 0,
  },
  {
    id: "idea-gravity",
    prompt: "Which word fits the deep idea of gravity?",
    choices: ["Theory", "A guess with no tests", "Bone", "Berry"],
    answer: 0,
  },
  {
    id: "idea-science",
    prompt: "Science is how we",
    choices: [
      "Test ideas about the natural world",
      "Choose a family's beliefs for them",
      "Skip measuring",
      "Call a guess a fact",
    ],
    answer: 0,
  },
  {
    id: "extra-legs",
    prompt: "How many legs does an insect have?",
    choices: ["Six", "Eight", "Two", "206"],
    answer: 0,
  },
  {
    id: "extra-spider",
    prompt: "A spider is not an insect. How many legs does a spider have?",
    choices: ["Eight", "Six", "Four", "One"],
    answer: 0,
  },
  {
    id: "extra-gills",
    prompt: "How do fish get oxygen from water?",
    choices: ["With gills", "With lungs, like a whale", "By eating sand", "With feathers"],
    answer: 0,
  },
  {
    id: "extra-milk",
    prompt: "What do mammal mothers make for their young?",
    choices: ["Milk", "Sunlight", "Lava", "Glass"],
    answer: 0,
  },
  {
    id: "extra-eggs",
    prompt: "Birds hatch from what?",
    choices: ["Eggs", "Seeds", "Rocks", "Magnets"],
    answer: 0,
  },
  {
    id: "extra-roots",
    prompt: "What do roots mostly do?",
    choices: ["Take in water", "Make rings around Saturn", "Push the Moon", "Turn into gold"],
    answer: 0,
  },
  {
    id: "extra-green",
    prompt: "What makes many leaves look green?",
    choices: ["A green substance that catches light", "Iron rust", "Whale bone", "Moon dust"],
    answer: 0,
  },
  {
    id: "extra-solid",
    prompt: "A rock keeps its own shape. A rock is a",
    choices: ["Solid", "Gas", "Tide", "Galaxy"],
    answer: 0,
  },
  {
    id: "extra-gas",
    prompt: "The air in this room is a",
    choices: ["Gas", "Solid bone", "Planet", "Fossil"],
    answer: 0,
  },
  {
    id: "extra-melt",
    prompt: "Ice turns into liquid water when it",
    choices: ["Gains enough heat", "Loses every atom", "Becomes a magnet", "Flies to the Sun"],
    answer: 0,
  },
  {
    id: "extra-freeze",
    prompt: "Liquid water turns into ice when it",
    choices: ["Gets cold enough", "Boils at once", "Turns into oil", "Becomes a star"],
    answer: 0,
  },
  {
    id: "extra-puddle",
    prompt: "A puddle can vanish on a warm day because the water",
    choices: ["Becomes a gas", "Turns into rock", "Is always drunk by frogs", "Is taken by the Moon"],
    answer: 0,
  },
  {
    id: "extra-shadow",
    prompt: "A shadow forms when",
    choices: ["Something blocks the light", "Light has no source at all", "Sound piles up", "A magnet decides"],
    answer: 0,
  },
  {
    id: "extra-mirror",
    prompt: "A mirror sends light back. That bounce is called",
    choices: ["Reflection", "Rust", "A fossil", "A tide"],
    answer: 0,
  },
  {
    id: "extra-circuit",
    prompt: "What does a simple circuit need so a bulb can light?",
    choices: ["A closed path for the electricity", "A gap that stops the path", "Only a wooden stick", "A cup of sand"],
    answer: 0,
  },
  {
    id: "extra-rubber",
    prompt: "Rubber does not let electricity pass easily. Rubber is",
    choices: ["An insulator", "A metal path", "A magnet pole", "A kind of bone"],
    answer: 0,
  },
  {
    id: "extra-copper",
    prompt: "Copper lets electricity pass. Copper is",
    choices: ["A conductor", "An insulator like rubber", "A gas in the room", "A moon"],
    answer: 0,
  },
  {
    id: "extra-compass",
    prompt: "A compass needle points roughly",
    choices: ["North", "At your shoes", "At the nearest cactus", "Straight into a fossil"],
    answer: 0,
  },
  {
    id: "extra-closest",
    prompt: "The Sun is the closest what to Earth?",
    choices: ["Star", "Ocean", "Bone", "City"],
    answer: 0,
  },
  {
    id: "extra-moon-trip",
    prompt: "The Moon goes around",
    choices: ["Earth", "A classroom magnet", "Your heart", "A single bee"],
    answer: 0,
  },
  {
    id: "extra-drop",
    prompt: "If air does not push much, a heavy ball and a light ball dropped together",
    choices: ["Fall at nearly the same rate", "Always fall at totally different rates", "Float up", "Turn into glass"],
    answer: 0,
  },
  {
    id: "extra-feather",
    prompt: "A feather falls slowly because",
    choices: ["Air pushes on it", "Gravity is switched off", "It has no mass", "It is a planet"],
    answer: 0,
  },
  {
    id: "extra-unit",
    prompt: "A careful measurement needs a number and",
    choices: ["A unit", "A wish", "A new answer each time you hope", "No tool"],
    answer: 0,
  },
  {
    id: "extra-repeat",
    prompt: "Why do a fair test more than once?",
    choices: ["To see if the result happens again", "To change everything each time", "To skip measuring", "To pick the answer first"],
    answer: 0,
  },
  {
    id: "extra-cm",
    prompt: "Which one is a unit of length?",
    choices: ["Centimeter", "Tuesday", "Blue", "Loud"],
    answer: 0,
  },
  {
    id: "extra-thermo",
    prompt: "A thermometer measures",
    choices: ["Temperature", "How loud a frog is", "The name of a star", "How many bones you have"],
    answer: 0,
  },
  {
    id: "extra-balance",
    prompt: "A balance is used to compare",
    choices: ["How heavy two things are", "The color of the sky", "Sound in empty space", "Moon phases"],
    answer: 0,
  },
  {
    id: "extra-cup",
    prompt: "A measuring cup tells you",
    choices: ["How much space a liquid fills", "The color of gold", "The age of a fossil", "A magnet's thoughts"],
    answer: 0,
  },
  {
    id: "extra-wilt",
    prompt: "A plant wilts when it cannot get",
    choices: ["Enough water", "Extra moonlight only", "A bar magnet", "A telescope"],
    answer: 0,
  },
  {
    id: "extra-stone",
    prompt: "A stone will not grow into a plant because",
    choices: ["It is not a seed", "It is too green", "It is a baby tree", "It has leaves already"],
    answer: 0,
  },
  {
    id: "extra-habitat",
    prompt: "A habitat is",
    choices: ["The place a living thing needs", "A kind of metal", "A moon phase", "A lever"],
    answer: 0,
  },
  {
    id: "extra-chain",
    prompt: "A food chain shows",
    choices: ["Who eats whom", "How glass is said to drip", "Only the names of the planets", "How magnets think"],
    answer: 0,
  },
  {
    id: "extra-rot",
    prompt: "Fungi and some tiny living things",
    choices: ["Help break dead things down", "Make sunlight", "Are planets", "Are bar magnets"],
    answer: 0,
  },
  {
    id: "extra-hide",
    prompt: "Camouflage helps an animal",
    choices: ["Hide", "Boil water", "Rust like iron", "Orbit Saturn"],
    answer: 0,
  },
  {
    id: "extra-migrate",
    prompt: "Some birds fly a long way when the seasons change. That trip is called",
    choices: ["Migration", "Rust", "A fossil", "A lever"],
    answer: 0,
  },
  {
    id: "extra-sleep",
    prompt: "Some animals spend the cold months in a deep rest. That rest is called",
    choices: ["Hibernation", "Boiling", "A moon phase", "Glass making"],
    answer: 0,
  },
  {
    id: "extra-skull",
    prompt: "Your skull helps",
    choices: ["Protect your brain", "Pump blood", "Make sunlight", "Store rust"],
    answer: 0,
  },
  {
    id: "extra-elbow",
    prompt: "Your elbow bends at a",
    choices: ["Joint", "Magnet pole", "Fossil cliff", "Galaxy"],
    answer: 0,
  },
  {
    id: "extra-teeth",
    prompt: "Teeth help you",
    choices: ["Cut and crush food", "Pump blood", "See in the dark", "Make the tides"],
    answer: 0,
  },
  {
    id: "extra-sweat",
    prompt: "Sweating helps your body",
    choices: ["Cool down", "Turn into ice at once", "Make gold", "Grow a second heart"],
    answer: 0,
  },
  {
    id: "extra-mercury-planet",
    prompt: "Which planet is closest to the Sun?",
    choices: ["Mercury", "Neptune", "Saturn", "Earth"],
    answer: 0,
  },
  {
    id: "extra-third",
    prompt: "Counting out from the Sun, Earth is",
    choices: ["The third", "The first", "The eighth", "A moon of Jupiter"],
    answer: 0,
  },
  {
    id: "extra-giant",
    prompt: "Jupiter is mostly",
    choices: ["Gas, with no solid ground to stand on", "Solid iron all the way through", "Bone", "Liquid wood"],
    answer: 0,
  },
  {
    id: "extra-asteroid",
    prompt: "An asteroid is",
    choices: ["A rocky or metal body that orbits the Sun", "A kind of whale", "A cloud that tastes of salt", "A baby tree"],
    answer: 0,
  },
  {
    id: "extra-stars",
    prompt: "A constellation is",
    choices: ["A pattern people picture in the stars", "A bone in the foot", "A type of salt", "A closed circuit"],
    answer: 0,
  },
  {
    id: "extra-fact",
    prompt: "A measured fact is an idea we",
    choices: ["Have checked with a test", "Only hope is true", "Cannot test", "Invented this morning"],
    answer: 0,
  },
  {
    id: "extra-theory",
    prompt: "A theory in science is",
    choices: ["A big idea that keeps passing tests", "A wild guess with no tests", "A kind of rock", "A unit of length"],
    answer: 0,
  },
  {
    id: "extra-control",
    prompt: "In a fair test, the things you keep the same are",
    choices: ["Controls", "The answer you wanted first", "Every change at once", "Optional, so you can skip them"],
    answer: 0,
  },
  {
    id: "extra-sprout",
    prompt: "A seed can sprout in the dark, but the young plant cannot keep making food without",
    choices: ["Light", "A loud drum", "A magnet", "A fossil"],
    answer: 0,
  },
  {
    id: "extra-battery",
    prompt: "A battery can push",
    choices: ["An electric current", "The Moon's phases", "A fossil cliff", "The tides by itself"],
    answer: 0,
  },
];

export function allQuestions(): QuizQuestion[] {
  const out: QuizQuestion[] = [];
  for (const fact of FACTS) {
    fact.quiz.forEach((item, index) => {
      out.push({ ...item, id: `${fact.slug}-${index}` });
    });
  }
  for (const person of PEOPLE) {
    out.push({ ...person.quiz, id: `person-${person.slug}` });
  }
  out.push(...EXTRA);
  return out;
}

export function drawQuestions(count: number): QuizQuestion[] {
  const all = allQuestions();
  for (let i = all.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const swap = all[i];
    all[i] = all[j] as QuizQuestion;
    all[j] = swap as QuizQuestion;
  }
  return all.slice(0, count);
}
