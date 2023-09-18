/** Dependencies */

const solanaWeb3 = require('@solana/web3.js'); // back only
const nacl = require('tweetnacl'); // both
const { decodeUTF8 } = require('tweetnacl-util'); // both

// *****************************

/** FOR FRONTEND */

function generateSolAuthJSON(keypair, msgBase = 'AUTH', roundMs = 300000) {
  const wallet = keypair.publicKey.toBase58();
  const msg = msgBase + (Math.ceil(Date.now() / roundMs) * roundMs).toString();
  const signatureBytes = nacl.sign.detached(decodeUTF8(msg), keypair.secretKey);
  const signature = btoa(String.fromCharCode.apply(null, signatureBytes));
  return { wallet, signature };
}

// *****************************

/** FOR BACKEND */

function confirmSolAuthJSON(solAuthJSON, msgBase = 'AUTH', roundMs = 300000) {
  try {
    const signature = new Uint8Array(
      atob(solAuthJSON.signature)
        .split('')
        .map((c) => c.charCodeAt(0)),
    );
    const publicKey = new solanaWeb3.PublicKey(solAuthJSON.wallet);
    const msg = msgBase + (Math.ceil(Date.now() / roundMs) * roundMs).toString();
    return nacl.sign.detached.verify(decodeUTF8(msg), signature, publicKey.toBytes());
  } catch {
    return false;
  }
}

// *****************************

/** USAGE */

if (typeof require !== 'undefined' && require.main === module) {
  const keypair = solanaWeb3.Keypair.generate();

  const solAuthJSON = generateSolAuthJSON(keypair);
  const confirmResult = confirmSolAuthJSON(solAuthJSON);

  console.log(solAuthJSON);
  console.log(confirmResult);
}

// *****************************

module.exports = { generateSolAuthJSON, confirmSolAuthJSON };
