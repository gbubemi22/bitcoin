const { PrivateKey } = require('bitcore-lib')

const { mainnet } = require('bitcore-lib/lib/networks');
const Memonici = require('bitcore-mnemonic')


const createWallet = (network = mainnet) => {
     const privateKey = new PrivateKey();
     const address = privateKey.toAddress(network);

     return {
          privateKey: privateKey.toString(),
          address: address.toString(),
     };
};


// HD WALLET
const createHDWallet = (network = mainnet) => {
     const passPhrase = new Memonici(Memonici.Words.SPANISH);
     const xpriv = passPhrase.toHDPrivateKey(passPhrase.toString(), network);


     return {
          xpub: xpriv.xpubkey,
          privateKey: xpriv.privateKey.toString(),
          address: xpriv.publicKey.toAddress().toString(),
          mnmonic: passPhrase.toString(),
     };
};


module.exports = {
     createWallet,
     createHDWallet
}