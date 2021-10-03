import "./App.css";
import { useState, useEffect } from "react";
import Web3 from "web3";
// import { ethers, Contract } from "ethers";
import Store from "./contracts/Store.json";

function App() {
  const [state, setState] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadNetwork = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const [account] = await web3.eth.getAccounts();
        // const netId = await web3.givenProvider.networkVersion;
        const netId = await web3.eth.net.getId();
        console.log(netId);

        const contract = new web3.eth.Contract(
          Store.abi,
          Store.networks[netId].address
        );

        setState((state) => [...state, account, contract]);

        //listen for new events
        contract.events.buyEvent(
          {
            fromBlock: "latest",
          },
          function (error, event) {
            console.log(event);
            // setData((data) => [...data, {}]);
          }
        );
      } else {
        alert("install metamask");
      }
    };

    loadNetwork();
  }, []);

  const buy = async () => {
    const account = await state[0];
    const contract = await state[1];
    const value = Web3.utils.toWei("1");
    const tx = await contract.methods
      .buy("Freedom", value)
      .send({ from: account });

    // console.log(tx);
  };

  const sell = async () => {};

  return (
    <div className="App">
      <button onClick={() => buy()}>Buy Action</button>
      <button onClick={() => sell()}>Sell Action</button>
    </div>
  );
}

export default App;
