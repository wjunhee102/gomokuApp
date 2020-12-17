import  React ,{ useState, useEffect } from 'react';
import { useSelector, useDispatch }    from 'react-redux'; 

import useGomoku, {GomokuActionType , AxisType} from './hooks/useGomoku';

import {
  GomokuAction,
  GomokuState,
  setStone2,
  addLog,
  changePlayer,
  initGame
} from '../../store/modules/gomoku';

import {
  RootState
} from '../../store/index';

type GomokuStone  = number;

type GomokuStones = GomokuStone[];


const ary: AxisType[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ,11, 12, 13, 14];

// for(let i = 0; i < 15; i++) {
//   ary.push(i);
// }

function judgeCheetPlay( lines: any[][], x: number, y: number ) {
  const cheetLine:any = [];

  lines.forEach(line => {
    console.log(line.filter(stone => stone.x === x && stone.y === y))
    if(line.filter(stone => stone.x === x && stone.y === y).length >= 1) {
      cheetLine.push(line);
    }
  })
  // console.log(cheetLine);
  return cheetLine.length === 2? true : false;
}

function judgeGomoku( board:GomokuStones[], playValue:number ): string {

  const player = playValue === 1? "흰색" : "검은색";

  const winningLine:any[] = [];

  // 가로
  for(let i = 0; i < 15; i++) {

    for(let ii = 0; ii < 15; ii++) {

      if(board[i][ii] === playValue) {

        if(ii < 11) {

          if( board[i][ii+ 1] === playValue
            && board[i][ii+ 2] === playValue
            && board[i][ii - 1] === 0
            && ii !== 0
          ) {
            if(board[i][ii + 3] === playValue) {
              if(board[i][ii + 4] === 0 ) {
                const temp:any[] = [];
                for(let iii = ii; iii < ii + 4; iii++) {
                  temp.push({x: iii, y: i});
                }
                winningLine.push(temp);
              } 

            } else {
              if(board[i][ii + 3] === 0 ) {
                const temp:any[] = [];
                for(let iii = ii; iii < ii + 3; iii++) {
                  temp.push({x: iii, y: i});
                }
                winningLine.push(temp);
              } 
            }
          console.log(winningLine);
        }
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
            && board[i-1][ii] === 0
            && i !== 0
          ) {
              if(board[i + 3][ii] === playValue) {
                if(board[i + 4][ii] === 0 ) {
                  const temp:any[] = [];
                  for(let iii = i; iii < i + 4; iii++) {
                    temp.push({x: ii, y: iii});
                  }
                  winningLine.push(temp);
                } 

              } else {
                if(board[i + 3][ii] === 0 ) {
                  const temp:any[] = [];
                  for(let iii = i; iii < i + 3; iii++) {
                    temp.push({x: ii, y: iii});
                  }
                  winningLine.push(temp);
                } 
              }
            console.log(winningLine);
          }

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

  console.log(judgeCheetPlay(winningLine, 1, 1));
  if(judgeCheetPlay(winningLine, 1, 1)) {
    return "cheet"
  } else {
    return "no";
  }

}

interface ColumnProps {
  yAxis: AxisType;
  xAxis: AxisType;
  state: GomokuState;
  dispatch: GomokuActionType
}

function Column({yAxis, xAxis, state, dispatch}: ColumnProps) {

  const { onSetStone } = useGomoku();
  
  const clickStone = ()=> {
    if(state.board[yAxis][xAxis] === 0 || state.board[yAxis][xAxis] > 2) {
      // dispatch(setStone(xAxis, yAxis));
      console.log(state.board[yAxis][xAxis] - state.player);
      if(state.board[yAxis][xAxis] - (state.player ===1 ? 2 : 1) !== 2) {
        onSetStone(xAxis, yAxis);
        dispatch(changePlayer(state.player === 1? 2 : 1));
      }
    }
  }

  const stoneColor = (() => {
    switch (state.board[yAxis][xAxis]) {
      case 1 : 
        return "white"
      case 2 : 
        return "black"
      case 3 : 
        return "white-ban"
      case 4 : 
        return "black-ban"
      default :
        return  ""
    }
  })

  return (
    <div className="column" onClick={clickStone}>
      <span className="y-line"></span>
      <span className="x-line"></span>
      <span className={`stone ${stoneColor()}`}></span>
    </div>
  )
}

interface RowProps {
  yAxis: AxisType;
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
    const data = judgeGomoku(state.board, state.player === 1? 2 : 1);
    if(data === "cheet") {
      dispatch(setStone2(1, 1, state.player + 2));
    }
    setVic(data);
  }, [state]);

  const { onInitGame } = useGomoku();

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
      <div className={`vic ${vic}`} onClick={onInitGame} >{vic === "no"? "게임중" : vic}</div>
      <div className="backplate"></div>
    </div>
  );
}

export default Gomoku;