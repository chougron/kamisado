import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { addPlayer, pairPlayer, disconnectPlayer } from './src/Player';
import { Question, QuestionEvent } from './controller/question';
import { handleClick, ClickQuestion } from './controller/clickQuestion';
import { connectedAnswer } from './controller/connectedAnswer';

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
  const player = addPlayer(ws);

  //connection is up, let's add a simple simple event
  ws.on('message', (message: string) => {
    const question: Question = JSON.parse(message);
    switch (question.event) {
      case QuestionEvent.PAIR:
        pairPlayer(player);
        break;
      case QuestionEvent.CLICK:
        const clickQuestion = question as ClickQuestion;
        handleClick(player, clickQuestion.move);
        break;
    }
    //log the received message and send it back to the client
    console.log('received: %s', message);
  });

  ws.on('close', (code: number, reason: string) => {
    disconnectPlayer(player);
  });

  //send immediatly a feedback to the incoming connection
  connectedAnswer(player);
});

//start our server
const port = process.env.WS_PORT || 8999;
server.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
