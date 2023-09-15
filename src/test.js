const solanaWeb3 = require('@solana/web3.js'); // back only

const { generateSolAuthJSON, confirmSolAuthJSON } = require('./index.js');

const keypair = solanaWeb3.Keypair.generate();

const solAuthJSON = generateSolAuthJSON(keypair);
const confirmResult = confirmSolAuthJSON(solAuthJSON);

console.log(confirmResult ? 'TEST SUCCESS' : 'TEST ERROR');
