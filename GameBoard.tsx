// GameBoard.tsx
import './GameBoard.css';

interface GameBoardProps {
  snake: number[][];
  food: { type: string; position: number[] };
  gridSize: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ snake, food, gridSize }) => {
  const renderCells = () => {
    const cells = [];

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const isSnake = snake.some(seg => seg[0] === x && seg[1] === y);
        const isFood = food.position[0] === x && food.position[1] === y;
        const cellClass = isSnake
          ? 'cell snake'
          : isFood
          ? `cell food ${food.type}`
          : 'cell';

        cells.push(<div key={`${x}-${y}`} className={cellClass} />);
      }
    }

    return cells;
  };

  return <div className="board">{renderCells()}</div>;
};

export default GameBoard;
