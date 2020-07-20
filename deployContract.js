require("dotenv").config("./env");
const Web3 = require("web3");
const BigNumber = require("bignumber.js");

//import abi and bytecode
const abi = require("./__ABI.json");
const { bytecode } = require("./__ByteCode.js");

//create web3 instance
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.URI));

//get the account object using privateKey
const account = web3.eth.accounts.privateKeyToAccount(
  process.env.PRIVATE_KEY
);

const Number = new BigNumber(5);
const SimpleContract = new web3.eth.Contract(abi);

//deploy the contract
const contractData = SimpleContract
  .deploy({
    data: `0x${bytecode}`,
    arguments: [Number],
  })
  .encodeABI();

web3.eth
  .estimateGas({ from: account.address, data: contractData })
  .then((gas) => {
    const rawTx = { from: account.address, gas, data: contractData };
    web3.eth.accounts
      .signTransaction(rawTx, account.privateKey)
      .then(({ rawTransaction, transactionHash }) => {
        console.log("rawtransaction", rawTransaction);
        console.log("transactionhash", transactionHash);
        web3.eth
          .sendSignedTransaction(rawTransaction)
          .on("receipt", console.log);

        waitForReceipt(transactionHash, (result) => {
          console.log("Deployed at: ", result.contractAddress);
        });
      });
  });


function waitForReceipt(hash, cb) {
  web3.eth.getTransactionReceipt(hash, function (err, receipt) {
    if (err) {
      console.error(err);
    }
    if (receipt) {
      if (cb) {
        cb(receipt);
      }
    } else {
      console.log("Waiting to get mined...");
      setTimeout(function () {
        waitForReceipt(hash, cb);
      }, 1000);
    }
  });
}
