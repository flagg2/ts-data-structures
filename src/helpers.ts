import Decimal from "decimal.js"

export function stringifyObjectWithOrderedKeys(obj: object): string {
   return JSON.stringify(sortKeys(obj))
}

function sortKeys(obj: unknown): unknown {
   if (isPlainObject(obj)) {
      const sortedKeys = Object.keys(obj).sort()
      const sortedObj = sortedKeys.reduce((acc, key) => {
         acc[key] = sortKeys(obj[key])
         return acc
      }, {})
      return sortedObj
   }

   if (Array.isArray(obj)) {
      return obj.map(sortKeys)
   }

   if (obj instanceof Decimal) {
      return obj.toNumber()
   }

   return obj
}

export function isPlainObject(obj: unknown): obj is object {
   return typeof obj === "object" && obj !== null && obj.constructor === Object
}
