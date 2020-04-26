import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { squareClickedAction } from '../action';
import { getSquareSelector, getSquares } from '../selector';
import Constants from '../constants';

const Square = styled.td`
  height: 40px;
  width: 40px;
  border: 1px solid black;
  background-color: lightgrey;
  text-align: center;
  
  &.revealed{
      background-color: white;
  }
  
  i.fa-font-awesome-flag{
    color: red;
  }

`;

const SquareComponent = ({ square, squares, squareClicked }) => {

    const generateContent = content => {
        switch(content){
            case Constants.EMPTY: return;
            case Constants.MINE: return <i className={'fas fa-bomb'}></i>;
            case Constants.FLAG: return <i className={'fab fa-font-awesome-flag'}></i>;
            default: return content;
        }
    };

    const handleClick = event => {
        event.stopPropagation();
        squareClicked(square, squares, event);
    };

    const { content, revealed } = square;
    const className = revealed && content === Constants.EMPTY ? 'revealed' : '';

    return (
        <Square onClick={handleClick} className={className}>
            { generateContent(content) }
        </Square>
    );
}

const mapDispatchToProps = {
    squareClicked: squareClickedAction
};

const mapStateToProps = ( state, { row, column }) => ({
    square: getSquareSelector(state, {row, column}),
    squares: getSquares(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(SquareComponent);
