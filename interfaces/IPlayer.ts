export interface IPlayer {
  ultraPosition: number,
  quotation: number,
  firstName: string,
  lastName: string,
  id: string,
  clubId: string,
  championship: string[],
}

export interface IPlayerStats {
  keySeasonStats: {
    averageRating: number;
    percentageCleanSheet: number;
    percentageStarter: number;
    quotation: number;
    ratioGoalsConceded: number;
    ratioInterceptions: number;
    ratioGoals: number;
    ratioBigChanceCreated: number;
    ratioScoringAtt: number;
    ratioSaves: number;
    percentagePenaltyStopped: number;
  };
  total: {
    quotations: {
      quotation: number;
      date: Date;
    }[];
    stats: {
      totalPlayedMatches: number,
      totalStartedMatches: number,
      totalMinutesPlayed: number,
    },
  },
}
