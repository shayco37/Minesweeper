import { squareClickedAction,
         updateSqaureInformation,
         markSquareAsMine,
         unmarkSquareAsMine,
         MARK_SQUARE_AS_MINE,
         UNMARK_SQUARE_AS_MINE,
         SQUARE_WAS_CLICKED,
         UPDATE_SQUARE_INFORMATION } from './squareActions';
import { updateBoardSquaresAndState,
         generateBoardSquares,
         initalBoard,
         restartGame,
         INITIAL_BOARD,
         UPDATE_BOARD_SQUARES,
         GENERATE_BOARD_SQUARES
} from './boardActions';

const ACTIONS = {
    SQUARE_WAS_CLICKED,
    UPDATE_SQUARE_INFORMATION,
    MARK_SQUARE_AS_MINE,
    UNMARK_SQUARE_AS_MINE,
    INITIAL_BOARD,
    UPDATE_BOARD_SQUARES,
    GENERATE_BOARD_SQUARES
};

export {
  squareClickedAction,
  updateSqaureInformation,
  markSquareAsMine,
  unmarkSquareAsMine,
  initalBoard,
  restartGame,
  generateBoardSquares,
  updateBoardSquaresAndState,
  ACTIONS
};
