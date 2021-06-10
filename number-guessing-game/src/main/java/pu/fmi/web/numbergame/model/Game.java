package pu.fmi.web.numbergame.model;

import java.util.List;

public class Game {

	private String id;// game id
	private String level;// easy or hard
	private int hiddenNumber;// the number which the user have to guess
	private List<Integer> userNumber;// list of the numbers the user have submitted
	private int triesLeft = 5;
	private String hint;// Tells the user the range of numbers to guess
	private boolean win;// determine the status/e.g."Try again. You won. You lost."/
	private String status;// Shows if the user have guessed right
	private List<String> numberGuessHints;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getHiddenNumber() {
		return hiddenNumber;
	}

	public void setHiddenNumber(int hiddenNumber) {
		this.hiddenNumber = hiddenNumber;
	}

	public List<Integer> getUserNumber() {
		return userNumber;
	}

	public void setUserNumber(List<Integer> userNumber) {
		this.userNumber = userNumber;
	}

	public int getTriesLeft() {
		return triesLeft;
	}

	public void setTriesLeft(int triesLeft) {
		this.triesLeft = triesLeft;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getHint() {
		return hint;
	}

	public void setHint(String hint) {
		this.hint = hint;
	}

	public boolean isWin() {
		return win;
	}

	public void setWin(boolean win) {
		this.win = win;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<String> getNumberGuessHints() {
		return numberGuessHints;
	}

	public void setNumberGuessHints(List<String> numberGuessHints) {
		this.numberGuessHints = numberGuessHints;
	}

}