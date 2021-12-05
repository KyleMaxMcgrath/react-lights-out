import { render, fireEvent } from '@testing-library/react';
import Cell from './Cell';
import Board from './Board';

it("should render", () => {
    render(<Board><Cell /></Board>);
});