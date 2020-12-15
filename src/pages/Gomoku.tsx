import  React ,{ useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'; 

import {
  GomokuAction,
  GomokuState,
  setStone,
  addLog,
  changePlayer,
  initGame
} from '../store/modules/gomoku';

import {
  RootState
} from '../store/index';

type GomokuStone  = number;

type GomokuStones = GomokuStone[];


const ary: number[] = [];

for(let i = 0; i < 15; i++) {
  ary.push(i);
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


function Gomoku() {

  const [vic, setVic] = useState<string>("start");

  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.gomoku);
  
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