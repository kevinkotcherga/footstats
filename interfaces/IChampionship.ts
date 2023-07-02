export interface IChampionship {
  id: string;
  name: string;
  active: boolean;
  championship: string;
  jerseys: { [year: string]: string };
}
