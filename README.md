NEO dApp Starter Kit on [Neon-JS](https://github.com/CityOfZion/neon-js)
---

**Ready-to-go functions for interacting with Smart Contracts on the NEO Blockchain using NodeJS and the neon-js package**

## Instructions:

1. Clone this git repository
2. Run `npm install`
3. Edit `config.js` accordingly with your desired REST endpoint, WIF, and smart contract script hash.
4. Check the methods in `index.js`, `util.js`, and `blockchain.js` for reference

## Functions:

**Invoke a smart contract with a method and an array of strings:**
```ecmascript 6
node.invokeContract('SetTask', ['someStorageKey', 'Hello World!'], account, (res) => {
    if(res.result === true){
        // Transaction successful. The stored data can be retrieved on the next block.
        // You can also test your transaction with the arguments data to instantly return a result:
        console.log('Transaction processed!')
    }else{
        console.log('Transaction has not been processed.')
    }
})
```

**Return a stored value from a smart contract by key:**
```ecmascript 6
node.getStorage('someStorageKey').then((res) => {
    if (typeof res === "string") {
        //Do something with the resulting value
    }
})
```

**Test a transaction. This returns expected values from your smart contract, and doesn't send a transaction. Costs 0 gas.**
Note: `testContract` does not emit signed transactions, so it doesn't return data that uses a sender's address.
```ecmascript 6
node.testContract('SetTask', ['someStorageKey', 'Hello World!'], (res) => {
    console.dir(res)
})
```

## Credits

* **Dean van Dugteren** ([LinkedIn](https://www.linkedin.com/in/deanpress/)) - [Vidiato](https://vidiato.com) & [Click.DJ](https://click.dj)

*Shout-out to the NEO dApp [BlockSaver](https://github.com/BlockSaver/backend) for the clear file structure `util.js`!*

*Licensed under [MIT License](License)*
