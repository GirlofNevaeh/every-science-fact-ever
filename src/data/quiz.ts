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
    prompt: "Strong tests that germs can cause illness grew in which years?",
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
    prompt: "The twisted-ladder model of DNA was shown in",
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
