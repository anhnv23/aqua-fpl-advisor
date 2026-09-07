import { json } from "./_shared.mjs";

const FPL_API = "https://fantasy.premierleague.com/api/";

function numericId(value) {
  const id = String(value ?? "").trim();
  return /^\d+$/.test(id) ? id : "";
}

async function fplFetch(path) {
  const endpoint = new URL(String(path || "").replace(/^\/+/, ""), FPL_API);
  const response = await fetch(endpoint, {
    headers: {
      accept: "application/json",
      "user-agent": "Aqua-FPL-Advisor/1.0",
    },
  });
  if (!response.ok) throw new Error(`FPL API HTTP ${response.status}`);
  return response.json();
}

function compactTeam(team) {
  if (!team) return null;
  const code = Number(team.code) || null;
  return {
    id: Number(team.id),
    name: String(team.name || ""),
    shortName: String(team.short_name || ""),
    code,
    badgeUrl: code ? `https://resources.premierleague.com/premierleague/badges/100/t${code}.png` : null,
    strength: Number(team.strength) || null,
  };
}

function compactElement(element, teamsById, typesById) {
  if (!element) return null;
  const team = teamsById.get(Number(element.team));
  const type = typesById.get(Number(element.element_type));
  return {
    id: Number(element.id),
    code: Number(element.code) || null,
    webName: String(element.web_name || ""),
    firstName: String(element.first_name || ""),
    secondName: String(element.second_name || ""),
    team: compactTeam(team),
    elementType: Number(element.element_type) || null,
    position: String(type?.singular_name_short || type?.singular_name || ""),
    nowCost: Number(element.now_cost) || 0,
    canSelect: element.can_select !== false && element.can_transact !== false,
    totalPoints: Number(element.total_points) || 0,
    eventPoints: Number(element.event_points) || 0,
    pointsPerGame: element.points_per_game ?? null,
    epNext: element.ep_next ?? null,
    epThis: element.ep_this ?? null,
    form: element.form ?? null,
    selectedByPercent: element.selected_by_percent ?? null,
    minutes: Number(element.minutes) || 0,
    goalsScored: Number(element.goals_scored) || 0,
    assists: Number(element.assists) || 0,
    cleanSheets: Number(element.clean_sheets) || 0,
    goalsConceded: Number(element.goals_conceded) || 0,
    saves: Number(element.saves) || 0,
    yellowCards: Number(element.yellow_cards) || 0,
    redCards: Number(element.red_cards) || 0,
    bonus: Number(element.bonus) || 0,
    bps: Number(element.bps) || 0,
    influence: element.influence ?? null,
    creativity: element.creativity ?? null,
    threat: element.threat ?? null,
    ictIndex: element.ict_index ?? null,
    expectedGoals: element.expected_goals ?? null,
    expectedAssists: element.expected_assists ?? null,
    expectedGoalInvolvements: element.expected_goal_involvements ?? null,
    expectedGoalsConceded: element.expected_goals_conceded ?? null,
    defensiveContribution: Number(element.defensive_contribution) || 0,
    transfersIn: Number(element.transfers_in) || 0,
    transfersOut: Number(element.transfers_out) || 0,
    transfersInEvent: Number(element.transfers_in_event) || 0,
    transfersOutEvent: Number(element.transfers_out_event) || 0,
    costChangeEvent: Number(element.cost_change_event) || 0,
    costChangeStart: Number(element.cost_change_start) || 0,
    chanceNextRound: element.chance_of_playing_next_round,
    chanceThisRound: element.chance_of_playing_this_round,
    status: String(element.status || ""),
    news: String(element.news || ""),
    newsAdded: element.news_added || null,
  };
}

