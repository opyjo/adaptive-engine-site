"use client";

import { useState } from "react";

const concepts = [
  { name: "Whole numbers", value: 91, state: "strong" },
  { name: "Equivalent fractions", value: 78, state: "ready" },
  { name: "Compare fractions", value: 54, state: "focus" },
  { name: "Decimal tenths", value: 36, state: "later" },
];

export function AdaptiveDemo() {
  const [diagnostic, setDiagnostic] = useState(false);
  const [confidence, setConfidence] = useState(86);

  function adapt() {
    setDiagnostic(true);
    setConfidence((value) => value === 92 ? 86 : 92);
  }

  return (
    <div className="ae-engine-visual" aria-label="Interactive learner model preview">
      <div className="ae-visual-top"><span><i /> Learner model</span><small>ONT-MATH-2020 · GRADE 4</small></div>
      <div className="ae-visual-profile"><div><span>LP</span></div><p><small>PSEUDONYMOUS LEARNER</small><strong>learner_ca_0248</strong></p><b>LIVE</b></div>
      <div className="ae-visual-main">
        <div className="ae-knowledge-map">
          <div className="ae-map-head"><span>Knowledge map</span><small>4 concepts in scope</small></div>
          {concepts.map((concept, index) => <button type="button" onClick={adapt} className={`ae-concept-row ${concept.state}`} key={concept.name}><i>{index + 1}</i><span>{concept.name}<small>{concept.state === "focus" ? "Prerequisite gap detected" : "Concept mastery"}</small></span><b>{diagnostic && concept.state === "focus" ? 61 : concept.value}%</b></button>)}
        </div>
        <div className="ae-next-action"><small>NEXT BEST ACTION</small><div><span>↳</span><p><strong>{diagnostic ? "Targeted remediation" : "Diagnostic check"}</strong><small>{diagnostic ? "Equivalent fractions · visual model" : "Compare fractions · difficulty 2/5"}</small></p></div><footer><span>CONFIDENCE <b>{confidence}%</b></span><button type="button" onClick={adapt}>{diagnostic ? "Re-evaluate" : "Simulate event"} →</button></footer></div>
      </div>
      <div className="ae-visual-foot"><span><i /> Recommendation explained</span><span>model_ca_bkt_0.4</span></div>
    </div>
  );
}
