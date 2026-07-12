export const API_BASE_URL = "https://adaptive-engine-production-bfa6.up.railway.app";
export const GITHUB_URL = "https://github.com/opyjo/adaptive-engine";

export const healthSnippet = `curl ${API_BASE_URL}/health/live`;

export const putItemSnippet = `curl -X PUT ${API_BASE_URL}/v1/items/math-g4-fractions-001 \\
  -H "Authorization: Bearer $ADAPTIVE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "skill": "mathematics:g4:number:fractions",
    "difficulty": 3,
    "gradeBand": "grade-4",
    "tags": ["mathematics", "fractions"]
  }'`;

export const nextItemSnippet = `curl "${API_BASE_URL}/v1/learners/learner-8f21/next-item?gradeBand=grade-4" \\
  -H "Authorization: Bearer $ADAPTIVE_API_KEY"`;

export const postEventSnippet = `curl -X POST ${API_BASE_URL}/v1/learners/learner-8f21/events \\
  -H "Authorization: Bearer $ADAPTIVE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "idempotencyKey": "attempt-01JABC123",
    "itemId": "math-g4-fractions-001",
    "correct": true
  }'`;

export const typescriptClientSnippet = `type NextItem = {
  decisionId: string;
  itemId: string;
  skill: string;
  reason: "weakest-skill" | "scaffold" | "spiral-review" | "fallback";
  algorithmVersion: string;
};

export class AdaptiveEngineClient {
  constructor(
    private readonly apiKey: string,
    private readonly baseUrl = "${API_BASE_URL}",
  ) {}

  async nextItem(learnerId: string, gradeBand?: string): Promise<NextItem> {
    const query = new URLSearchParams();
    if (gradeBand) query.set("gradeBand", gradeBand);

    const response = await fetch(
      \`\${this.baseUrl}/v1/learners/\${encodeURIComponent(learnerId)}/next-item?\${query}\`,
      { headers: { Authorization: \`Bearer \${this.apiKey}\` } },
    );

    if (!response.ok) throw new Error(\`Adaptive Engine returned \${response.status}\`);
    return response.json() as Promise<NextItem>;
  }
}`;
