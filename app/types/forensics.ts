export interface PlanValue {
  display_value: string;
  tooltip_header?: string; // e.g. "Comprehensive Coverage" or "Coverage Gaps Detected"
  tooltip_bullets?: string[]; // e.g. ["**Preventive:** $0 Copay", "**Implants:** Covered"]
  tooltip_summary?: string; // Fallback plain text
}

export interface GridRow {
  category: string;
  winner: 'CURRENT' | 'CHALLENGER' | 'TIE';
  current: PlanValue;
  challenger: PlanValue;
}

export interface TournamentResult {
  did_tournament_occur: boolean;
  winner_name: string;
  loser_name: string;
  reason_for_win: string;
  knockout_stat: string;
}

export interface AnalysisResult {
  verdict: 'STAY' | 'SWITCH';
  verdict_headline: string;
  executive_summary: string;
  challenger_analysis: TournamentResult;

  plan_headers: {
    current_name: string;
    challenger_name: string;
  };

  sales_ammunition: string[];

  primary_grid: GridRow[];
  forensic_grid: GridRow[];
}
