import { IChampionship } from "./IChampionship";

export interface IClub {
  id: string,
  name: { [key: string]: string };
  championships: IChampionship[];
    jerseys: { [year: string]: string };
}
