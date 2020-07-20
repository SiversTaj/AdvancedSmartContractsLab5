require("dotenv").config("./env");
const Web3 = require("web3");
const abi = require("./__ABI.json");

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.URI));

web3.eth.accounts.wallet.add(`0x${process.env.PRIVATE_KEY}`);

//get contract instance
const SimpleContract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);

//read the number
SimpleContract.methods
  .PrintNum()
  .call()
  .then((result) => {
    console.log(`The value of the number is: ${result}`);
  });

// call the add method of Smart Contract
SimpleContract.methods
  .AddNum(4)
  .estimateGas()
  .then((gas) => {
    console.log(gas);
    SimpleContract.methods.AddNum(4).send({
      from: web3.eth.accounts.wallet[0].address,
      gas,
    });
  });
