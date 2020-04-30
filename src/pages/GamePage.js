import React from 'react';
import Board from '../containers/Board.js';
import queryString from 'query-string';

export default ({ location }) => {
    const props = queryString.parse(location.search);

    return <Board { ...props }/>;
};
