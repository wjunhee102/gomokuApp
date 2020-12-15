import  React ,{ useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'; 

import {
  GomokuAction,
  GomokuState,
  setStone,
  addLog,
  changePlayer,
  initGame
} from '../store/index';

type GomokuStone  = number;

type GomokuStones = GomokuStone[];

// const SET_STONE     = 'SET_STONE';
// const CHANGE_PLAYER = 'CHANGE_PLAYER';
// const ADD_LOG       = 'ADD_LOG';
// const INIT_GAME     = 'INIT_GAME';

// function setStone(xAxis: number, yAxis: number) {
//   // *** const assertion - type
//   return {
//     type: SET_STONE,
//     stone: {
//       xAxis,
//       yAxis
//     }
//   } as const;
// }

// function changePlayer(player: number) {
//   return {
//     type: CHANGE_PLAYER,
//     player
//   } as const;
// }

// function addLog(log: string) {
//   return {
//     type: ADD_LOG,
//     log
//   } as const;
// }

// function initGame() {
//   return {
//     type: INIT_GAME
//   } as const;
// }

// type GomokuAction = ReturnType<typeof setStone>
//   | ReturnType<typeof changePlayer>
//   | ReturnType<typeof addLog>
//   | ReturnType<typeof initGame>

// interface GomokuState {
//   board: GomokuStones[];
//   player: number;
//   log: string[];
// }

// function reducer(state:GomokuState, action: GomokuAction):GomokuState {

//   switch(action.type) {

//     case SET_STONE :
//       const { xAxis, yAxis } = action.stone

//       return !state.board[yAxis][xAxis]? Object.assign({}, state, {
//           board: state.board.map((stones, idx)=> 
//             idx === yAxis? stones.map((stone, idx)=> 
//               idx === xAxis? state.player 
//               : stone) 
//             : stones
//           )
//         }) : state;
    
//     case CHANGE_PLAYER :

//       return Object.assign({}, state, {
//         player: action.player
//       });

//     case ADD_LOG :

//       return Object.assign({}, state, {
//         log: action.log
//       });

//     case INIT_GAME :
//       return Object.assign({}, state, {
//         board: GomokuBoard.concat()
//       })

//     default: 
//       throw new Error();
//   }
// }

const GomokuBoard: GomokuStones[] = [];

const ary: number[] = [];

for(let i = 0; i < 15; i++) {
  let temp:GomokuStone[] = [];
  for(let ii = 0; ii < 15; ii++) {
    temp.push(0);
  }
  ary.push(i);
  GomokuBoard.push(temp);
}

function vicory( board:GomokuStones[], playValue:number ): string {

  const player = playValue === 1? "흰색" : "검은색";

  // 가로
  for(let i = 0; i < 15; i++) {

    for(let ii = 0; ii < 15; ii++) {

      if(board[i][ii] === playValue) {

        if(ii < 11) {
          //가로
          if( board[i][ii+1] === playValue 
              && board[i][ii+2] === playValue
              && board[i][ii+3] === playValue
              && board[i][ii+4] === playValue
          ) {
            return `${player} victory`
          }

        }
        
        if(i < 11) {
          
          // 세로
          if( board[i+1][ii] === playValue 
              && board[i+2][ii] === playValue 
              && board[i+3][ii] === playValue 
              && board[i+4][ii] === playValue 
          ) {
            return `${player} victory`;
          }

          // 왼쪽 대각선
          if( board[i+1][ii-1] === playValue 
            && board[i+2][ii-2] === playValue 
            && board[i+3][ii-3] === playValue 
            && board[i+4][ii-4] === playValue 
          ) {
            return `${player} victory`;
          }

          if(ii < 11) {
            // 오른쪽 대각선
            if( board[i+1][ii+1] === playValue 
              && board[i+2][ii+2] === playValue 
              && board[i+3][ii+3] === playValue 
              && board[i+4][ii+4] === playValue 
            ) {
              return `${player} victory`;
            }

          }

        }
        
      }

    }

  }

  return "no";
}

interface ColumnProps {
  yAxis: number;
  xAxis: number;
  state: GomokuState;
  dispatch: React.Dispatch<GomokuAction>
}

function Column({yAxis, xAxis, state, dispatch}: ColumnProps) {

  const clickStone = ()=> {
    if(state.board[yAxis][xAxis] === 0) {
      dispatch(setStone(xAxis, yAxis));
      dispatch(changePlayer(state.player === 1? 2 : 1));
    }
  }

  return (
    <div className="column" onClick={clickStone}>
      <span className="y-line"></span>
      <span className="x-line"></span>
      <span className={`stone ${state.board[yAxis][xAxis]? (state.board[yAxis][xAxis] === 1? "white": "black"): ""}`}></span>
    </div>
  )
}

interface RowProps {
  yAxis: number;
  state: GomokuState;
  dispatch: React.Dispatch<GomokuAction>
}

function Row({yAxis, state, dispatch}: RowProps) {

  return (
    <div className="row">
      { ary.map( (idx, key) => 
          <Column 
            yAxis={yAxis}
            xAxis={idx}
            state={state}
            dispatch={dispatch}
            key={key}
          />)
      }
    </div>
  )
}


function Gomoku({BOARD, SET}:any) {

  const [vic, setVic] = useState<string>("start");

  // const [state, dispatch] = useReducer(reducer, {
  //   board: GomokuBoard.concat(),
  //   player: 1,
  //   log: []
  // });

  const dispatch = useDispatch();
  const state = useSelector((state: GomokuState) => state);
  
  useEffect(()=> {
    const data = vicory(state.board, state.player === 1? 2 : 1);
    setVic(data);
    console.log(state);
  }, [state]);

  

  const init = ():void => {
    dispatch(initGame());
  }

  return (
    <div className="gomoku">
      { ary.map( (idx, key) => 
        <Row 
          yAxis={idx}
          state={state}
          dispatch={dispatch}
          key={key}
        />)
      }
      <div className={`vic ${vic}`} onClick={init} >{vic === "no"? "게임중" : vic}</div>
      <div className="backplate"></div>
    </div>
  );
}


export default Gomoku;