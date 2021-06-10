package pu.fmi.web.numbergame.logic;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.commons.lang3.RandomUtils;
import org.springframework.stereotype.Service;

import pu.fmi.web.numbergame.model.Game;

@Service
public class GuessNumberServiceImpl implements GuessNumberService {
	static Random rand = new Random();
	public static final int[] NUMBERS_EASY = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

	public static final int[] NUMBERS_HARD = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
			48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
			75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100 };

	public Map<String, Game> games = new ConcurrentHashMap<>();

	List<Integer> numbers = new ArrayList<Integer>();
	List<String> guesses = new ArrayList<>();

	public static final String LEVEL_EASY = "easy";
	public static final String LEVEL_HARD = "hard";

	@Override
	public Game startNewGame(String level) {
		Game game = new Game();
		game.setId(UUID.randomUUID().toString());

		if (level.equals(LEVEL_EASY)) {
			int numberIndex = RandomUtils.nextInt(0, NUMBERS_EASY.length - 1);
			game.setHiddenNumber(NUMBERS_EASY[numberIndex]);
			game.setHint("Enter a number between 0 and 10");
			game.setLevel(LEVEL_EASY);
			game.setStatus("Gook luck! You have 5 tries!");
		} else {
			int numberIndex = RandomUtils.nextInt(0, NUMBERS_HARD.length - 1);
			game.setHiddenNumber(NUMBERS_HARD[numberIndex]);
			game.setHint("Enter a number between 0 and 100");
			game.setLevel(LEVEL_HARD);
			game.setStatus("Gook luck! You have 5 tries!");
		}
		numbers.clear();
		guesses.clear();
		game.setWin(false);
		games.put(game.getId(), game);

		return game;
	}

	@Override
	public Game getGame(String gameId) {
		return games.get(gameId);
	}

	@Override
	public void checkUsersInput(int userNumber, String gameId) {
		Game game = getGame(gameId);
		if (game.getTriesLeft() > 0 && game.getTriesLeft() <= 5 && game.isWin() == false) {
			if (userNumber == game.getHiddenNumber()) {
				game.setTriesLeft(game.getTriesLeft() - 1);
				numbers.add(userNumber);
				game.setUserNumber(numbers);
				game.setWin(true);
				game.setStatus("Congratulations!!! You won!!! ");
				return;
			} else {
				numbers.add(userNumber);
				game.setUserNumber(numbers);
				game.setTriesLeft(game.getTriesLeft() - 1);
				game.setStatus("Wrong!!! Try again. ");
				if (game.getTriesLeft() == 0) {
					game.setStatus("You lost!!!");
				}
			}

			if (userNumber < game.getHiddenNumber()) {
				guesses.add(userNumber + " is too low");
			} else {
				guesses.add(userNumber + " is too high");
			}
			game.setNumberGuessHints(guesses);

		}
	}
}
