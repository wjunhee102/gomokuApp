import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  GomokuAction,
  GomokuState,
  setStone,
  addLog,
  changePlayer,
  initGame,
  Axis
} from '../../../store/modules/gomoku';

import {
  RootState
} from '../../../store/index';

export type GomokuActionType = React.Dispatch<GomokuAction>
export type AxisType = Axis;
/**
 * 0: 돌 없음 | 1: 흰돌 | 2: 검은돌 | 3: 흰돌 금지 | 4: 검은돌 금지
 */
export type StoneType = 0 | 1 | 2 | 3 | 4;

function useGomoku() {
  
  const state = useSelector(( state:RootState ) => state.gomoku );
  const dispatch = useDispatch();

  const onSetStone = useCallback((xAxis: Axis, yAxis: Axis) => dispatch(setStone(xAxis, yAxis)), [dispatch])
  const onChangePlayer = useCallback((player: number) => dispatch(changePlayer(player)), [dispatch]);
  const onInitGame     = useCallback(() => dispatch(initGame()),[dispatch]);

  return { state, onSetStone, onChangePlayer, onInitGame };
}

export default useGomoku;