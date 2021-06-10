package pu.fmi.web.numbergame.logic;

import pu.fmi.web.numbergame.model.Game;

public interface GuessNumberService {

	Game startNewGame(String level);

	Game getGame(String gameId);

	void checkUsersInput(int userNumber, String gameId);

}
