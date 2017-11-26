const Neon = require('@cityofzion/neon-js').default
const node = require('./blockchain')
const config = require('./config')
const account = Neon.create.account(config.wif)

// node.getStorage('AGs7dP8tX1KgjXopLELdmZed85GnEkFPRh').then((res) => {
node.getStorage('TomciuIsGekk').then((res) => {
    if (typeof res === "string") {
        console.log(res);
    }
})
