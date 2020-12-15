import { combineReducers } from 'redux';
import gomoku from './modules/gomoku'; 

const rootReducer = combineReducers({
  gomoku
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;