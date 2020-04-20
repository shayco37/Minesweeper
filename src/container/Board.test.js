import React from 'react';
import ReactDom from 'react-dom';
import Board from './Board';

it('should generate mine Set', () => {
    const div = document.createElement('div');
    ReactDom.render(<Board columns={8} rows={8} mines={16}/>, div);
    ReactDom.unmountComponentAtNode(div);
})