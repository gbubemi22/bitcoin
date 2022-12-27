const { testnet, mainnet } = require('bitcore-lib/lib/networks')
const { createWallet, createHDWallet } = require('./wallect.bitcoin');
const sendBitcoin = require("./send.bitcoin");

sendBitcoin("n1537J8qgkgWQuCTSCqCh8hXqU1Sgi4KMU'", 0.0001)
     .then((result) => {
          console.log(result);
     })
     .catch((err) => {
          console.log(err);
     });

//console.log(createWallet(testnet));
//console.log(createHDWallet(testnet));

