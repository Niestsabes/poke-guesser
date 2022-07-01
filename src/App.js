import './App.css';
import AppHeader from './app/components/AppHeader/AppHeader';
import AppFooter from './app/components/AppFooter/AppFooter';
import PokemonGuesser from './app/features/PokemonGuesser/PokmonGuesser';

function App() {
  return (
    <div className="App">
      <AppHeader></AppHeader>
      <main>
        <PokemonGuesser></PokemonGuesser>
      </main>
      <AppFooter></AppFooter>
    </div>
  );
}

export default App;
