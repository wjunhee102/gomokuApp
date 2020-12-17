import React from 'react';

import useGomoku, { StoneType, AxisType } from '../hooks/useGomoku';

interface StoneProps {
  yAxis: AxisType;
  xAxis: number;
  stoneValue: StoneType;
}

function Stone({yAxis, xAxis, stoneValue}: StoneProps) {

  const { state: { player } , onSetStone, onChangePlayer } = useGomoku();

  const xAxisValue:AxisType = xAxis >= 0 && xAxis < 15? xAxis : 0;

  const clickStone = ()=> {
    if(stoneValue === 0) {
      // 3 x 3 방지 
      if(stoneValue - 1 !== 2) {
        onSetStone(xAxisValue, yAxis);
        onChangePlayer(player === 1? 2 : 1);
      } 
    }
  }

  const stoneColor = (() => {
    switch (stoneValue) {
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
  })();

  return (
    <div className="column" onClick={clickStone}>
      <span className="y-line"></span>
      <span className="x-line"></span>
      <span className={`stone ${stoneColor}`}></span>
    </div>
  )
}

interface StonesProps {
  yAxis: AxisType;
  stoneValues: StoneType[];
}

function Stones({yAxis, stoneValues}: StonesProps) {

  return (
    <div className="row stones">
      { stoneValues.map( ( stoneValue, idx ) => 
          <Stone
            yAxis={yAxis}
            xAxis={idx}
            stoneValue={stoneValue}
            key={idx}
          />)
      }
    </div>
  )
}

export default Stones;