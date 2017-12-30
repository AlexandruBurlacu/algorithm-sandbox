package main

import (
	"fmt"
	"math/rand"
)

func filter(list []int, op func(int) bool) []int {
	var result []int
	for _, el := range list {
		if op(el) {
			result = append(result, el)
		}
	}
	return result
}

func QuickSort(list []int) []int {

	if len(list) == 0 {
		return list
	}

	pivot, tail := list[0], list[1:]
	return append(append(quickSort(filter(tail, func(el int) bool {
		if el < pivot {
			return true
		}
		return false
	})), pivot), quickSort(filter(tail, func(el int) bool {
		if el >= pivot {
			return true
		}
		return false
	}))...)
}

func main() {
	var randArr []int
	for index := 0; index < 10; index++ {
		randArr = append(randArr, rand.Int()%1000)
	}
	fmt.Println(randArr)
	fmt.Println(QuickSort(randArr))
}
