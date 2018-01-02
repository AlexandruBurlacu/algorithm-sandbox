#include <iostream>
#include <vector>

template <typename T>
inline void pprinter(std::vector<T> data) {
    for (auto item : data) {
        std::cout << item << " ";
    }
}

int coinchange(int total_ammount, int i, std::vector<int> available_coins) {
    if (total_ammount < 0 || (total_ammount > 0 && available_coins.size() == i)) {
		return 0;
	}

	if (total_ammount == 0) {
		return 1;
	}
    return coinchange(total_ammount - available_coins[i], i, available_coins) \
           + coinchange(total_ammount, i + 1, available_coins);
}

int main() {
    std::vector<int> coins = {1, 2, 5, 10};
    pprinter(coins);
    std::cout << std::endl;
    std::cout << coinchange(50, 0, coins) << std::endl;    
    return 0;
}