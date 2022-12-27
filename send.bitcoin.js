// sending Bitcoin
const axios = require('axio')
const bitcore = require('bitcore-lib')

module.exports = sendBitcoin = async (reciverAddress, amountTosend) => {
     try {
          const sochain_network = " BTCTEST";
          const privateKey = "4b48e0d11b191b5e685359b09747c9c24f79834fca273edf9e5e9767011a36b8";
          const sourcesAddress = "1GwB4FCSbSxwvsaNtykfxp76DGqaGfWGUP";
          const satoShiToSend = amountTosend * 100000000;
          let fee = 0;
          let inputeCount = 0;
          let outputCount = 2;

          const response = await axios.get(
               `https://sochain.com/api/v2/get_tx_unspent/${sochain_network}/${sourcesAddress}`
          );

          const recomendedFee = await axios.get(
               "https://bitcoinfees.earn.com/api/v1/fees/ "
          );

          const transaction = new bitcore.Transaction();
          let totalAmountAvilable = 0;

          let inputs = [];
          let utxos = response.data.data.txs;

          for (const element of utxos) {
               let utxo = {};
               utxos.statochis = Math.floor(Number(element.value) * 100000000);
               utxo.script = element.script_hex;
               utxo.address = response.data.data.address;
               utxo.txId = element.txId;
               utxo.outputIndex = element.output_no;
               totalAmountAvilable += satoshis;
               inputeCount += 1;
               inputs.push(utxo);
          }


          /**
           * In a bitcoin transaction, the inputs contribute 180 bytes each to the transaction,
           * while the output contributes 34 bytes each to the transaction. then there is an extra 10 bytes you add or subtract
           * from the transaction as well
           */

          const transactionSize =
               inputeCount * 180 + outputCount * 34 + 10 - inputeCount;

          fee = transactionSize * recomendedFee.data.hourFee / 3; //satoshi per byte
          if (totalAmountAvilable - satoShiToSend - fee < 0) {
               throw new Error("Balance is too low for this transaction")
          }
          // Set transaction input
          transaction.from(inputs)

          // Set the reciving address and the amount to send
          transaction.to(reciverAddress, satoShiToSend)

          // Set change address - Address to receive the change left over funds after transfer

          transaction.change(sourcesAddress);
          console.log(satoShiToSend, fee);

          //manually set transaction fees: 20 satochis per byte
          transaction.fee(Math.round(fee));

          // Sign transaction with your private key
          transaction.sign(privateKey);

          console.log(transaction.serialize());
          // serialize transactions

          const serializedTransaction = transaction.serialize();
          // send transaction
          const result = await axios({
               method: "POST",
               url: `https://sochain.com/api/v2/send_tx/${sochain_network}`,
               data: {
                    tx_hex: serializedTransaction,
               },
          })
          return result.data.data;
     } catch (error) {
          return error;
     }
}