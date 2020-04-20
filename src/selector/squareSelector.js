import { createSelector } from 'reselect';
import { get } from 'lodash';
import Hashing from '../util/Hashing';

export const getSquares = state => get(state, 'Board.squares', {} );
export const getMinesLeft = state => get(state, 'Board.minesLeft', 0);

export const getSquare = ( state, { row, column } ) => {
  const squares = getSquares(state);
  const hash = Hashing.hash(column, row);
  return { ...squares[hash] };
};

export const getSquareSelector = createSelector([
    getSquare
    ], square => square
);

export const isAllSquaresRevealed = createSelector( [
    getSquares
], squares => {
        const numberOfSquares = Object.keys(squares).length
        let revealedPlusMarked = 0;
        for (let square in squares){
            (squares[square].isMarked || squares[square].revealed) && revealedPlusMarked++;
        }
        return numberOfSquares === revealedPlusMarked;
})
