import { json } from "./_shared.mjs";

export default async () => json({
  ok: true,
  app: "aqua-fpl-advisor",
  functions: true,
  fplApi: "https://fantasy.premierleague.com/api/",
  identityRequiredForAdvisor: true,
  chatgptAdvisor: Boolean(process.env.OPENAI_API_KEY),
  advisorModes: {
    quick: {
      label: "Tư vấn nhanh",
      model: process.env.OPENAI_FAST_MODEL || "gpt-5.6-luna",
      reasoningEffort: "low",
    },
    deep: {
      label: "Phân tích chuyên sâu",
      model: process.env.OPENAI_DEEP_MODEL || "gpt-5.6-terra",
      reasoningEffort: "medium",
    },
  },
});
