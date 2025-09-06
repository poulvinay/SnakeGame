// SnakeGame.tsx
import { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import Sidebar from './Sidebar';

const gridSize = 25;

interface Food {
  type: string;
  position: number[];
}

const getRandomPosition = () => [
  Math.floor(Math.random() * gridSize),
  Math.floor(Math.random() * gridSize),
];

const SnakeGame = () => {
  const [snake, setSnake] = useState([[10, 10]]);
  const [direction, setDirection] = useState([0, -1]);
  const [food, setFood] = useState<Food>({ type: 'apple', position: getRandomPosition() });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const moveSnake = () => {
    const head = [...snake[0]];
    head[0] += direction[0];
    head[1] += direction[1];

    if (
      head[0] < 0 || head[1] < 0 ||
      head[0] >= gridSize || head[1] >= gridSize ||
      snake.some(segment => segment[0] === head[0] && segment[1] === head[1])
    ) {
      setGameOver(true);
      return;
    }

    const newSnake = [head, ...snake];

    if (head[0] === food.position[0] && head[1] === food.position[1]) {
      setScore(score + (food.type === 'apple' ? 10 : 25));
      spawnFood(newSnake);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const spawnFood = (snakeBody: number[][]) => {
    let newPosition: number[];
    do {
      newPosition = getRandomPosition();
    } while (snakeBody.some(seg => seg[0] === newPosition[0] && seg[1] === newPosition[1]));

    const newType = Math.random() < 0.2 ? 'frog' : 'apple';
    setFood({ type: newType, position: newPosition });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) moveSnake();
    }, 150);

    return () => clearInterval(interval);
  }, [snake, direction, food, gameOver]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': setDirection([0, -1]); break;
        case 'ArrowDown': setDirection([0, 1]); break;
        case 'ArrowLeft': setDirection([-1, 0]); break;
        case 'ArrowRight': setDirection([1, 0]); break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="game-container">
      <GameBoard snake={snake} food={food} gridSize={gridSize} />
      <Sidebar score={score} gameOver={gameOver} />
    </div>
  );
};

export default SnakeGame;
