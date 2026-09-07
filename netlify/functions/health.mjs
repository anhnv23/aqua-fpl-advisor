import { json } from "./_shared.mjs";

export default async () => json({
  ok: true,
  app: "aqua-fpl-advisor",
  functions: true,
  fplApi: "https://fantasy.premierleague.com/api/",
  chatgptAdvisor: Boolean(process.env.OPENAI_API_KEY),
});
