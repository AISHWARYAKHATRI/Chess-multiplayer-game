export enum SIDES {
  WHITE = 'white',
  BLACK = 'black',
}

export enum GAME_EVENTS {
  CONNECT = 'connect',
  CONNECTED = 'connected',
  CREATE_GAME = 'createGame',
  GAME_CREATED = 'gameCreated',
  JOIN_GAME = 'joinGame',
  GAME_JOINED = 'gameJoined',
  JOIN_FAILED = 'joinGameFailed',
  DISCONNECT = 'disconnect',
  DISCONNECTED = 'disconnected',
  EXCEPTION = 'exception',
}

export enum GAME_STATUS {
  ONGOING = 'ongoing',
  FINISHED = 'finished',
  WAITING_FOR_PLAYER = 'waiting_for_player',
}

export enum GAME_RESULT {
  WHITE_WIN = 'white_win',
  BLACK_WIN = 'black_win',
  DRAW = 'draw',
  UNDECIDED = 'undecided',
}
