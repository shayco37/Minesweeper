import { merge } from 'lodash';
import { ACTIONS } from '../action';
import Constants from '../constants';

export default function ( state = { gameIsOver: false, success: false}, action = {}) {
    switch(action.type) {
        case ACTIONS.INITIAL_BOARD:
            const { minesLeft, squares, gameIsOver } = action.payload;
            return {
                minesLeft,
                squares,
                gameIsOver
            };
        case ACTIONS.UPDATE_BOARD_SQUARES:
            return merge ( {},
                           { ...state},
                           { squares: action.payload.squares,
                             gameIsOver: action.payload.gameIsOver,
                             success: action.payload.success || false}
            );
        case ACTIONS.MARK_SQUARE_AS_MINE:
           return (state.minesLeft > 0 ) ?
             merge(
                 {},
                 { ...state } ,
                 {  minesLeft: state.minesLeft-1},
                 {  squares: {
                        [action.payload.square.key]: { ...action.payload.square, isMarked: true, content: Constants.FLAG}
                    }
                }
             ) : state;
        case ACTIONS.UNMARK_SQUARE_AS_MINE:
            return merge( { ...state } ,
                {  minesLeft: state.minesLeft+1},
                {  squares: {
                        [action.payload.square.key]: { ...action.payload.square, isMarked: false, content: Constants.EMPTY}
                    }
                }
            );
        case ACTIONS.UPDATE_SQUARE_INFORMATION:
            return merge( { ...state } ,
                          {  squares: {
                                  [action.payload.square.key]: { ...action.payload.square}
                              }
                        }
            );
        default:
            return state;
    }
};
