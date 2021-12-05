import { render, fireEvent } from '@testing-library/react';
import Board from './Board';

it("should render", () => {
    render(<Board />)
});

beforeEach(function() {
    jest
      .spyOn(Math, "random")
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0);
});

afterEach(function() {
    Math.random.mockRestore();
});

it("should handle clicks correctly", () => {
    let {getByTestId} = render(<Board nrows={3} ncols={3} chanceLightStartsOn={false} />)
    let cell00 = getByTestId("0-0");
    let cell10 = getByTestId("1-0");
    let cell01 = getByTestId("0-1");
    fireEvent.click(cell00);
    expect(cell10).toHaveClass("Cell-lit");
    expect(cell01).toHaveClass("Cell-lit");
    fireEvent.click(cell00);
    expect(cell10).not.toHaveClass("Cell-lit");
    expect(cell01).not.toHaveClass("Cell-lit");
});
