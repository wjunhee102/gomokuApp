export type GomokuStone  = number;

export type GomokuStones = GomokuStone[];

const GomokuBoard: GomokuStones[] = [];

for(let i = 0; i < 15; i++) {
  let temp:GomokuStone[] = [];
  for(let ii = 0; ii < 15; ii++) {
    temp.push(0);
  }
  GomokuBoard.push(temp);
}

const SET_STONE     = 'gomoku/SET_STONE' as const;
const CHANGE_PLAYER = 'gomoku/CHANGE_PLAYER' as const;
const ADD_LOG       = 'gomoku/ADD_LOG' as const;
const INIT_GAME     = 'gomoku/INIT_GAME' as const;

export function setStone(xAxis: number, yAxis: number) {
  // *** const assertion - type
  return {
    type: SET_STONE,
    stone: {
      xAxis,
      yAxis
    }
  } as const;
}

export function changePlayer(player: number) {
  return {
    type: CHANGE_PLAYER,
    player
  } as const;
}

export function addLog(log: string) {
  return {
    type: ADD_LOG,
    log
  } as const;
}

export function initGame() {
  return {
    type: INIT_GAME
  } as const;
}

export type GomokuAction = ReturnType<typeof setStone>
  | ReturnType<typeof changePlayer>
  | ReturnType<typeof addLog>
  | ReturnType<typeof initGame>

export interface GomokuState {
  board: GomokuStones[];
  player: number;
  log: string[];
}

const initialState: GomokuState = {
  board: GomokuBoard.concat(),
  player: 1,
  log: []
}

function gomoku( state:GomokuState = initialState, action: GomokuAction ): GomokuState {

  switch(action.type) {

    case SET_STONE :
      
      const { xAxis, yAxis } = action.stone;

      return !state.board[yAxis][xAxis]? Object.assign({}, state, {
          board: state.board.map((stones, idx)=> 
            idx === yAxis? stones.map((stone, idx)=> 
              idx === xAxis? state.player 
              : stone) 
            : stones
          )
        }) : state;
    
    case CHANGE_PLAYER :

      return Object.assign({}, state, {
        player: action.player
      });

    case ADD_LOG :

      return Object.assign({}, state, {
        log: action.log
      });

    case INIT_GAME :
      return Object.assign({}, state, {
        board: GomokuBoard.concat()
      })

    default: 
      return state;
  }
}

export default gomoku;
