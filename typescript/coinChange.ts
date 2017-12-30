/**
 * First try for the Coin Change algorithm - time: O(2^n), space: O(1)
 * I know, it's quite dense, but I really love converting everything into a one-liner
 * @param totalAmmount total ammount of money we need to supply change for
 * @param coinValues available coin types to supply change with
 * @param i emm, idk, I guess it is used to explore all possible combinations of coin types
 */
function coinChangeRec(totalAmmount: int, coinValues: Array<int>): int {
    const __inner = (totalAmmount: int, coinValues: Array<int>, i: int): int => 
        totalAmmount < 0 || (coinValues.length == i && totalAmmount > 0) ? 0 : 
            (totalAmmount == 0 ? 1 : __inner(totalAmmount - coinValues[i], coinValues, i) + 
                                     __inner(totalAmmount, coinValues, i + 1))

    return __inner(totalAmmount, coinValues, 0)
}

class Tuple {
    x
    y
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

/**
 * [WIP] Second try for the Coin Change algorithm - memoization approach
 * @param totalAmmount total ammount of money we need to supply change for
 * @param coinValues available coin types to supply change with
 * @param i emm, idk, I guess it is used to explore all possible combinations of coin types
 * @param memo a Map that should contain already computed values
 */
function coinChangeMemo(totalAmmount: int, coinValues: Array<int>): int {
    function __inner(totalAmmount: int, coinValues: Array<int>, i: int, memo: Map<Tuple, int>): int {
        if (memo.has(new Tuple(totalAmmount, i))) {
            return memo.get(new Tuple(totalAmmount, i))
        }
        if (totalAmmount < 0) {
            return 0
        }
        if (totalAmmount == 0) {
            return 1
        }
        if (coinValues.length == i && totalAmmount > 0) {
            return 0
        }

        memo.set(new Tuple(totalAmmount - coinValues[i], i), __inner(totalAmmount - coinValues[i], coinValues, i, memo))
        memo.set(new Tuple(totalAmmount, i + 1), __inner(totalAmmount, coinValues, i + 1, memo))

        return memo.get(new Tuple(totalAmmount - coinValues[i], i)) + memo.get(new Tuple(totalAmmount, i + 1))
    }
    return __inner(totalAmmount, coinValues, 0, new Map<Tuple, int>())
}

/**
 * Coin Change algorithm, dynamic programming approach - time & space: O(totalAmount * coinValues.length)
 * @param totalAmmount total ammount of money we need to supply change for
 * @param coinValues available coin types to supply change with
 */
function coinChangeDP(totalAmmount: int, coinValues: Array<int>): int {
    let solution: Array<Array<int>> = new Array(coinValues.length + 1)
                                            .fill(new Array(totalAmmount + 1).fill(0))

    solution.forEach(line => line[0] = 1)

    for (var i = 1; i <= coinValues.length; i++) {
        for (var j = 1; j <= totalAmmount; j++) {
            if (coinValues[i - 1] <= j) {
                solution[i][j] = solution[i - 1][j] + solution[i][j - coinValues[i - 1]]
            } else {
                solution[i][j] = solution[i - 1][j]
            }
        }
    }

    return solution[coinValues.length][totalAmmount]
}

console.log(coinChangeRec(50, [1, 2, 5, 10]))
console.log(coinChangeMemo(50, [1, 2, 5, 10]))
console.log(coinChangeDP(50, [1, 2, 5, 10]))
