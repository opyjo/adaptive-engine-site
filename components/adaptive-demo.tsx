"use client";

import { useState } from "react";

type Event = { label: string; outcome: "correct" | "incorrect"; mastery: number };

function nextMastery(current: number, correct: boolean, difficulty = 2) {
  const outcome = correct ? 1 : 0;
  const weight = correct ? 1 + 0.2 * (difficulty - 3) : 1 - 0.2 * (difficulty - 3);
  return Math.max(0, Math.min(1, current + 0.15 * weight * (outcome - current)));
}

export function AdaptiveDemo() {
  const [mastery, setMastery] = useState(0.5);
  const [wrong, setWrong] = useState(0);
  const [events, setEvents] = useState<Event[]>([]);

  function answer(correct: boolean) {
    const updated = nextMastery(mastery, correct);
    setMastery(updated);
    setWrong(correct ? 0 : wrong + 1);
    setEvents((current) => [...current.slice(-2), { label: `Attempt ${current.length + 1}`, outcome: correct ? "correct" : "incorrect", mastery: updated }]);
  }

  function reset() {
    setMastery(0.5); setWrong(0); setEvents([]);
  }

  const scaffold = wrong >= 2;
  const reason = scaffold ? "scaffold" : mastery < 0.8 ? "weakest-skill" : "spiral-review";
  const difficulty = scaffold ? 1 : mastery < 0.55 ? 2 : mastery < 0.8 ? 3 : 4;

  return (
    <div className="demo-card">
      <div className="demo-topbar"><span><i /> Live policy simulation</span><button onClick={reset}>Reset</button></div>
      <div className="demo-learner">
        <div className="demo-avatar">A</div>
        <div><small>Opaque learner</small><strong>learner_8f21</strong></div>
        <span className="demo-grade">Grade 4 · Mathematics</span>
      </div>
      <div className="demo-skill">
        <div><small>Current skill</small><strong>Division facts</strong></div>
        <div className="mastery-value"><small>Mastery</small><strong>{mastery.toFixed(2)}</strong></div>
      </div>
      <div className="mastery-track"><span style={{ width: `${mastery * 100}%` }} /></div>
      <div className="demo-decision">
        <div><span>Next item</span><strong>{scaffold ? "division-easy-012" : "division-practice-027"}</strong></div>
        <div><span>Difficulty</span><strong>{difficulty} / 5</strong></div>
        <div><span>Reason</span><strong className={scaffold ? "alert" : ""}>{reason}</strong></div>
      </div>
      {events.length > 0 && <div className="demo-events">{events.map((event, index) => <span key={`${event.label}-${index}`} className={event.outcome}>{event.outcome === "correct" ? "✓" : "×"} {event.mastery.toFixed(2)}</span>)}</div>}
      <div className="demo-actions"><button onClick={() => answer(false)}>Simulate incorrect</button><button onClick={() => answer(true)}>Simulate correct</button></div>
      <p>Try two incorrect answers. The engine stays on the same skill and lowers difficulty to rebuild confidence.</p>
    </div>
  );
}
