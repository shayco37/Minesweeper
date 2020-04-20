import { get } from 'lodash';

export const isGameOver = state => get(state, 'Board.gameIsOver', {} );
export const isGameEndedSuccessfully = state => get(state, 'Board.success', false);
