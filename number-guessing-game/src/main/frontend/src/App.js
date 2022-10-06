import React, { useState } from "react";
import { Button, Form, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import "./App.css";
import logoImage from "./logoImage.png";

function App() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [game, setGame] = useState();
  const [level, setLevel] = useState();
  const [userData, setUserData] = useState();
  const [gameId, setGameId] = useState();
  const [maskedNumber, setMaskedNumber] = useState();

  const easyLevel = function () {
    setLevel("easy");
  };

  const hardLevel = function () {
    setLevel("hard");
  };

  const startNewGame = async () => {
    let response = await fetch("/api/games/" + level, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let game = await response.json();
    setGame(game);
    setGameId(game.id);
    setMaskedNumber("*");
  };

  function getData(data) {
    setUserData(data.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Submmiting');
    console.log(userData);

    if (userData === "" || userData === undefined) {
      return;
    }

    let response = await fetch("/api/games/" + level + "/" + gameId + "/" + userData, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setGame(await response.json());
    userData === game.hiddenNumber ? setMaskedNumber(game.hiddenNumber) : setMaskedNumber("*")

    setUserData("");

  };

  function backToHome() {
    setGame(null);
  }

  return (
    <div className="App">
      {!game ? (
        <>
          <img className="App-logoImage" src={logoImage} alt="LogoImage" />
          <p className="App-chooseLevelTxt">Please choose level:</p>
          <ToggleButtonGroup className="App-radioButton" type="radio" name="options" defaultValue={1}>
            <ToggleButton className="App-easyLevelBtn" onClick={easyLevel} id="tbg-radio-1" value={level}> Easy </ToggleButton>
            <ToggleButton className="App-hardLevelBtn" onClick={hardLevel} id="tbg-radio-3" value={level}> Hard </ToggleButton>
          </ToggleButtonGroup>
          <br />
          <br />
          <Button className="App-playGameBtn" onClick={startNewGame}> Let's play </Button>
        </>
      ) : (
        <>
          <div className="App-containerFlex">
            <div className="App-homeNav App-column-1">
              <Button className="App-homeBtn" onClick={backToHome}>Home</Button>
            </div>
            <div className="App-column-2">
              <h2 className="App-gameHeaderTxt">Guess the number</h2>
              <h2 className="App-gameHeaderTries"> You have {game.triesLeft} tries left</h2>
              <h3 className="App-level">Level: {game.level} </h3>
              <h5 className="App-levelHint">{game.hint}</h5>
              <Form className='App-inputForm' onSubmit={handleSubmit} >
                {!game.userNumber ?
                  (<div className="App-guesses">Your guesses: </div>) :
                  (<div className="App-guesses">Your guesses: {game.userNumber.map((number) =>
                    (<h4 className="App-guessedNumbers">{number} </h4>))}
                  </div>)}
                <br />
                <Form.Group controlId="formNumberInput" className="App-form">
                  <Form.Control type="number" placeholder="Enter a number" onChange={getData} value={userData} />
                  <p className="App-gameStatus"> {game.status}</p>
                  {(() => {
                    if (game.triesLeft < 1 && !game.win) {
                      return (
                        <Modal show={handleShow} onHide={handleClose}>
                          <Modal.Header>
                            <Modal.Title>Sorry, you lost</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>Better luck next time!</Modal.Body>
                          <Modal.Footer>
                            <Button className="App-alertPopUp"
                              onClick={() => {
                                handleClose();
                                startNewGame();
                              }}>
                              Start new game
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      )
                    } else if (game.win) {
                      return (
                        <Modal show={handleShow} onHide={handleClose}>
                          <Modal.Header>
                            <Modal.Title>Congratulations!!! You won!!!</Modal.Title>
                          </Modal.Header>
                          <Modal.Footer>
                            <Button className="App-alertPopUp"
                              onClick={() => {
                                handleClose();
                                startNewGame();
                              }}>
                              Start new game
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      )
                    }
                  })()}
                  <br />
                </Form.Group>
                <Button className="App-btnSubmit" variant="primary" type="submit"
                  disabled={game.win || game.triesLeft === 0}>Submit</Button>
                <Button className="App-btnNewGame" onClick={startNewGame}>New Game</Button>
              </Form>
            </div>
            <div className="App-column-3">
              {!game.numberGuessHints ?
                (<p></p>) :
                (<div className="App-numberHints"><h2 id="numberHintsTitle">Hints</h2>{game.numberGuessHints.map((hint) =>
                  (<p id="hints">Hint: {hint}</p>))}
                </div>)}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
