
export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface Entry {
  weather: Weather;
  visibility: Visibility;
  date: string;
  comment: string;
  id: number;
}

export type NewEntry = Omit<Entry, 'id'>;