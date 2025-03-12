import './App.css';
import Game from './components/Game';
import {BrowserView, MobileView} from 'react-device-detect';
import SorryImg from './images/sorry.png';

function App() {
  return (
    <div className="App">
      <BrowserView className="App-header">
        <Game />
      </BrowserView>
      <MobileView>
        <div className="Mobile-view">
          <img src={SorryImg}/ >
        </div>
      </MobileView>
    </div>
  );
}

export default App;
