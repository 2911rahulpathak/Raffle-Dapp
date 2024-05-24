const axios = require("axios");
const ethers = require("ethers");
const LotteryABI = require("./LotteryABI.json");

const lottery = "0xA2090Bccdd80Edf0eF9d7651A3324ec3Cba1eA46";
const rpc = "https://rpc.ankr.com/arbitrum_sepolia";
const provider = new ethers.providers.JsonRpcProvider(rpc);
const key = ""; //prvate key here
const wallet = new ethers.Wallet(key, provider);
const apikey =
  "2zN7CyuJcCDVb3njyk3roI9d7ZmtINJ7xqybTmsJYPUG9WXHYHtLtzyNC9AIzIBX"; //api key
const url =
  "https://data.mongodb-api.com/app/data-tuxeyfq/endpoint/data/v1/action/";
const contract = new ethers.Contract(lottery, LotteryABI, wallet);

const getDrawTimer = async () => {
  try {
    const response = await axios.post(
      url + "findOne",
      {
        collection: "lottoTimer",
        database: "n2DLotto-Tutorial",
        dataSource: "Cluster0",
        filter: {
          name: "interval",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": apikey,
        },
      }
    );
    const output = response.data;
    return output;
  } catch (error) {
    console.error(
      "Error fetching draw timer:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const storeTime = async (timeleft) => {
  try {
    const response = await axios.post(
      url + "updateOne",
      {
        collection: "lottoTimer",
        database: "n2DLotto-Tutorial",
        dataSource: "Cluster0",
        filter: { name: "interval" },
        update: {
          $set: { time: timeleft },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": apikey,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error storing time:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const openLotto = async () => {
  await contract
    .openLottery()
    .then((result) => {
      console.log("complete");
      return "complete";
    })
    .catch((error) => {
      console.log("error calling function");
    });
};

const closeLotto = async () => {
  await contract
    .closeLottery()
    .then((result) => {
      console.log("complete");
      return "complete";
    })
    .catch((error) => {
      console.log("error calling function");
    });
};

const drawNumbers = async () => {
  await contract
    .drawNumbers()
    .then((result) => {
      console.log("complete");
      return "complete";
    })
    .catch((error) => {
      console.log("error calling function");
    });
};

const countWinners = async () => {
  await contract
    .countWinners()
    .then((result) => {
      console.log("complete");
      return "complete";
    })
    .catch((error) => {
      console.log("error calling function");
    });
};

const currentLotto = async () => {
  const output = await contract.currentLotteryId().catch((error) => {
    console.log("error calling function");
  });
  const lottoId = output.toString();
  return lottoId;
};

const getBalance = async () => {
  const output = await contract.getBalance().catch((error) => {
    console.log("error calling function");
  });
  const balance = output.toString();
  return balance;
};

const getDrawJackpot = async () => {
  const output = await contract.currentLotteryId().catch((error) => {
    console.log("error calling function");
  });
  const lottoId = output.toString();
  const lottodata = await contract.viewLottery(lottoId).catch((error) => {
    console.log("error calling function");
  });
  return lottodata;
};

const getLotteryInfo = async (lottoId) => {
  const lottodata = await contract.viewLottery(lottoId).catch((error) => {
    console.log("error calling function 10");
  });
  return lottodata;
};

const viewTickets = async (ticketId) => {
  const ticketdata = await contract.viewTickets(ticketId).catch((error) => {
    console.log("error calling function 11");
  });
  return ticketdata;
};

module.exports = {
  getDrawTimer,
  storeTime,
  openLotto,
  closeLotto,
  drawNumbers,
  countWinners,
  currentLotto,
  getBalance,
  getDrawJackpot,
  getLotteryInfo,
  viewTickets,
};
