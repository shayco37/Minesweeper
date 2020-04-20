import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Board from '../container/Board.js';
import queryString from 'query-string';

export default function() {
    const location = useLocation();
    const props = queryString.parse(location.search);
    // const audio = new Audio(PopcornSong);
    // audio.play();
    //
    // useEffect( () => audio.play(), () => audio.stop());
    return <Board { ...props }/>;
};
