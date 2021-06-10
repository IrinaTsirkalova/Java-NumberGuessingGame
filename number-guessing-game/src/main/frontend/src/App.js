import React, { useState } from "react";
import { Button, Form,ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import "./App.css";
import logoImage from  "./logoImage.png";

function App(){

  const [game, setGame] = useState();
  const [level, setLevel] = useState();
  const [userData, setUserData] = useState();
  const [gameId, setGameId] = useState();
  const[maskedNumber, setMaskedNumber] = useState();

  const easyLevel = function () {
    setLevel("easy");
  };

  const hardLevel = function () {
    setLevel("hard");
   };

  const startNewGame = async () => {
    let response = await fetch("/api/games/"+ level, {
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

  function getData(data){
    setUserData(data.target.value);
  };
  
 
  const handleSubmit = async (event) => {
    event.preventDefault();
   
    console.log('Submmiting');
    console.log(userData);

    let response = await fetch("/api/games/"+ level+"/"+gameId+"/"+userData, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setGame(await response.json());
    userData == game.hiddenNumber ? setMaskedNumber(game.hiddenNumber) : setMaskedNumber("*")
   
    setUserData("");
    
  };

  function backToHome(){
    setGame(null);
  }


  return (
    <div className="App">
      {!game ? (

        <>
          <h1 className = "App-headerText">Welcome! This is a number guessing game.</h1>
          <img className = "App-logoImage" src={logoImage} alt="LogoImage"/>
          <p className = "App-chooseLevelP1">Please choose level:</p>
          <ToggleButtonGroup className = "App-radioButton" type="radio" name="options" defaultValue={1}>
                <ToggleButton className = "App-easyLevel" onClick={easyLevel} id="tbg-radio-1" value={level}> Easy </ToggleButton>
                <ToggleButton  className = "App-hardLevel" onClick={hardLevel} id="tbg-radio-3" value={level}> Hard </ToggleButton>
          </ToggleButtonGroup>
          <br/>
          <br/>
          <Button className = "App-playGameButton" onClick={startNewGame}> Let's play </Button>
        </>

      ) : (
        <>
       <div className="App-homeNav"> 
         <Button  className = "App-buttonHome" onClick= {backToHome}>Home</Button>
         <br/>
          <h4 className = "App-hiddenNumber">The hidden number: {game.hiddenNumber}</h4>
       </div>
         
          <h1  className= "App-gameHeaderText">Guess the number. You have {game.triesLeft} tries left </h1>
          {!game.numberGuessHints ?
             (<p></p>) : 
             (<div className="App-numberHints"><h2>Hints</h2>{game.numberGuessHints.map((hint)=>
                (<p>Hint: {hint}</p>))}
              </div>)}    
          <br/>
          <br/>
          <br/>
          <h2 className= "App-level">Level: {game.level} </h2>
          <br/>
          <br/>
          <h4 className= "App-hint">{game.hint}</h4>
          <br/>
          <br/>
          <h3>{maskedNumber}</h3>
          {!game.userNumber ? 
            (<h3 className = "App-guesses">Your guesses: </h3>) :
            (<div className = "App-guesses">Your guesses: {game.userNumber.map((number)=> 
                (<h4  className="App-guessedNumbers">{number} </h4>))}
          </div>) }
         
          <br/>
            <Form  className = 'App-inputForm' onSubmit = {handleSubmit} >
              <Form.Group controlId="formNumberInput" className = "App-form">
                 <Form.Control type="number" placeholder="Enter a number" onChange = {getData} value = {userData}/>
                 <p className="App-status"> {game.status}</p>
                 <br/>
              </Form.Group>
            
              <Button  className = "App-buttonSubmit" variant="primary" type="submit"
               disabled={game.win || game.triesLeft === 0}>Submit</Button>
              <Button  className = "App-buttonNewGame" onClick= {startNewGame}>New Game</Button>
              
            </Form>     

                 
        </>
      )}
    </div>
  );
}

export default App;
