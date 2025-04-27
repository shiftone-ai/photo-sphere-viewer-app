import './App.css';
import PanoramaViewer from './PanoramaViewer.js'


function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>

      <div>
        <PanoramaViewer imageUrl="assets/panoramas/panorama01.jpg"></PanoramaViewer>
      </div>

    </div>
  );
}

export default App;
