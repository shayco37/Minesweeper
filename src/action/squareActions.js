export const SQUARE_WAS_CLICKED = 'SQUARE_WAS_CLICKED';
export const UPDATE_SQUARE_INFORMATION = 'UPDATE_SQUARE_INFORMATION';
export const MARK_SQUARE_AS_MINE = 'MARK_SQUARE_AS_MINE';
export const UNMARK_SQUARE_AS_MINE = 'UNMARK_SQUARE_AS_MINE';

export const squareClickedAction = (square, squares, event) => ({
    type: SQUARE_WAS_CLICKED,
    payload: {
        square,
        squares,
        isShiftPressed: event.shiftKey
    }
});

export const updateSqaureInformation = (square) => ({
    type: UPDATE_SQUARE_INFORMATION,
    payload: {
        square,
    }
});

export const markSquareAsMine = (square) => ({
    type: MARK_SQUARE_AS_MINE,
    payload: {
        square,
    }
});
export const unmarkSquareAsMine = (square) => ({
    type: UNMARK_SQUARE_AS_MINE,
    payload: {
        square,
    }
});
