import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { ethers } from "ethers";
import PredictionMarket from "./artifacts/contracts/PredictionMarket.sol/PredictionMarket.json";
import "./App.css";

const isMetamask = typeof window.ethereum !== "undefined";
const SIDE = {
  ALPHA: 0,
  BETA: 1,
};

function App() {
  const [predictionMarket, setPredictionMarket] = useState(undefined);
  const [myBets, setMyBets] = useState(undefined);

  const requestAccount = async () => {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    return account;
  };

  const placeBet = async (side, e) => {
    e.preventDefault();
    // if (!e.target.elements[0].value) return;

    if (isMetamask) {
      console.log("metamaskkkkkkkkkk");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const accoutAddress = await requestAccount();
      console.log(accoutAddress);
      const contract = new ethers.Contract(
        accoutAddress[0],
        PredictionMarket.abi,
        signer
      );

      try {
        const transaction = await contract.placeBet(side, {
          value: e.target.elements[0].value,
        });
        alert("Place bet success " + transaction);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <h1 className="text-center">Prediction Market</h1>
          <div className="jumbotron">
            <h1 className="display-4 text-center">
              Who will win the election?
            </h1>
            <p className="lead text-center">Current odds</p>
            <div>{/* <Pie data={betPredictions} /> */}</div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <div className="card">
            <img src="./img/trump.png" />
            <div className="card-body">
              <h5 className="card-title">Alpha</h5>
              <form
                className="form-inline"
                onSubmit={(e) => placeBet(SIDE.ALPHA, e)}
              >
                <input
                  type="text"
                  className="form-control mb-2 mr-sm-2"
                  placeholder="Bet amount (ether)"
                />
                <button type="submit" className="btn btn-primary mb-2">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="card">
            <img src="./img/biden.png" />
            <div className="card-body">
              <h5 className="card-title">Beta</h5>
              <form className="form-inline">
                <input
                  type="text"
                  className="form-control mb-2 mr-sm-2"
                  placeholder="Bet amount (ether)"
                />
                <button type="submit" className="btn btn-primary mb-2">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <h2>Your bets</h2>
        <ul>
          {/* <li>Biden: {myBets[0].toString()} ETH (wei)</li>
          <li>Trump: {myBets[1].toString()} ETH (wei)</li> */}
        </ul>
      </div>

      <div className="row">
        <h2>Claim your gains, if any, after the election</h2>
        <button
          type="submit"
          className="btn btn-primary mb-2"
          // onClick={(e) => withdrawGain()}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
