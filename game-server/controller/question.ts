export enum QuestionEvent {
  PAIR = "PAIR",
  CLICK = "CLICK"
}

export interface Question {
  event: QuestionEvent;
}
