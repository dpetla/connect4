import './App.css';
// import GameProvider from './Game.Context';
import Board from './components/Board';
// import { initialState } from './utils/helpers';

function App() {
  // const value = { state: initialState };
  return (
    <div className="App">
      {/* <GameProvider value={value}> */}
      <Board />
      {/* </GameProvider> */}
    </div>
  );
}

export default App;
