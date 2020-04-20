import React, { Component } from 'react';
import Square from '../component/SquareComponent.js';

class Utility{
    /**
     * Created by cohsh01 on 4/27/2017.
     */
    static hash(column, row) {
        return column+'-'+row;
    }

    static unHash(hash) {
        let column = Number(hash.substr(0,hash.indexOf('-')));
        let row = Number(hash.substr(hash.indexOf('-')+1, hash.length));
        return {
            'column': column,
            'row': row
        }
    }
};

/*
  Main class, generating board with squares in it.
  Each square is independent cell with its own state
 */

class BoardBak extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mines: props.mines,
            flags: props.mines,
            rows: [],
            gameEnded: false
        };

        this.children = new Map();
    }

    componentDidMount() {
        const { width, height, mines } = this.props;
        this.constructBoard(width, height, mines);
    }

    registerChild(child, hash) {
        this.children.set(hash, child);
    }

    childSelected(child, shiftPressed) {
        if (!this.gameHasEnded()) {
            if (shiftPressed) {
                let state =  child.toggleFlag();
                if (state === false) {
                    this.removeFlag()
                } else {
                    if (!this.putFlag()) {
                        child.toggleFlag(true);
                    }
                }
            } else {
                if (child.isFlagged()) {
                    return;
                } else if (child.isAMine()) {
                    child.showMine();
                    setTimeout(function() {this.boom();}.bind(this), 100);
                } else {
                    this.revealSquareInformation(child, child.getHash());
                }
            }
        }
    }

    showMines() {
        for (var [key, cell] of this.children.entries()) {
            if (key && cell.isAMine()) {
                cell.showMine();
            }
        }
    }

    hideMines() {
        for (var [key, cell] of this.children.entries()) {
            if (key && cell.isAMine()) {
                cell.hideMine();
            }
        }
    }

    startNewGame(width, height, mines) {
        this.rows = [];
        this.children = new Map();
        this.constructBoard(width, height, mines);
        this.setState((prevState) => {
            prevState.flags = mines;
        prevState.mines = mines;
        return prevState;
    });
    }

    boom() {
        this.setState((prevState) => {
            prevState.gameEnded = true;
        return prevState;
    });
        window.alert('Better luck next time, please reload to start new game');
    }

    gameHasEnded() {
        return this.state.gameEnded;
    }

    addChild(square, hash) {
        this.children.set(hash, square);
    }

    checkIfGameHasEnded() {
        let numOfCorrectFlags = 0;
        for (var [key, cell] of this.children.entries()) {
            if (key && cell.isAMine() && cell.isFlagged()) {
                numOfCorrectFlags++;
            }
        }
        if (numOfCorrectFlags === Number(this.state.mines)) {
            this.setState((prevState) => {
                prevState.gameEnded = true;
            return prevState;
        });
            window.alert('You are the best .... all mines have been revealed !!!');
        }
    }

    putFlag() {
        if (this.state.flags > 0) {
            this.setState((prevState) => {
                prevState.flags--;
            return prevState;
        });
            if (this.state.flags === 1) {
                setTimeout(function(){ this.checkIfGameHasEnded() }.bind(this), 100);
            }
            return true;
        } else {
            window.alert("No more flags remained");
            return false;
        }
    }

    removeFlag() {
        this.setState((prevState) => {
            prevState.flags++;
        return prevState;
    });
    }

    getNearbyMines(hash) {
        let result = 0;
        let cell = this.children.get(hash);

        if (cell) {
            let nearbyMines = cell.getNearbyMines();
            if (nearbyMines !== null) {
                return nearbyMines;
            } else {
                let pos = Utility.unHash(hash);
                let child;
                for (let i = pos.column-1; i < pos.column+2; i++) {
                    for (let j = pos.row-1; j < pos.row+2; j++) {
                        if (i !== pos.column || j !== pos.row) {
                            child = this.children.get(Utility.hash(i, j));
                            result += (child && child.isAMine()) ? 1 : 0;
                        }
                    }
                }
                cell.updateNearbyMines(result);
            }
        }

        return result;
    }

    /**
     * generate location of mines and store it in object (using hash)
     * @param width
     * @param height
     * @param mines
     * @returns {Array}
     */
    generateRandomMines(width, height, mines) {
        if (mines > width*height) {
            throw new Error("Too many mines provided");
        }
        let mineList = [];
        let column;
        let row;
        let hashStr;
        while(mines) {
            column = Math.trunc(Math.random()*width);
            row = Math.trunc(Math.random()*height);
            hashStr = Utility.hash(column, row);
            if (!mineList[hashStr]) {
                mineList[hashStr] = true;
                mines--;
            }
        }
        return mineList;
    }
    /**
     * Generate a mapping of all cells with mines
     * @param width
     * @param height
     * @param mines
     * @returns {*}
     */
    constructBoard(width, height, mines) {
        let rows = [];
        let mineList = this.generateRandomMines(width, height, mines);
        let isMine = false;
        let hashStr;
        for (let i = 0; i < width; i++) {
            let row = [];
            for (let j = 0; j < height; j++) {
                hashStr = Utility.hash(i,j);
                isMine = (mineList[hashStr])? true : false;
                row.push(<Square key={hashStr} parent={this} isMine={isMine} hash={hashStr}
                register={this.registerChild.bind(this)}
                click={this.childSelected.bind(this)}/>);
            }
            rows.push(<tr key={i.toString()}>{row}</tr>);
        }
        this.setState({ rows });
    }

    revealCellsIfEmpty(hashSet) {
        let result = [];
        let hashStr;
        let cell;
        for(let i = 0; i < hashSet.length; i++) {
            hashStr = hashSet[i];
            if (this.getNearbyMines(hashStr) === 0){
                cell = this.children.get(hashStr);
                if (cell) {
                    if (!cell.visited && cell.reveal()) {
                        cell.visited = true;
                        result.push(hashStr);
                    }
                }
            }
        }
        return result;
    }

    notifyNearbyCells(hash){
        let pos = Utility.unHash(hash);
        let hashSet = [];
        let hashResult;

        hashSet.push(Utility.hash(pos.column - 1, pos.row));
        hashSet.push(Utility.hash(pos.column, pos.row - 1));
        hashSet.push(Utility.hash(pos.column + 1, pos.row));
        hashSet.push(Utility.hash(pos.column, pos.row + 1));

        while(hashSet && hashSet.length > 0) {
            hashResult = this.revealCellsIfEmpty(hashSet);
            hashSet = [];
            if (hashResult && hashResult.length > 0) {
                for (let i = 0; i < hashResult.length; i++) {
                    pos = Utility.unHash(hashResult[i]);
                    hashSet.push(Utility.hash(pos.column - 1, pos.row));
                    hashSet.push(Utility.hash(pos.column, pos.row - 1));
                    hashSet.push(Utility.hash(pos.column + 1, pos.row));
                    hashSet.push(Utility.hash(pos.column, pos.row + 1));
                }
            }

        }
    }

    revealSquareInformation(square, hash) {
        let result = this.getNearbyMines(hash);
        if (result !== 0) {
            square.updateValue(result);
        } else {
            square.reveal();
            this.notifyNearbyCells(hash);
        }
    }

    render()
    {
        const { rows } = this.state;
        return (
            <div>
            <p>Flags Left: {this.state.flags}</p>
    <table className="board">
        <tbody>
            {rows}
        </tbody>
        </table>
        </div>
    );
    }
}

export default BoardBak;

