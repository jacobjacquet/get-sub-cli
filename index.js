#!/usr/bin/env ts-node
const meow = require('meow')
const subway = require('./subway.json')

const cli = meow(`
  Usage
    $ getsub sandwich
    $ getsub salad
`)

const input = cli.input[0]

const randomEl = (arr) => {
  if (!Array.isArray(arr)) {
    throw new Error('Expected an array')
  }

  return arr[Math.floor(Math.random() * arr.length)]
}

const randomObj = obj => {
  let newObj = {}
  for (let key in obj) {
    let item = { [key]: randomEl(obj[key])}
    newObj = { ...newObj, ...item}
  }
  return newObj
}

try {
  if (!input || input !== 'sandwich' && input !== 'salad') {
    throw 'Wrong command!'
  }

  if (input === 'salad') {
    const { bread, ...obj } = subway
    console.log(randomObj(obj))
  }

  if (input === 'sandwich') {
    const obj = subway
    console.log(randomObj(obj))
  }

} catch (e) {
  console.log(e)
}

