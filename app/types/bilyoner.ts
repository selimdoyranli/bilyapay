// Match Details Types
export interface Player {
  name: string
  shirtNumber: number
  position: string
}

export interface TeamLineup {
  manager: string
  formation: string
  lineUp: Player[]
  subs: Player[]
}

export interface MatchFeed {
  feedType: 'STATUS' | 'CARD' | 'GOAL' | 'SUBS'
  display?: string
  cardType?: 'YELLOW_CARD' | 'RED_CARD'
  playerName?: string
  minute?: number
  minuteDisplay?: string
  side?: 'HOME' | 'AWAY'
  period?: string
  goalType?: 'GOAL'
  scorerName?: string
  assistPlayerName?: string
  homeScore?: number
  awayScore?: number
  playerOn?: string
  playerOff?: string
}

export interface MatchDetails {
  status: {
    code: number
    message: string
  }
  feeds: MatchFeed[]
  lineups: {
    home: TeamLineup
    away: TeamLineup
    hasFormations: boolean
  }
  matchInfo: {
    tournament: {
      name: string
    }
    matchDate: string
    referee: string
    tvInfo: string
    venue: string
    neutral: boolean
  }
  sportId: string
  eventStatus: string
  eventStatusId: string
  currentPeriod: string
  currentPeriodId: string
  homeTeamName?: string
  awayTeamName?: string
}

// Match Statistics Types
export interface Scorer {
  name: string
  goalsScored: number | string
}

export interface TopScorerSection {
  title: string
  topScorers: Scorer[]
}

export interface MatchResultStats {
  betTypeName: string
  betTypeWonTitle: string
  homeWon: string | number
  homeWonPercentage: number
  betTypeDrawTitle: string
  homeDraw: string | number
  homeDrawPercentage: number
  betTypeLostTitle: string
  homeLost?: string | number
  homeLostPercentage?: number
  awayLost?: string | number
  awayLostPercentage?: number
}

export interface BothTeamsToScoreStats {
  betTypeName: string
  betTypeYesTitle: string
  homeBothTeamsToScoreYesPercentage: number
  betTypeNoTitle: string
  homeBothTeamsToScoreNoPercentage: number
}

export interface TotalGoalStats {
  betTypeName: string
  homeTotalGoal0_1: string | number
  homeTotalGoal0_1Percentage: number
  homeTotalGoal2_3: string | number
  homeTotalGoal2_3Percentage: number
  homeTotalGoal4_6: string | number
  homeTotalGoal4_6Percentage: number
  homeTotalGoal7P: string | number
  homeTotalGoal7PPercentage: number
}

export interface UnderOverStats {
  betTypeName: string
  betTypeOverTitle: string
  home25OverPercentage: number
  betTypeUnderTitle: string
  home25UnderPercentage: number
}

export interface OddStatsDetail {
  matchResultStats?: MatchResultStats
  bothTeamsToScoreStats?: BothTeamsToScoreStats
  totalGoalStats?: TotalGoalStats
  underOverStats?: UnderOverStats
  homeTeamName?: string
  awayTeamName?: string
}

export interface OddStatistics {
  generalStats?: OddStatsDetail
  homeAwayStats?: OddStatsDetail
  betweenStats?: OddStatsDetail
}

export interface MatchItem {
  date: string
  tournamentShortName: string
  homeTeamName: string
  awayTeamName: string
  score: string
  markedTeamResult: string
}

export interface TeamForm {
  title: string
  recentForms: string[]
  teamForm: MatchItem[]
}

export interface MatchStatistics {
  topGoalScorers?: {
    homeTopGoalScorers: TopScorerSection
    awayTopGoalScorers: TopScorerSection
  }
  oddStatistics?: OddStatistics
  homeTeamForms?: TeamForm
  awayTeamForms?: TeamForm
  matchesBetween?: TeamForm
}

// Missing Players Types
export interface MissingPlayer {
  name: string
  missingType: string
  desc: string
  position: string | null
  positionNumber: string | null
  totalPlayed: string
  lineUp: string
  scored: string
  returnDate: string | null
}

export interface TeamMissingPlayers {
  name: string
  players: MissingPlayer[]
}

export interface MissingPlayersData {
  status: { code: number; message: string }
  homeTeam: TeamMissingPlayers
  awayTeam: TeamMissingPlayers
}

// Match Comments Types
export interface MarketInfo {
  label: string
  marketName: string
  marketOutcomeName: string
  currentOddsWeb: number
  marketId: number
}

export interface Comment {
  authorName: string
  authorId: number
  createdDate: string
  comment: string
  marketInfo?: MarketInfo
}

export interface MatchCommentsData {
  data: Comment[]
}

// Combined Match Data for AI Analysis
export interface MatchData {
  details: MatchDetails | null
  statistics: MatchStatistics | null
  missingPlayers: MissingPlayersData | null
  comments: MatchCommentsData | null
}

// Tab Item Types
export interface TabItem {
  label: string
  icon: string
  slot: string
  content?: MatchData | MatchDetails | MatchStatistics | MissingPlayersData | MatchCommentsData | string
}

