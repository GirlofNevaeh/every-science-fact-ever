import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { KID_LOOKS, Portrait } from "@/components/portrait";
import { Shell } from "@/components/shell";
import { drawQuestions, type QuizQuestion } from "@/data/quiz";
import { localizeQuestion, useI18n, usePageTitle } from "@/i18n";
import type { Lang } from "@/i18n/langs";

export const Route = createFileRoute("/quiz")({
  head: () => ({ meta: [{ title: "Quiz · Every Science Fact Ever" }] }),
  component: QuizPage,
});

type Team = { name: string; score: number };
type Phase = "setup" | "ask" | "wait" | "reveal" | "win" | "draw";
type Order = [number, number, number, number];
type Drawn = QuizQuestion & { order: Order };

function mixOrder(): Order {
  const order: Order = [0, 1, 2, 3];
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const swap = order[i];
    order[i] = order[j];
    order[j] = swap;
  }
  return order;
}

function showQuestion(question: Drawn, lang: Lang): QuizQuestion {
  const localized = localizeQuestion(question, lang);
  const choices = question.order.map((index) => localized.choices[index]) as QuizQuestion["choices"];
  const answer = question.order.indexOf(localized.answer) as 0 | 1 | 2 | 3;
  return { ...localized, choices, answer };
}

function QuizPage() {
  return (
    <Shell>
      <QuizBody />
    </Shell>
  );
}