function number(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function fixtureMap(fixtures, teamsById, fromEvent, toEvent) {
  const byTeam = new Map();
  for (const fixture of Array.isArray(fixtures) ? fixtures : []) {
    const event = Number(fixture.event);
    if (!Number.isInteger(event) || event < fromEvent || event > toEvent) continue;
    const homeId = Number(fixture.team_h);
    const awayId = Number(fixture.team_a);
    const home = compactTeam(teamsById.get(homeId));
    const away = compactTeam(teamsById.get(awayId));
    const push = (teamId, row) => byTeam.set(teamId, [...(byTeam.get(teamId) || []), row]);
    push(homeId, {
      event,
      home: true,
      opponent: away,
      difficulty: Number(fixture.team_h_difficulty) || null,
      kickoffTime: fixture.kickoff_time || null,
    });
    push(awayId, {
      event,
      home: false,
      opponent: home,
      difficulty: Number(fixture.team_a_difficulty) || null,
      kickoffTime: fixture.kickoff_time || null,
    });
  }
  for (const rows of byTeam.values()) rows.sort((a, b) => a.event - b.event);
  return byTeam;
}

function availabilityRisk(player) {
  const chance = player.chanceNextRound;
  if (chance !== null && chance !== undefined && Number(chance) <= 25) return 6;
  if (chance !== null && chance !== undefined && Number(chance) <= 75) return 3.5;
  if (player.status && player.status !== "a") return 3;
  return 0;
}

function projectedScore(player, fixtures) {
  const base = number(player.epNext) * 0.45 + number(player.form) * 0.32 + number(player.pointsPerGame) * 0.23;
  const schedule = (fixtures || []).reduce((sum, fixture) => {
    const difficulty = number(fixture.difficulty, 3);
    return sum + Math.max(0.65, 1.22 - (difficulty - 2) * 0.14) + (fixture.home ? 0.08 : 0);
  }, 0);
  return Math.max(0, base * Math.max(1, schedule) - availabilityRisk(player));
}

function freeTransferEstimate(currentRows, chips, maxFreeTransfers) {
  let available = 1;
  const chipEvents = new Map((Array.isArray(chips) ? chips : []).map((chip) => [Number(chip.event), String(chip.name || "")]));
  const rows = [...(Array.isArray(currentRows) ? currentRows : [])].sort((a, b) => Number(a.event) - Number(b.event));
  for (const row of rows) {
    const event = Number(row.event);
    if (event <= 1) continue;
    const chip = chipEvents.get(event);
    if (chip !== "wildcard" && chip !== "freehit") {
      available = Math.max(0, available - (Number(row.event_transfers) || 0));
    }
    available = Math.min(maxFreeTransfers, available + 1);
  }
  return available;
}

function directFreeTransfers(...sources) {
  for (const source of sources) {
    if (!source || typeof source !== "object") continue;
    const directKeys = ["free_transfers", "freeTransfers", "transfers_remaining"];
    for (const key of directKeys) {
      const value = Number(source[key]);
      if (Number.isInteger(value) && value >= 0) return value;
    }
    const transfers = source.transfers;
    if (transfers && typeof transfers === "object") {
      const remaining = Number(transfers.remaining ?? transfers.free);
      if (Number.isInteger(remaining) && remaining >= 0) return remaining;
      const limit = Number(transfers.limit);
      const made = Number(transfers.made);
      if (Number.isInteger(limit) && Number.isInteger(made) && limit >= made) return limit - made;
    }
  }
  return null;
}

function buildSquadNews(squad, allPlayers) {
  const ownedNews = squad
    .filter((pick) => pick.player?.news || availabilityRisk(pick.player || {}) > 0)
    .map((pick) => {
      const player = pick.player;
      const chance = player.chanceNextRound;
      const severe = chance !== null && chance !== undefined && Number(chance) <= 25;
      return {
        id: `owned-${player.id}`,
        type: "availability",
        severity: severe ? "high" : "medium",
        isOwned: true,
        playerId: player.id,
        headline: `${player.webName}: ${chance === null || chance === undefined ? "cần theo dõi" : `${chance}% khả năng ra sân`}`,
        detail: player.news || "Trạng thái thi đấu trên FPL chưa ở mức sẵn sàng hoàn toàn.",
        updatedAt: player.newsAdded,
      };
    });
  const ownedMarket = squad
    .map((pick) => pick.player)
    .filter(Boolean)
    .sort((a, b) => (b.transfersOutEvent - b.transfersInEvent) - (a.transfersOutEvent - a.transfersInEvent))
    .filter((player) => player.transfersOutEvent > player.transfersInEvent && player.transfersOutEvent > 5000)
    .slice(0, 3)
    .map((player) => ({
      id: `market-owned-${player.id}`,
      type: "market",
      severity: "medium",
      isOwned: true,
      playerId: player.id,
      headline: `${player.webName} đang bị bán ròng mạnh`,
      detail: `${player.transfersOutEvent.toLocaleString("en-GB")} lượt bán ra trong Gameweek, so với ${player.transfersInEvent.toLocaleString("en-GB")} lượt mua vào.`,
      updatedAt: null,
    }));
  const marketLeaders = [...allPlayers]
    .filter((player) => player.canSelect && player.status === "a")
    .sort((a, b) => (b.transfersInEvent - b.transfersOutEvent) - (a.transfersInEvent - a.transfersOutEvent))
    .slice(0, 4)
    .map((player) => ({
      id: `market-${player.id}`,
      type: "transfer",
      severity: "info",
      isOwned: squad.some((pick) => Number(pick.player?.id) === Number(player.id)),
      playerId: player.id,
      headline: `${player.webName} dẫn đầu xu hướng mua vào`,
      detail: `Mua ròng ${(player.transfersInEvent - player.transfersOutEvent).toLocaleString("en-GB")} · Form ${player.form ?? "–"} · Giá £${(player.nowCost / 10).toFixed(1)}m.`,
      updatedAt: null,
    }));
  const priceChanges = [...allPlayers]
    .filter((player) => Number(player.costChangeEvent) !== 0)
    .sort((a, b) => Math.abs(Number(b.costChangeEvent)) - Math.abs(Number(a.costChangeEvent)))
    .slice(0, 8)
    .map((player) => ({
      id: `price-${player.id}`,
      type: "price",
      severity: Number(player.costChangeEvent) < 0 ? "medium" : "info",
      isOwned: squad.some((pick) => Number(pick.player?.id) === Number(player.id)),
      playerId: player.id,
      headline: `${player.webName} ${Number(player.costChangeEvent) > 0 ? "tăng" : "giảm"} giá`,
      detail: `${Number(player.costChangeEvent) > 0 ? "+" : ""}£${(Number(player.costChangeEvent) / 10).toFixed(1)}m trong Gameweek · Giá hiện tại £${(Number(player.nowCost) / 10).toFixed(1)}m.`,
      priceChange: Number(player.costChangeEvent),
      currentPrice: Number(player.nowCost),
      updatedAt: null,
    }));
  return [...ownedNews, ...priceChanges, ...ownedMarket, ...marketLeaders].slice(0, 16);
}

function transferSuggestions(squad, candidates, bank, horizon, teamLimit = 3) {
  const ownedIds = new Set(squad.map((pick) => Number(pick.player?.id)));
  const clubCounts = new Map();
  for (const pick of squad) {
    const teamId = Number(pick.player?.team?.id);
    clubCounts.set(teamId, (clubCounts.get(teamId) || 0) + 1);
  }
  const moves = [];
  for (const pick of squad) {
    const outgoing = pick.player;
    if (!outgoing) continue;
    const budget = outgoing.nowCost + bank;
    const incoming = candidates.find((candidate) => {
      if (ownedIds.has(Number(candidate.id)) || candidate.position !== outgoing.position || candidate.nowCost > budget) return false;
      const incomingClub = Number(candidate.team?.id);
      const outgoingClub = Number(outgoing.team?.id);
      return incomingClub === outgoingClub || (clubCounts.get(incomingClub) || 0) < teamLimit;
    });
    if (!incoming) continue;
    const gain = incoming.advisorScore - outgoing.advisorScore;
    if (gain < 0.7 && availabilityRisk(outgoing) === 0) continue;
    const betterFixtures = incoming.averageFdr + 0.15 < outgoing.averageFdr;
    const reasons = [];
    if (availabilityRisk(outgoing) > 0) reasons.push("giảm rủi ro ra sân");
    if (betterFixtures) reasons.push(`lịch ${horizon} GW thuận lợi hơn`);
    if (number(incoming.form) > number(outgoing.form)) reasons.push("phong độ tốt hơn");
    if (!reasons.length) reasons.push("điểm dự phóng cao hơn");
    moves.push({
      outPlayer: outgoing,
      inPlayer: incoming,
      costDelta: incoming.nowCost - outgoing.nowCost,
      bankAfter: budget - incoming.nowCost,
      projectedGain: Number(gain.toFixed(1)),
      reason: reasons.join(" · "),
      confidence: gain >= 4 || availabilityRisk(outgoing) >= 5 ? "high" : gain >= 2 ? "medium" : "watch",
    });
  }
  return moves.sort((a, b) => b.projectedGain - a.projectedGain).slice(0, 6);
}

function recentHistory(summary) {
  return [...(Array.isArray(summary?.history) ? summary.history : [])]
    .filter((row) => Number.isInteger(Number(row.round)))
    .sort((a, b) => Number(a.round) - Number(b.round))
    .slice(-5)
    .map((row) => ({
      gameweek: Number(row.round),
      points: Number(row.total_points) || 0,
      minutes: Number(row.minutes) || 0,
      home: Boolean(row.was_home),
      opponentTeamId: Number(row.opponent_team) || null,
    }));
}

function squadAnalysis(squad, horizon) {
  const players = squad.map((pick) => pick.player).filter(Boolean);
  const risky = players.filter((player) => availabilityRisk(player) > 0);
  const recentTotals = players.map((player) =>
    (player.recentPoints || []).reduce((sum, row) => sum + number(row.points), 0)
  );
  const recentTotal = recentTotals.reduce((sum, value) => sum + value, 0);
  const fixtureRows = players.flatMap((player) => player.fixtures || []);
  const averageFdr = fixtureRows.length
    ? fixtureRows.reduce((sum, fixture) => sum + number(fixture.difficulty, 3), 0) / fixtureRows.length
    : 3;
  const inForm = players.map((player, index) => ({ player, points: recentTotals[index] })).sort((a, b) => b.points - a.points).slice(0, 3);
  const priorities = players.map((player, index) => ({
    player,
    points: recentTotals[index],
    risk: availabilityRisk(player),
    score: availabilityRisk(player) * 2 + Math.max(0, number(player.averageFdr, 3) - 3) * 2 - recentTotals[index] / 8,
  })).sort((a, b) => b.score - a.score).slice(0, 3);
  const rating = Math.round(Math.max(0, Math.min(100,
    78 + Math.min(12, recentTotal / Math.max(1, players.length * 3)) - risky.length * 7 - Math.max(0, averageFdr - 3) * 12
  )));
  const verdict = risky.length >= 3
    ? "Đội hình có nhiều rủi ro ra sân; nên ưu tiên xử lý cầu thủ không chắc suất trước khi tối ưu lịch đấu."
    : averageFdr <= 2.8
      ? `Nền lịch ${horizon} Gameweek khá thuận lợi; có thể ưu tiên giữ transfer và tập trung đội trưởng.`
      : averageFdr >= 3.35
        ? `Lịch ${horizon} Gameweek tương đối khó; nên chuyển dần sang các CLB có FDR tốt hơn.`
        : "Cấu trúc đội hình cân bằng; chỉ nên chuyển nhượng khi có nâng cấp rõ về phong độ hoặc khả năng ra sân.";
  return {
    rating,
    verdict,
    metrics: { recentPoints: recentTotal, averageFdr: Number(averageFdr.toFixed(2)), availabilityRisks: risky.length },
    strengths: inForm.map(({ player, points }) => ({ playerId: player.id, player: player.webName, detail: `${points} điểm trong tối đa 5 trận gần nhất · FDR ${number(player.averageFdr, 3).toFixed(1)}` })),
    priorities: priorities.map(({ player, points, risk }) => ({
      playerId: player.id,
      player: player.webName,
      detail: risk > 0 ? `${player.chanceNextRound ?? "Chưa rõ"}% khả năng ra sân · ${player.news || "cần theo dõi"}` : `${points} điểm gần đây · FDR ${number(player.averageFdr, 3).toFixed(1)}`,
    })),
  };
}

function bootstrapMaps(bootstrap) {
  return {
    teamsById: new Map((bootstrap?.teams || []).map((team) => [Number(team.id), team])),
    typesById: new Map((bootstrap?.element_types || []).map((type) => [Number(type.id), type])),
    elementsById: new Map((bootstrap?.elements || []).map((element) => [Number(element.id), element])),
  };
}

export default async (request) => {
  if (request.method !== "POST")
    return json({ error: "Method not allowed" }, 405, { allow: "POST" });

  try {
    const body = await request.json();
    if (body.action === "advisorSnapshot") {
      const entryId = numericId(body.entryId);
      const horizon = Math.max(2, Math.min(8, Number(body.horizon) || 5));
      if (!entryId) return json({ error: "FPL ID không hợp lệ." }, 400);

      const [profile, history, transfers, bootstrap, fixtures] = await Promise.all([
        fplFetch(`entry/${entryId}/`),
        fplFetch(`entry/${entryId}/history/`),
        fplFetch(`entry/${entryId}/transfers/`).catch(() => []),
        fplFetch("bootstrap-static/"),
        fplFetch("fixtures/").catch(() => []),
      ]);
      const { teamsById, typesById, elementsById } = bootstrapMaps(bootstrap);
      const currentRows = Array.isArray(history?.current) ? history.current : [];
      const chips = Array.isArray(history?.chips) ? history.chips : [];
      const latestPublicEvent = Number(currentRows[currentRows.length - 1]?.event || profile.current_event || 0);
      const nextEvent = bootstrap.events?.find((event) => event.is_next)
        || bootstrap.events?.find((event) => Number(event.id) === latestPublicEvent + 1)
        || null;
      const nextEventId = Number(nextEvent?.id || Math.min(38, latestPublicEvent + 1 || 1));
      const publicPicksEvent = Math.max(1, Math.min(latestPublicEvent || nextEventId - 1, nextEventId));
      let currentPicks = null;
      try {
        currentPicks = await fplFetch(`entry/${entryId}/event/${publicPicksEvent}/picks/`);
      } catch (_) {
        if (publicPicksEvent > 1) currentPicks = await fplFetch(`entry/${entryId}/event/${publicPicksEvent - 1}/picks/`).catch(() => null);
      }
      if (!currentPicks?.picks?.length) {
        return json({
          error: "Đội hình chưa được FPL công khai. Hãy thử lại sau deadline Gameweek đầu tiên.",
          profile: { id: profile.id, name: profile.name },
        }, 409);
      }

      const currentPicksEvent = Number(currentPicks.entry_history?.event || publicPicksEvent);
      const currentActiveChip = String(currentPicks.active_chip || "").toLowerCase() || null;
      let advicePicks = currentPicks;
      let squadBasis = "current_public_gameweek";
      if (currentActiveChip === "freehit" && currentPicksEvent > 1) {
        const previousPicks = await fplFetch(`entry/${entryId}/event/${currentPicksEvent - 1}/picks/`).catch(() => null);
        if (previousPicks?.picks?.length) {
          advicePicks = previousPicks;
          squadBasis = "previous_gameweek_before_freehit";
        }
      }
      const advicePicksEvent = Number(advicePicks.entry_history?.event || currentPicksEvent);

      const toEvent = Math.min(38, nextEventId + horizon - 1);
      const fixturesByTeam = fixtureMap(fixtures, teamsById, nextEventId, toEvent);
      const allPlayers = [...elementsById.values()].map((element) => compactElement(element, teamsById, typesById));
      const withProjection = (player) => {
        const upcoming = fixturesByTeam.get(Number(player.team?.id)) || [];
        const fdrValues = upcoming.map((fixture) => Number(fixture.difficulty)).filter(Number.isFinite);
        return {
          ...player,
          fixtures: upcoming,
          averageFdr: fdrValues.length ? Number((fdrValues.reduce((sum, value) => sum + value, 0) / fdrValues.length).toFixed(2)) : 0,
          advisorScore: Number(projectedScore(player, upcoming).toFixed(2)),
        };
      };
      const candidatePool = allPlayers
        .map(withProjection)
        .filter((player) => player.canSelect && !player.removed)
        .sort((a, b) => b.advisorScore - a.advisorScore);
      const baseSquad = advicePicks.picks.map((pick) => ({
        ...pick,
        player: withProjection(compactElement(elementsById.get(Number(pick.element)), teamsById, typesById)),
      }));
      const elementSummaries = await Promise.all(baseSquad.map((pick) => fplFetch(`element-summary/${pick.player?.id}/`).catch(() => null)));
      const squad = baseSquad.map((pick, index) => ({ ...pick, player: { ...pick.player, recentPoints: recentHistory(elementSummaries[index]) } }));
      const bank = Number(advicePicks.entry_history?.bank ?? profile.last_deadline_bank ?? 0) || 0;
      const maxFreeTransfers = Math.max(1, Number(bootstrap.game_settings?.max_extra_free_transfers || 0) + 1);
      const squadTeamLimit = Math.max(1, Number(bootstrap.game_settings?.squad_team_limit) || 3);
      const initialSquadBudget = Math.max(0, Number(bootstrap.game_settings?.squad_total_spend) || 1000);
      const freeTransfers = directFreeTransfers(profile, currentPicks, currentPicks.entry_history, advicePicks, advicePicks.entry_history);
      const freeTransfersEstimate = freeTransferEstimate(currentRows, chips, maxFreeTransfers);
      const usedChipNames = chips.map((chip) => ({ name: chip.name, event: Number(chip.event), time: chip.time || null }));
      const enrichedTransfers = (Array.isArray(transfers) ? transfers : []).map((transfer) => ({
        ...transfer,
        elementIn: compactElement(elementsById.get(Number(transfer.element_in)), teamsById, typesById),
        elementOut: compactElement(elementsById.get(Number(transfer.element_out)), teamsById, typesById),
      }));

      return json({
        ok: true,
        syncedAt: new Date().toISOString(),
        entry: {
          id: Number(profile.id),
          managerName: `${profile.player_first_name || ""} ${profile.player_last_name || ""}`.trim(),
          teamName: String(profile.name || ""),
          yearsActive: Number(profile.years_active) || 0,
          totalPoints: Number(profile.summary_overall_points) || 0,
          overallRank: Number(profile.summary_overall_rank) || null,
          eventPoints: Number(profile.summary_event_points) || 0,
          teamValue: Number(advicePicks.entry_history?.value ?? profile.last_deadline_value) || null,
          bank,
        },
        gameweek: {
          picksEvent: advicePicksEvent,
          currentPicksEvent,
          advicePicksEvent,
          currentActiveChip,
          squadBasis,
          nextEvent: nextEventId,
          nextDeadline: nextEvent?.deadline_time || null,
          horizon,
          throughEvent: latestPublicEvent,
          freeTransfers,
          freeTransfersSource: freeTransfers === null ? "manual_required" : "fpl_api",
          freeTransfersEstimate,
          freeTransferCap: maxFreeTransfers,
          squadTeamLimit,
          initialSquadBudget,
          estimateNote: freeTransfers === null
            ? "FPL API công khai không trả số Free Transfer chính xác; hãy nhập thủ công để lập kế hoạch."
            : "Số Free Transfer được lấy trực tiếp từ dữ liệu FPL.",
        },
        chips: usedChipNames,
        history: {
          gameweeks: currentRows,
          pastSeasons: Array.isArray(history?.past) ? history.past : [],
          transfers: enrichedTransfers,
        },
        squad,
        squadAnalysis: squadAnalysis(squad, horizon),
        news: buildSquadNews(squad, candidatePool),
        market: candidatePool,
      });
    }
    return json({ error: "Action không hợp lệ." }, 400);
  } catch (error) {
    return json({ error: "Không thể lấy dữ liệu từ FPL.", detail: error.message }, 502);
  }
};
