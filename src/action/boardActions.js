export const INITIAL_BOARD = 'INITIAL_BOARD_STATE';
export const UPDATE_BOARD_SQUARES = 'UPDATE_BOARD_SQUARES';
export const GENERATE_BOARD_SQUARES = 'GENERATE_BOARD_SQUARES';

// This action initial the board setting
export const initalBoard = (squares, minesLeft) => ({
    type: INITIAL_BOARD,
    payload: {
        squares,
        minesLeft,
        gameIsOver: false,
        success: false
    }
});

// update squares status, usually after players has clicked on square
export const updateBoardSquaresAndState = (squares, gameIsOver = false ) => ({
    type: UPDATE_BOARD_SQUARES,
    payload: {
        squares,
        gameIsOver
    }
});

// generate all board square's information
export const generateBoardSquares = (rows, columns, mines) => ({
    type: GENERATE_BOARD_SQUARES,
    payload: {
        rows,
        columns,
        mines
    }
});

export const restartGame = () => ({
    type: INITIAL_BOARD,
    payload: {
        squares: {},
        minesLeft: 0,
        gameIsOver: false,
        success: false
    }
});
