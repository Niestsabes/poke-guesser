import './App.css';
import AppHeader from './app/features/Header/AppHeader';
import AppFooter from './app/components/AppFooter/AppFooter';
import PokemonGuesser from './app/features/PokemonGuesser/PokemonGuesser';

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