function QuizBody() {
  const { t, lang } = useI18n();
  usePageTitle(t("quiz"));
  const [mode, setMode] = useState<"quick" | "mega">("quick");
  const [play, setPlay] = useState<"solo" | "teams">("solo");
  const [count, setCount] = useState(2);
  const [names, setNames] = useState(() => Array.from({ length: 10 }, () => ""));
  const [phase, setPhase] = useState<Phase>("setup");
  const [queue, setQueue] = useState<Drawn[]>([]);
  const [cursor, setCursor] = useState(0);
  const [teams, setTeams] = useState<Team[]>([]);
  const [active, setActive] = useState<number[]>([]);
  const [turn, setTurn] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [limit, setLimit] = useState(10);
  const [answered, setAnswered] = useState(0);
  const [sudden, setSudden] = useState(false);
  const [clean, setClean] = useState(0);
  const [roundHits, setRoundHits] = useState<boolean[]>([]);

  useEffect(() => {
    if (phase !== "wait") return;
    const id = window.setTimeout(() => setPhase("reveal"), 1000);
    return () => window.clearTimeout(id);
  }, [phase, cursor, picked]);

  function start() {
    const size = play === "solo" ? 1 : count;
    const nextTeams =
      play === "solo"
        ? [{ name: t("you"), score: 0 }]
        : names.slice(0, size).map((name, index) => ({ name: name.trim() || t("teamN", { n: index + 1 }), score: 0 }));
    setTeams(nextTeams);
    setActive(nextTeams.map((_, index) => index));
    setQueue(drawQuestions(250).map((item) => ({ ...item, order: mixOrder() })));
    setCursor(0);
    setTurn(0);
    setPicked(null);
    setLimit(mode === "quick" ? 10 : 25);
    setAnswered(0);
    setSudden(false);
    setClean(0);
    setRoundHits([]);
    setPhase("ask");
  }

  const question = queue[cursor];
  const shown = question ? showQuestion(question, lang) : undefined;
  const teamIndex = active[turn] ?? 0;
  const correct = shown ? picked === shown.answer : false;

  function choose(choice: number) {
    if (phase !== "ask") return;
    setPicked(choice);
    setPhase("wait");
  }

  function leadersOf(list: Team[]): number[] {
    const top = Math.max(...list.map((team) => team.score));
    return list.map((team, index) => (team.score === top ? index : -1)).filter((index) => index >= 0);
  }

  function next() {
    if (!question || picked === null) return;
    const gained = shown ? picked === shown.answer : false;
    const nextTeams = teams.map((team, index) =>
      index === teamIndex && gained ? { ...team, score: team.score + 1 } : team,
    );
    const nextCursor = cursor + 1;
    if (!sudden) {
      const nextAnswered = answered + 1;
      if (nextAnswered >= limit) {
        const leaders = leadersOf(nextTeams);
        setTeams(nextTeams);
        setCursor(nextCursor);
        setAnswered(nextAnswered);
        if (leaders.length <= 1) {
          setPhase("win");
          return;
        }
        setSudden(true);
        setActive(leaders);
        setTurn(0);
        setClean(0);
        setRoundHits([]);
        setPicked(null);
        setPhase("ask");
        return;
      }
      setTeams(nextTeams);
      setCursor(nextCursor);
      setAnswered(nextAnswered);
      setTurn((turn + 1) % teams.length);
      setPicked(null);
      setPhase("ask");
      return;
    }
    const hits = [...roundHits, gained];
    if (hits.length < active.length) {
      setTeams(nextTeams);
      setCursor(nextCursor);
      setRoundHits(hits);
      setTurn(turn + 1);
      setPicked(null);
      setPhase("ask");
      return;
    }
    const allSame = hits.every(Boolean) || hits.every((hit) => !hit);
    const nextClean = allSame ? clean + 1 : 0;
    setTeams(nextTeams);
    setCursor(nextCursor);
    if (allSame && nextClean >= 3) {
      setPhase("draw");
      return;
    }
    const leaders = leadersOf(nextTeams);
    if (leaders.length <= 1) {
      setPhase("win");
      return;
    }
    setActive(leaders);
    setClean(nextClean);
    setRoundHits([]);
    setTurn(0);
    setPicked(null);
    setPhase("ask");
  }

  const winner = teams.length > 0 ? teams[leadersOf(teams)[0] ?? 0] : undefined;
  const showCongrats = phase === "win" && (teams.length > 1 || (winner?.score ?? 0) > 0);

  return (
    <div className="bg-leaf-soft">
      <div className="mx-auto max-w-3xl px-4 py-6">
        {phase === "setup" ? (
          <div>
            <h1 className="font-display text-4xl font-bold">{t("quizTitle")}</h1>
            <p className="mt-2 text-lg">{t("quizLead")}</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button type="button" className={mode === "quick" ? "btn btn-chalk" : "btn btn-paper"} onClick={() => setMode("quick")}>
                {t("quick")}
              </button>
              <button type="button" className={mode === "mega" ? "btn btn-chalk" : "btn btn-paper"} onClick={() => setMode("mega")}>
                {t("mega")}
              </button>
              <button type="button" className={play === "solo" ? "btn btn-leaf" : "btn btn-paper"} onClick={() => setPlay("solo")}>
                {t("soloPlay")}
              </button>
              <button type="button" className={play === "teams" ? "btn btn-leaf" : "btn btn-paper"} onClick={() => setPlay("teams")}>
                {t("teamsPlay")}
              </button>
            </div>
            {play === "teams" ? (
              <div className="stamp mt-4 bg-paper p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-extrabold">{t("teamsN", { n: count })}</p>
                  <div className="flex gap-2">
                    <button type="button" className="btn btn-paper" onClick={() => setCount((n) => Math.max(2, n - 1))}>
                      {t("fewer")}
                    </button>
                    <button type="button" className="btn btn-paper" onClick={() => setCount((n) => Math.min(10, n + 1))}>
                      {t("moreBtn")}
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-base">{t("eachTeam")}</p>
                <div className="mt-3 grid gap-2">
                  {names.slice(0, count).map((name, index) => (
                    <label key={index} className="block text-base font-extrabold">
                      {t("teamN", { n: index + 1 })}
                      <input
                        value={name}
                        placeholder={t("teamN", { n: index + 1 })}
                        onChange={(event) =>
                          setNames((prev) => prev.map((item, i) => (i === index ? event.target.value : item)))
                        }
                        className="mt-1 h-11 w-full rounded-full border-[3px] border-ink px-3 font-medium"
                      />
                    </label>
                  ))}
                </div>
              </div>
            ) : null}
            <button type="button" className="btn btn-chalk mt-4 w-full" onClick={start}>
              {t("start")}
            </button>
            <a className="btn btn-paper mt-3 w-full" href={`/quiz/quiz-${lang === "en-US" ? "en" : lang}.pdf`} download>
              {t("quizPdf")}
            </a>
            <ul className="mt-4 space-y-1 text-base">
              <li>{t("rule1")}</li>
              <li>{t("rule2")}</li>
              <li>{t("rule3")}</li>
            </ul>
          </div>
        ) : null}

        {phase !== "setup" && phase !== "win" && phase !== "draw" && question ? (
          <div>
            <div className="flex flex-wrap gap-2">
              {teams.map((team, index) => (
                <p
                  key={team.name + index}
                  className={`rounded-full border-2 border-ink px-3 py-1 text-sm font-extrabold ${
                    index === teamIndex ? "bg-chalk" : "bg-paper"
                  }`}
                >
                  {team.name}: {team.score + (phase === "reveal" && index === teamIndex && correct ? 1 : 0)}
                </p>
              ))}
            </div>
            <p className="mt-4 text-sm font-extrabold uppercase">
              {sudden ? t("playoff") : t("questionN", { n: answered + 1, total: limit })}
            </p>
            <div className="stamp mt-3 bg-paper p-4">
              <div className="flex items-center gap-3">
                <Portrait look={KID_LOOKS[cursor % KID_LOOKS.length] ?? KID_LOOKS[0]!} className="h-20 w-20 shrink-0" />
                <div>
                  <p className="font-extrabold">{teams[teamIndex]?.name}</p>
                  <h1 className="font-display text-2xl leading-tight font-bold">{shown?.prompt}</h1>
                </div>
              </div>
              <div className="mt-4 grid gap-2">
                {shown?.choices.map((choice, index) => {
                  const chosen = picked === index;
                  const reveal = phase === "reveal";
                  const isAnswer = index === shown.answer;
                  let tone = "btn-paper";
                  let note = "";
                  if (phase === "wait" && chosen) {
                    tone = "btn-chalk";
                    note = t("picked");
                  }
                  if (reveal && isAnswer) {
                    tone = "btn-leaf";
                    note = t("yes");
                  } else if (reveal && chosen && !isAnswer) {
                    tone = "btn-chalk";
                    note = t("notThis");
                  }
                  return (
                    <button
                      key={`${cursor}-${index}`}
                      type="button"
                      className={`btn ${tone} w-full justify-between text-left whitespace-normal`}
                      disabled={phase !== "ask"}
                      onClick={() => choose(index)}
                    >
                      <span>{choice}</span>
                      {note ? <span className="ml-3 shrink-0">{note}</span> : null}
                    </button>
                  );
                })}
              </div>
              {phase === "wait" ? <p className="mt-3 font-extrabold">{t("hold")}</p> : null}
              {phase === "reveal" ? (
                <button type="button" className="btn btn-cobalt mt-4 w-full" onClick={next}>
                  {t("next")}
                </button>
              ) : null}
            </div>
          </div>
        ) : null}

        {phase === "win" ? (
          <div className="stamp bg-chalk p-6 text-center">
            {showCongrats ? (
              <p className="font-display text-4xl font-bold sm:text-5xl">{t("congrats")}</p>
            ) : (
              <p className="font-display text-4xl font-bold">{t("finished")}</p>
            )}
            <p className="mt-3 text-2xl font-extrabold">{winner?.name}</p>
            <ul className="mt-4 space-y-1 text-lg">
              {teams.map((team) => (
                <li key={team.name}>
                  {team.name}: {team.score}
                </li>
              ))}
            </ul>
            <button type="button" className="btn btn-paper mt-5" onClick={() => setPhase("setup")}>
              {t("again")}
            </button>
          </div>
        ) : null}

        {phase === "draw" ? (
          <div className="stamp bg-paper p-6 text-center">
            <h2 className="font-display text-4xl font-bold">{t("draw")}</h2>
            <p className="mt-2 text-lg">{t("drawWhy")}</p>
            <ul className="mt-4 space-y-1 text-lg">
              {teams.map((team) => (
                <li key={team.name}>
                  {team.name}: {team.score}
                </li>
              ))}
            </ul>
            <button type="button" className="btn btn-chalk mt-5" onClick={() => setPhase("setup")}>
              {t("again")}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
