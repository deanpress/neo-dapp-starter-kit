const neon = require('@cityofzion/neon-js');
const Neon = neon.default;
const node = require('./blockchain')
const config = require('./config')
const account = Neon.create.account(config.wif)

// Invoke a smart contract with a method and an array of strings
node.invokeContract('WriteToStorage', ['someStorageKey', 'Hello World!'], account, (res) => {
    if (res.result === true) {
        // Transaction successful. The stored data can be retrieved on the next block.
        console.log('Transaction processed!')
    } else {
        console.log('Transaction has not been processed.')
    }
})

// Get a storage key
node.getStorage('someStorageKey').then((res) => {
    if (typeof res === "string") {
        //Do something with the resulting value
    }
})

// Test a transaction. This returns expected values from your smart contract, and doesn't send a transaction. Costs 0 gas.
// Note: These are not signed transactions, so it doesn't return data that uses a sender's address.
node.testContract('WriteToStorage', ['someStorageKey', 'Hello World!'], (res) => {
    console.dir(res)
})
