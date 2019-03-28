'use strict'

const isArray = item => {
  return (item && Array.isArray(item))
}

const isObject = item => {
  return (item && typeof item === 'object' && !Array.isArray(item))
}

const ObjectAssign = (target, ...sources) => {
  if (!sources.length) return target
  const source = sources.shift()
  if (isObject(target) && isObject(source)){
    const keys = [].concat(Object.keys(source), Object.getOwnPropertySymbols(source))
    for (const key of keys){
      if (isObject(source[key])){
        if (!target[key]) {
          Object.assign(target, {[key]: {}})
        }
        ObjectAssign(target[key], source[key])
      } else if (isArray(source[key])) {
        if (!target[key]) {
          Object.assign(target, {[key]: []})
        }
        target[key] = target[key].concat(source[key])
      } else {
        Object.assign(target, {[key]: source[key]})
      }
    }
  }
  return ObjectAssign(target, ...sources)
}

const parseCombine = (target, ...sources) => {
  return ObjectAssign(target, ...sources)
}

module.exports = parseCombine
