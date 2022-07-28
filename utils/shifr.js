const shifrChars = {
    'a': 't',
    'b': 'P',
    'c': 'B',
    'd': 'r',
    'e': 'U',
    'f': 'G',
    'g': '3',
    'h': '@',
    'l': 's',
    'i': 'X',
    'j': 'b',
    'k': 'C',
    'l': 'V',
    'm': 'z',
    'n': 'm',
    'o': 'a',
    'p': 'v',
    'q': 'c',
    'r': '$',
    's': '?',
    't': '*',
    'u': 'I',
    'v': 'Y',
    'w': '~',
    'x': 'J',
    'y': '}',
    'z': '!',
    'A': '.',
    'B': '%',
    'C': '^',
    'D': '₽',
    'E': '/',
    'F': 'R',
    'G': '>',
    'H': '#',
    'I': 'F',
    'J': 'Z',
    'K': 'A',
    'L': '<',
    'M': '€',
    'N': '&',
    'O': ':',
    'P': '•',
    'Q': ',',
    'R': 'j',
    'S': 'u',
    'T': 'N',
    'U': '¢',
    'V': 'Q',
    'W': 'h',
    'X': 'O',
    'Y': 'w',
    'Z': '+',
    '%': '-',
    '1': 'x',
    '2': 'k',
    '3': 'l',
    '4': 'o',
    '5': '2',
    '6': '0',
    '7': 'T',
    '8': '1',
    '9': '9',
    '0': '4',
    '.': 'E',
    '=': 'q'
}

const shifrCharsKeys = Object.keys(shifrChars);
const shifrCharsValues = Object.values(shifrChars);
const crypto = require('crypto');

const shifrEncode = (string) => {
    let encodedArr = encodeURI(string).split('');
    let hashedArr = [];

    for (let i = 0; i < encodedArr.length; i++) {
        for (let y = 0; y < shifrCharsKeys.length; y++) {
            if (encodedArr[i] === shifrCharsKeys[y]) {
                hashedArr.push(shifrChars[shifrCharsKeys[y]])
            }
        }
    }

    const encryptedStr = hashedArr.join('');
    return encryptedStr;
}

const shifrDecode = (string) => {
    let encryptedStr = string;
    let encodedArr = encryptedStr.split('');
    let decodedArr = [];

    for (let i = 0; i < encodedArr.length; i++) {
        for (let y = 0; y < shifrCharsKeys.length; y++) {
            if (encodedArr[i] === shifrCharsValues[y]) {
                const findedKey = Object.keys(shifrChars).find(key => shifrChars[key] === shifrCharsValues[y])
                decodedArr.push(findedKey)
            }

        }
    }

    const decodedStr = decodedArr.join('');
    return decodedStr;
}

module.exports = { shifrEncode, shifrDecode };