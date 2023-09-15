# SolAuthJSON

**`sol-auth-json`** is a Node.js package for generating and confirming Solana authentication JSON objects. It provides functions for both the frontend and backend, making it easy to secure Solana transactions and authenticate users.

## Installation

You can install sol-auth-json using Yarn with the following command:

```sh
yarn add lexxxell/sol-auth-json
```

## Dependencies

Before using sol-auth-json, ensure you have the following dependencies installed in your project:

- `@solana/web3.js`: Required for backend usage.
- `tweetnacl`: Required for both frontend and backend.
- `tweetnacl-util`: Required for both frontend and backend.

You can install these dependencies using `yarn` or `npm` as needed.

## Frontend Usage

The following function is available for use in frontend applications:

```js
generateSolAuthJSON(keypair, (msgBase = 'AUTH'), (roundMs = 300000));
```

Generate a Solana authentication JSON object.

- `keypair`: A Solana keypair object, typically generated using solanaWeb3.Keypair.generate().
  msgBase (optional): A string prefix for the message (default is 'AUTH').
- `roundMs` (optional): The rounding interval in milliseconds (default is 300,000 ms or 5 minutes).
  Returns an object with the following properties:
- `wallet`: The public key of the wallet in Base58 encoding.
- `signature`: The authentication signature in Base64 encoding.

## Backend Usage

The following function is available for use in backend applications:

confirmSolAuthJSON(solAuthJSON, msgBase = 'AUTH', roundMs = 300000)

**Confirm a Solana authentication JSON object.**

- `solAuthJSON`: The Solana authentication JSON object generated using generateSolAuthJSON.

- `msgBase` (optional): A string prefix for the message (default is 'AUTH').

- `roundMs` (optional): The rounding interval in milliseconds (default is 300,000 ms or 5 minutes).

Returns `true` if the authentication JSON is valid, `false` otherwise.

## Example

```js
const solanaWeb3 = require('@solana/web3.js');
const { generateSolAuthJSON, confirmSolAuthJSON } = require('sol-auth-json');

// Generate a Solana keypair
const keypair = solanaWeb3.Keypair.generate();

// Generate Solana authentication JSON
const solAuthJSON = generateSolAuthJSON(keypair);

// Confirm Solana authentication JSON
const confirmResult = confirmSolAuthJSON(solAuthJSON);

console.log(solAuthJSON);
console.log(confirmResult);
```

## License

This package is distributed under the MIT License. Feel free to use it in your projects and contribute to its development. If you encounter any issues or have suggestions, please open an issue on the GitHub repository.
