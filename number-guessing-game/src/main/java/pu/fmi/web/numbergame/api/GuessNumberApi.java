package pu.fmi.web.numbergame.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pu.fmi.web.numbergame.logic.GuessNumberService;
import pu.fmi.web.numbergame.model.Game;

@RestController
@RequestMapping("/api")
public class GuessNumberApi {

	@Autowired
	private GuessNumberService guessNumberService;

	@PostMapping("/games/{level}")
	public Game createGame(@PathVariable String level) {

		return guessNumberService.startNewGame(level);
	}

	@PostMapping("/games/{level}/{gameId}/{userNumber}")
	public Game getGameNumber(@PathVariable String level, @PathVariable String gameId, @PathVariable int userNumber) {

		guessNumberService.checkUsersInput(userNumber, gameId);

		return guessNumberService.getGame(gameId);
	}

}