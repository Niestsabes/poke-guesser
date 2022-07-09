import { render, fireEvent, screen } from "@testing-library/react";
import APP_CONFIG from "../../../config/config";
import PokemonGuesser from "./PokemonGuesser";

test('renders PokemonGuesser component', () => {
    render(<PokemonGuesser/>);
});
  
test(`generates a valid pokemonId, which must be between 1 and ${APP_CONFIG.game.maxPokeId}`, () => {
    const instance = new PokemonGuesser();
    const firstDateStamp = 19000;
    for (let stamp = firstDateStamp; stamp < firstDateStamp + process.env.REACT_APP_GAME_CONFIG_ENCRYPT_FACTOR; stamp++) {
        let pokeId = instance.getPokemonId(firstDateStamp);
        expect(pokeId).toBeGreaterThanOrEqual(1);
        expect(pokeId).toBeLessThanOrEqual(APP_CONFIG.game.maxPokeId);
    }
});