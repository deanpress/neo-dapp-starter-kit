const neon = require('@cityofzion/neon-js')
const Neon = neon.default
const config = require('./config')
const axios = require("axios")
const util = require("./util.js")

module.exports = {

    getBalance: (address) => {
        return axios.get(config.RESTEndpoint + '/v2/address/balance/' + address)
            .then((res) => {
                return res.data
            })
    },

    getRPCEndpoint: () => {
        return axios.get(config.RESTEndpoint + '/v2/network/best_node').then(function (response) {
            return response.data.node
        })
    },

    queryRPC: (method, params, id = 1) => {
        return module.exports.getRPCEndpoint().then(rpcEndpoint => {
            return neon.rpc.queryRPC(rpcEndpoint, {
                method: method,
                params: params,
                id: id
            }).then(res => {
                return res
            }).catch(err => {
                return err
            })
        })
    },

    executeTransaction: (fromAccount, invoke, gasCost, intents = []) => {
        return module.exports.getBalance(fromAccount.address).then((balances) => {
            const unsignedTx = neon.tx.Transaction.createInvocationTx(balances, intents, invoke, gasCost, {version: 1})
            const signedTx = neon.tx.signTransaction(unsignedTx, fromAccount.privateKey)
            const hexTx = neon.tx.serializeTransaction(signedTx)
            return module.exports.queryRPC(
                'sendrawtransaction',
                [hexTx]
            ).then(function (res) {
                return res
            })
        }).catch(function (error) {
            console.log(error)
        })
    },

    getScriptHash: (input) => {
        const hash = neon.wallet.getScriptHashFromAddress(input)
        return util.reverseHex(hash)
    },

    getStorage: (key) => {
        if (neon.wallet.isAddress(key)) {
            key = module.exports.getScriptHash(key)
        } else {
            key = util.str2hex(key)
        }
        return module.exports.queryRPC(
            'getstorage',
            [config.scriptHash, key]
        ).then(function (res) {
            return util.hex2str(res.result)
        })
    },

    testContract: (operation, args, callback) => {
        let hexArgs = util.arr2hex(args)
        const props = {
            scriptHash: config.scriptHash,
            operation: operation,
            args: hexArgs
        }
        // Returns vmScript as a hexstring
        const vmScript = Neon.create.script(props)
        return module.exports.getRPCEndpoint().then(rpcEndpoint => {
            return neon.rpc.Query.invokeScript(vmScript)
                .execute(rpcEndpoint)
                .then((res) => {
                    callback(res)
                })
        })
    },

    invokeContract: (operation, args, account, callback) => {
        //Convert args to hex format
        let hexArgs = []
        args.forEach(function (arg) {
            hexArgs.push(util.str2hex(arg))
        })
        const scriptHash = config.scriptHash
        const invoke = {operation: operation, args: hexArgs, scriptHash: scriptHash}
        const intents = [
            //   {assetId: util.ASSETS['GAS'], value: 0.00000001, scriptHash: scriptHash}
        ]
        const gasCost = 1
        const props = {
            scriptHash: scriptHash,
            operation: operation,
            args: hexArgs
        }
        // Returns vmScript as a hexstring
        const vmScript = Neon.create.script(props)
        //Test the transaction
        return module.exports.getRPCEndpoint().then(rpcEndpoint => {
            return neon.rpc.Query.invokeScript(vmScript)
                .execute(rpcEndpoint)
                .then((res) => {
                    if (res.result.state === 'HALT, BREAK') {
                        //Execute the transaction
                        module.exports.executeTransaction(account, invoke, gasCost, intents).then(res => {
                            if (res !== undefined)
                                callback(res)
                            else
                                return
                        })
                    } else {
                        console.log('Error:', res)
                    }
                })
        })
    }
}

