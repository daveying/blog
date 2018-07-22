'use strict'

const fs = require('fs')
const pth = require('path')
const env = process.env.__BUILD_ENV_ === 'production' ? 'production' : 'development'
console.log(`Current __BUILD_ENV_ is ${env}`)

fs.readFile(pth.join(__dirname, '../src/store/index.js'), 'utf8', (err, data) => {
    if (err) throw 'Error in prebuild.js, open index.js failed'
    let lines = data.split('\n')
    let reg = /^    env: '([a-z]+)'/
    for (let i = 0, l = lines.length; i < l; i++) {
        let result = reg.exec(lines[i])
        if (result && result[1]) {
            let idx = lines[i].indexOf(result[1])
            lines[i] = lines[i].substring(0, idx) + env + lines[i].substring(idx + result[1].length)
            break
        }
    }
    let newData = lines.join('\n')
    fs.writeFile(pth.join(__dirname, '../src/store/index.js'), newData, (err) => {
        if (err) throw 'Error in prebuild.js, write index.js failed'
    })
})
