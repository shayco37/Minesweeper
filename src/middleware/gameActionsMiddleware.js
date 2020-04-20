import {
    ACTIONS,
    initalBoard,
    markSquareAsMine,
    unmarkSquareAsMine, updateBoardSquaresAndState
} from '../action';
import GameActionsUtils from './GameActionsUtils';
import { isGameOver, isAllSquaresRevealed } from '../selector';

const gameActionsMiddleware = store => next => action =>{
    switch(action.type){
        case ACTIONS.MARK_SQUARE_AS_MINE:
        case ACTIONS.UPDATE_BOARD_SQUARES:
            const isGameEndedSuccessfully = isAllSquaresRevealed(store.getState());
            if (isGameEndedSuccessfully) {
                action.payload['gameIsOver'] = true;
                action.payload['success'] = true;
            }
            break;
        case ACTIONS.GENERATE_BOARD_SQUARES:
            const { rows, columns, mines } = action.payload;
            const generatedMines = GameActionsUtils.generateRandomMines(rows, columns, mines);
            const generatedSquares = GameActionsUtils.generateSquares(rows, columns, generatedMines);
            const squares = GameActionsUtils.generateBoardSquaresState(generatedSquares);
            store.dispatch(initalBoard(squares, mines));
            break;
        case ACTIONS.SQUARE_WAS_CLICKED:
            const { square, isShiftPressed } = action.payload;
            if (isShiftPressed && !square.revealed) {
                store.dispatch(square.isMarked ? unmarkSquareAsMine(square) : markSquareAsMine(square));
            }else{
                // only if square isn't holding flag allow revealing its content
                if (!square.isMarked) {
                    const isGameEnded = isGameOver(store.getState());
                    const {squares, gameIsOver} = GameActionsUtils.revealSquareContent(square, action.payload.squares, isGameEnded);
                    store.dispatch(updateBoardSquaresAndState(squares, gameIsOver));
                }
            }
            break;
    };
    return next(action);
};

export default gameActionsMiddleware;
