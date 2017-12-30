package main

import "fmt"

// CoinChangeRec - time: O(2^n), space: O(1)
func CoinChangeRec(totalAmmount, i int, availableCoins []int) int {

	if totalAmmount < 0 || (totalAmmount > 0 && len(availableCoins) == i) {
		return 0
	}

	if totalAmmount == 0 {
		return 1
	}

	return CoinChangeRec(totalAmmount-availableCoins[i], i, availableCoins) + CoinChangeRec(totalAmmount, i+1, availableCoins)
}

// CoinChangeDp - time & space: O(totalAmount * len(availableCoins)) [WIP]
func CoinChangeDp(totalAmmount int, availableCoins []int) int {
	tableWidth := len(availableCoins)
	solution := make([]int, (tableWidth+1)*(totalAmmount+1))

	for i := 0; i <= totalAmmount; i++ {
		solution[(tableWidth+1)*i+0] = 1
	}

	for i := 1; i <= tableWidth; i++ {
		for j := 1; j <= totalAmmount; j++ {
			if availableCoins[i-1] <= j {
				solution[i*totalAmmount+j] = solution[(i-1)*totalAmmount+j] + solution[i*totalAmmount+(j-availableCoins[i-1])]
			} else {
				solution[i*totalAmmount+j] = solution[(i-1)*totalAmmount+j]
			}
		}
	}

	fmt.Println(solution)

	return solution[len(availableCoins)*totalAmmount]
}

func main() {
	coins := []int{1, 2, 5, 10}
	fmt.Println(CoinChangeRec(50, 0, coins))
	fmt.Println(CoinChangeDp(50, coins))
}
