import  React ,{ useState, useEffect } from 'react';
import useGomoku from '../hooks/useGomoku';

import Stones from './Stones';


type GomokuStone  = number;

type GomokuStones = GomokuStone[];

function judgeCheetPlay( lines: any[][] ) {
  const cheetLine:any = [];

  for(let i = 0; i < lines.length - 1; i++) {
    lines[i].forEach((key)=> {
      for(let ii = i + 1; ii < lines.length; ii++) {
        console.log(key, lines[ii].filter(stone => stone.x === key.x && stone.y === key.y));
        if(lines[ii].filter(stone => stone.x === key.x && stone.y === key.y).length >= 1) {
          cheetLine.push(lines[ii]);
        }
      }
    })
  }

  console.log("cheetLine",cheetLine, "lines", lines);
  return cheetLine.length >= 1? true : false;
}

function judgeGomoku( board:GomokuStones[], playValue:number ): string {

  const player = playValue === 1? "흰색" : "검은색";

  const winningLine:any[] = [];

  // 가로
  for(let i = 0; i < 15; i++) {

    for(let ii = 0; ii < 15; ii++) {

      if(board[i][ii] === playValue) {

        if(ii < 11) {

          // x * y = [-]
          if( 
            board[i][ii+1] === playValue 
              && board[i][ii+2] === playValue
          ) {

            // 승리
            if( 
              board[i][ii+3] === playValue
              && board[i][ii+4] === playValue
            ) {

              return `${player} victory`

            } else if( board[i][ii - 1] === 0
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

            } 
            
          }
        
        }
        
        if(i < 11) {
          
          // x * y = [|]
          if( board[i+1][ii] === playValue
            && board[i+2][ii] === playValue
          ) {

            // 승리
            if ( 
              board[i+3][ii] === playValue 
              && board[i+4][ii] === playValue 
            ) {

              return `${player} victory`;

            } else if ( 
              board[i-1][ii] === 0
              && i !== 0
            ) {
              // 3 * 3 방지
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
  
            }
          }
        
          //  x * y = [/]
          if( 
            board[i+1][ii-1] === playValue
            && board[i+2][ii-2] === playValue
          ) {
            // 승리
            if ( 
              board[i+3][ii-3] === playValue 
              && board[i+4][ii-4] === playValue 
            ) {

              return `${player} victory`;

            } else if ( 
              board[i-1][ii+1] === 0
              && i !== 14
              && ii !== 0
            ) {
              // 3 * 3 방지
                if(board[i + 3][ii - 3] === playValue) {
                  if(board[i + 4][ii - 4] === 0 ) {
                    const temp:any[] = [];
                    for(let iii = 0; iii < 4; iii++) {
                      temp.push({x: ii - iii, y: i + iii});
                    }
                    winningLine.push(temp);
                  } 
  
                } else {
                  if(board[i + 3][ii - 3] === 0 ) {
                    const temp:any[] = [];
                    for(let iii = 0; iii < 3; iii++) {
                      temp.push({x: ii - iii, y: i + iii});
                    }
                    winningLine.push(temp);
                  } 
                }

            }
          }

          if(ii < 11) {

            //  x * y = [\]
            if( 
              board[i+1][ii+1] === playValue
              && board[i+2][ii+2] === playValue
            ) {
              // 승리
              if ( 
                board[i+3][ii+3] === playValue 
                && board[i+4][ii+4] === playValue 
              ) {
  
                return `${player} victory`;
  
              } else if ( 
                board[i-1][ii-1] === 0
                && i !== 0
                && ii !== 0
              ) {
                // 3 * 3 방지
                  if(board[i + 3][ii + 3] === playValue) {
                    if(board[i + 4][ii + 4] === 0 ) {
                      const temp:any[] = [];
                      for(let iii = 0; iii < 4; iii++) {
                        temp.push({x: ii + iii, y: i + iii});
                      }
                      winningLine.push(temp);
                    } 
    
                  } else {
                    if(board[i + 3][ii + 3] === 0 ) {
                      const temp:any[] = [];
                      for(let iii = 0; iii < 3; iii++) {
                        temp.push({x: ii + iii, y: i + iii});
                      }
                      winningLine.push(temp);
                    } 
                  }
           
              }
            }

          }


        }
        
      }

    }

  }

  if(judgeCheetPlay(winningLine)) {
    return "cheet"
  } else {
    return "no";
  }

}

function Board() {

  const [vic, setVic] = useState<string>("start");

  const { state: { board, player }, onInitGame } = useGomoku();

  useEffect(()=> {
    const data = judgeGomoku(board, player === 1? 2 : 1);
    console.log(data);
    setVic(data);
  }, [board]);

  return (
    <div className="board">
      {
        board.map((stones, idx) => 
          <Stones 
            yAxis={idx}
            stoneValues={stones}
            key={idx}
          />
        )
      }
      <div className={`vic ${vic}`} onClick={onInitGame} >{vic === "no"? "게임중" : vic}</div>
      <div className="backplate"></div>
    </div>
  );
}

export default Board;