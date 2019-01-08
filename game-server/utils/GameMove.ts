import { IPaw, ITile } from "./Generator";

export default class GameMove {
  public from: ITile;
  public to: ITile;
  public paw: IPaw;

  constructor(from: ITile, to: ITile, paw: IPaw) {
    this.from = from;
    this.to = to;
    this.paw = paw;
  }
}
