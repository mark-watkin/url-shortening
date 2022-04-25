import { Header } from './components/header';
import { UrlShorener } from './views/url-shortener';

function App() {
  return (
    <div className="App">
      <Header title="Primary Bid"/>
      <UrlShorener/>
    </div>
  );
}

export default App;
