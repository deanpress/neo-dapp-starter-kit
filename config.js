module.exports = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    // scriptHash is your smart contract Script Hash, without the first 2 '0x' characters
    // To retrieve your Script Hash: (in neo-gui: right click smart contract address > View Contract)
    scriptHash: '902c3c871ff596e69cf69fd4e289fa5b884f1aca',
    // RESTEndpoint is an endpoint to a neon-wallet-db REST server that's connected to your desired net (MainNet, TestNet, PrivNet)
    // MainNet: http://api.wallet.cityofzion.io
    // TestNet: http://testnet-api.wallet.cityofzion.io
    // PrivNet: Your neon-wallet-db instance IP with port 5000
    RESTEndpoint: 'http://127.0.0.1:5000',
    wif: 'KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr',
};