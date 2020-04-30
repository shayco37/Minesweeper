import Hashing from '../utils/Hashing';
import Constants from '../constants';


class GameActionsUtils {

    static generateBoardSquaresState = squares => {
        let result = {};
        for (let square of squares ){
            result[[square.key]] = square;
        }
        return result;
    }

    static generateRandomMines = (rows, columns, mines) => {
        if (mines > rows * columns) {
            throw new Error("Too many mines provided");
        }
        let minesLeft = mines;
        let mineSet = new Set();

        while(minesLeft) {
            const column = Math.trunc(Math.random()*columns);
            const row = Math.trunc(Math.random()*rows);
            const hashStr = Hashing.hash(column, row);
            if (!mineSet.has(hashStr)) {
                mineSet.add(hashStr);
                minesLeft--;
            }
        }
        return mineSet;
    }

    static generateSquares = (rows, columns, mineSet) => {
        const squares = [];
        for(let i = 0; i < rows; i++){
            for (let j = 0; j < columns; j++ ) {
                const hash = Hashing.hash(i, j);
                const square = {
                    key: hash,
                    column: i,
                    row: j,
                    content: Constants.EMPTY,
                    isMarked: false,
                    revealed : false,
                    isMine: mineSet.has(hash)
                };
                squares.push(square);
            }
        }
        return squares;
    }

    static revealSquareContent = (square, squares, isGameEnded) => {
        function isMine(square){
            if (square){
                return square.isMine ? 1 : 0;
            }
            return 0;
        }

        function findValidNeighbours( squares, row, column ) {
            const result = [];
            const keys = [
                            Hashing.hash(column-1, row-1),
                            Hashing.hash(column, row-1),
                            Hashing.hash(column+1, row-1),
                            Hashing.hash(column-1, row),
                            Hashing.hash(column+1, row),
                            Hashing.hash(column-1, row+1),
                            Hashing.hash(column, row+1),
                            Hashing.hash(column+1, row+1)
            ];
            for (let key of keys){
                (squares[key]) && result.push(key);
            }
            return result;
        }

        function minesAroundSqaure(square, squares) {
            let result = 0;
            const hash = square.key;
            const { row, column } = Hashing.unHash(hash);
            const neighbours = findValidNeighbours( squares, row, column);
            for (let adjacentSquareKey of neighbours) {
                result += isMine(squares[adjacentSquareKey]);
            }
            return result;
        }

        function markEmptyAdjacentSquares(square, squares){
            const neighbours = findValidNeighbours( squares, square.row, square.column);
            const nextSquares = [];
            for (let adjacentSquareKey of neighbours) {
                const adjacentSquare = squares[adjacentSquareKey];
                if (!minesAroundSqaure(adjacentSquare,squares) && !adjacentSquare.isMine && !adjacentSquare.revealed){
                    adjacentSquare.revealed = true;
                    nextSquares.push(adjacentSquare);
                }
            }
            for (let nextSqaure of nextSquares) {
                markEmptyAdjacentSquares(nextSqaure, squares);
            }
            return squares;
        }

        function markAllMines(squares){
            for (let key in squares){
                if (squares[key].isMine){
                    squares[key].revealed = true;
                    squares[key].content = Constants.MINE;
                }
            }
        }

        const newBoard = { ...squares};
        const currentSquare = newBoard[square.key];
        const gameIsOver = currentSquare.isMine || isGameEnded;

        if (gameIsOver) {
            markAllMines(newBoard);
        } else {
            const minesAroundSquare = minesAroundSqaure(square, newBoard);
            currentSquare.revealed = true;
            currentSquare.content = minesAroundSquare ? minesAroundSquare : Constants.EMPTY;
            if (!minesAroundSquare) {
                markEmptyAdjacentSquares(currentSquare, newBoard)
            }
        }

        return {
            squares: newBoard,
            gameIsOver
        };

    }
}

export default GameActionsUtils;
