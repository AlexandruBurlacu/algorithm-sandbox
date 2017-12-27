// Utility functions
const generateRandomArray = (length: number, max: number): number[] => Array(length).fill().map(() => Math.round(Math.random() * max))
const smallerThan = limit => number => number < limit
const greaterOrEqualThan = limit => number => number >= limit

// Random array
const CASUAL_NUMBERS = generateRandomArray(11, 1000)

// Start with the pivot as arr[0]
const partitionLeft = (arr: Array<Number>, low: number, high: number): number => {
  const pivot = arr[low]

  let i = high + 1

  for (let j = high; j >= low + 1; j--) {
    if (arr[j] < pivot) continue
    i--
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }

  [arr[i - 1], arr[low]] = [arr[low], arr[i - 1]]
  return i - 1
}

// Start with the pivot as arr[arr.length - 1]
const partitionRight = (arr: Array<Number>, low: number, high: number): number => {
  const pivot = arr[high]

  let i = low - 1

  for (let j = low; j <= high - 1; j++) {
    if (arr[j] > pivot) continue
    i++
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
  return i + 1
}

// The generic quicksort function
export const quickSort = (arr: Array<Number>, low: number = 0, high: number = arr.length - 1): void => {
  if (low >= high) return

  const partitioningIndex = partitionLeft(arr, low, high)

  quickSort(arr, low, partitioningIndex - 1)
  quickSort(arr, partitioningIndex + 1, high)
}

// Immutable & ES6 quicksort
export const quickSortES6 = (arr: Array<Number>): Array<Number> => arr.length > 0
  ? (() => {
    const [pivot, ...tail] = arr
    return [...quickSortES6(tail.filter(x => x < pivot)), pivot, ...quickSortES6(tail.filter(x => x >= pivot))]
  })()
  : []

// Something better
export const qSort = <T>(list: Array<T>): Array<T> =>
  (list.length > 0) ? (([pivot, ...tail]) =>
    qSort(tail.filter(x => x < pivot))
      .concat(pivot)
      .concat(qSort(tail.filter(x => x >= pivot))))(list) : []

// ! Esoterical code, do NOT use!!!
let q=([p,...l])=>l.length>0?(()=>[...q(l).filter(x=>x<p),p,...q(l).filter(x=>x>=p)])():[p]

// Esoteric stuff, but works, you can try
let qs=(l)=>l.length>0?(([p,...t])=>[...qs(t.filter(x=>x<p)),p,...qs(t.filter(x=>x>=p))])(l):[]

export default quickSort
