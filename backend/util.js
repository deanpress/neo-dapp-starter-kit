module.exports = {
    ASSETS: {
        NEO: 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b',
        'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b': 'NEO',
        GAS: '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7',
        '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7': 'GAS'
    },

    int2hex: (mNumber) => {
        const h = mNumber.toString(16)
        return h.length % 2 ? '0' + h : h
    },

    /**
     * Converts a number to a hexstring of a suitable size
     * @param {number} num
     * @param {number} size - The required size in chars, eg 2 for Uint8, 4 for Uint16. Defaults to 2.
     */
    num2hexstring: (num, size = 2) => {
        let hexstring = num.toString(16)
        return hexstring.length % size === 0 ? hexstring : ('0'.repeat(size) + hexstring).substring(hexstring.length);
    },

    arr2hex: args => {
        let hexArgs = []
        args.forEach(function (arg) {
            hexArgs.push(module.exports.str2hex(arg))
        })
        return hexArgs
    },

    str2hex: str => {
        let arr1 = []
        for (let n = 0, l = str.length; n < l; n++) {
            const hex = Number(str.charCodeAt(n)).toString(16);
            arr1.push(hex)
        }
        return arr1.join('')
    },

    reverseHex: hex => {
        if (hex.length % 2 !== 0) throw new Error(`Incorrect Length: ${hex}`)
        let out = ''
        for (let i = hex.length - 2; i >= 0; i -= 2) {
            out += hex.substr(i, 2)
        }
        return out
    },

    hexstring2ab: str => {
        let result = []
        while (str.length >= 2) {
            result.push(parseInt(str.substring(0, 2), 16))
            str = str.substring(2, str.length)
        }

        return result
    },

    ab2str: buf => {
        return String.fromCharCode.apply(null, new Uint8Array(buf))
    },

    hex2str: hex => {
        return module.exports.ab2str(module.exports.hexstring2ab(hex))
    },


    /**
     * Parses the VM Stack and returns human readable strings
     * @param {{type:string, value: string}[]} stack - VM Output
     * @return {any[]} Array of results
     */
    parseVMStack(stack) {
        return stack.map((item) => {
            switch (item.type) {
                case 'ByteArray':
                    return module.exports.ab2str(module.exports.hexstring2ab(item.value))
                case 'Integer':
                    return parseInt(item.value, 10)
                default:
                    throw Error(`Unknown type: ${item.type}`)
            }
        })
    }
};

