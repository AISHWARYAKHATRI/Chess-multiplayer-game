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
  MOVE = 'move',
  MOVE_MADE = 'moveMade',
  UNAUTHORIZED = 'unauthorized',
  ONGOING_GAME = 'ongoingGame',
  ALREADY_JOINED_GAME = 'alreadyJoinedGame',
}

export enum GAME_STATUS {
  ONGOING = 'ongoing',
  FINISHED = 'finished',
  WAITING_FOR_PLAYER = 'waiting_for_player',
  ABORTED = 'abandoned',
}

export enum GAME_RESULT {
  WHITE_WIN = 'white_win',
  BLACK_WIN = 'black_win',
  DRAW = 'draw',
  UNDECIDED = 'undecided',
}
