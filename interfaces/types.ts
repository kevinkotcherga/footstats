import { IPlayer } from "./IPlayer";

export type RootStackParamList = {
  ChampionshipList: undefined;
  ClubList: {championship: string, championshipName: string};
  PlayerList: { clubId: string; clubName: string; championship: string[] | string };
  Player: { player: IPlayer, championship: string[] | string };
};
