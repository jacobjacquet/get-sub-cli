#!/usr/bin/env ts-node
import meow from 'meow'
import subway from './subway.json'

const cli = meow(`
  $ getsub sandwich
  $ getsub salad
  $ getsub help
`)

const randomEl = (arr: []) => {
  if (!Array.isArray(arr)) {
    throw new Error('Expected an array')
  }

  return arr[Math.floor(Math.random() * arr.length)]
}

const makeObj = (obj: Object, keys: string[]) => {
  let newobj = {}
  for (let i = 0; i < keys.length; i++) {
    Object.assign(newobj, { [keys[i]]: randomEl(obj[keys[i]]) })
  }
  return newobj
}

const select = (obj: Object, omitKey: undefined) => {
  if (obj == null) return
  const keys = Object.keys(obj).filter(key => key !== omitKey)
  const { bread, ...newObj } = obj
  return makeObj(obj, keys)
}

const input = cli.input[0]

try {
  if (input !== 'sandwich' && input !== 'salad') {
    throw 'Wrong command!'
  }
  console.log(input === 'salad' ? select(subway, 'bread') : select(subway))
} catch (e) {
  console.log(e)
}
