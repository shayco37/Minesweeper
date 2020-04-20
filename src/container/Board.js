import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { times } from 'lodash';
import styled from 'styled-components';
import Hashing from '../util/Hashing';
import { generateBoardSquares, restartGame } from '../action';
import { getMinesLeft, getSquares } from '../selector';
import { isGameOver, isGameEndedSuccessfully } from '../selector';
import SquareComponent from '../component/SquareComponent';
import GameIsOver from './gameover.png';
import PopcornSong from './PopcornOriginalSong.mp3';

const Header = styled.header`
  color: white;
  > h1{
    margin: 0 auto;
    width: 8em;
  }
`;

const CenterContainer = styled.div`
  height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BoardFrame = styled.div`
  display:flex;
  background-color: black;
  color: black;
  &> table{     
    flex: none;
    position: relative;
    background-color: lightblue; 
    margin: 0 auto;  
  }
`;

const Instructions = styled.section`
  font-size: 18px;
`;

const Img = styled.div`
  flex-grow:1;
  width: 560px;
  height: 260px;
  background-image: url(${GameIsOver});
  background-size: contain;
`;

const GameOver = () => (<Img />);

const Board = ({ rows, columns, mines, gameIsOver, gameEndedSuccessfully, restartGame, ...props}) => {
    const [ audio, setAudio ] = useState({ play: () => {}, pause: () => {} })
    const { squares, minesLeft, generateBoardSquares } = props;
    const history = useHistory();

    useEffect( () => {
            generateBoardSquares(rows, columns, mines);
            console.log('start audio');
            const audio = new Audio(PopcornSong);
            audio.play();
            setAudio(audio);
        }, [rows, columns, mines]
    );

    useEffect( () => {
            if (gameIsOver){
                audio && audio.pause && audio.pause();
                setAudio({});
                document.addEventListener('keypress', handleKeyPressed, true);
            }
        }, [ gameIsOver]
    );

    const handleKeyPressed = () => {
        if (gameIsOver){
            restartGame();
            document.removeEventListener('keypress', handleKeyPressed, true);
            history.push('/setup');
        }
    };

    const filterRow = row => {
        const result = [];
        for (let column = 0; column < columns; column++ ){
            const hash = Hashing.hash(column, row);
            result.push(squares[hash]);

        }
        return result;
    };

    const renderRow = row => {
        const squares = filterRow(row);
        return (
            <tr>
                {
                    squares.map(square => (
                     <SquareComponent { ...square }/>
                    ))
                }
            </tr>
        );
    };
    const renderRows = () => {
      return (
          <React.Fragment>
              {
                  times ( rows, index =>
                    renderRow(index))
              }
          </React.Fragment>);
    };
    return  (
        <CenterContainer>
            { !gameIsOver ?
                <Header>
                    <h1>Mines Left: {minesLeft}</h1>
                </Header> :
                <Header>
                    <h2>{ gameEndedSuccessfully? 'Well Played': 'Oops'} </h2>
                    <h2>Press any key to start a new game</h2>
                </Header>
            }
            <BoardFrame>
                { gameIsOver && <GameOver/> }
                <table>
                    { renderRows() }
                </table>
                { gameIsOver && <GameOver/> }
            </BoardFrame>
            <Instructions>
                <ul>
                    <li>Click on sqaure to reveal its content</li>
                    <li>Press SHIFT while clicking to put a flag on a possible mine</li>
                </ul>
            </Instructions>
        </CenterContainer>
    );
};
const mapDispatchToPros = {
  generateBoardSquares,
  restartGame
};

const mapStateToProps = state => ({
   squares: getSquares(state),
   minesLeft: getMinesLeft(state),
   gameIsOver: isGameOver(state),
   gameEndedSuccessfully: isGameEndedSuccessfully(state)
});
export default connect(mapStateToProps, mapDispatchToPros)(Board);
