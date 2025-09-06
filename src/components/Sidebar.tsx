// Sidebar.tsx
import './Sidebar.css';

interface SidebarProps {
  score: number;
  gameOver: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ score, gameOver }) => (
  <div className="sidebar">
    <h2>Snake Game</h2>
    <p><strong>Score:</strong> {score}</p>
    {gameOver && <p style={{ color: 'red' }}>Game Over!</p>}
    <hr />
    <p>Controls: Arrow Keys</p>
    <p>🍎 Apple = 10 pts</p>
    <p>🐸 Frog = 25 pts</p>
    <p>Avoid walls and yourself!</p>
  </div>
);

export default Sidebar;
