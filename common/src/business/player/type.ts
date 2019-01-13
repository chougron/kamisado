export interface Player {
  id: number | null;
  username: string;
}

export interface ApiPlayer extends Player {
  password: string;
}

export interface ExistingApiPlayer extends ApiPlayer {
  id: number;
}
