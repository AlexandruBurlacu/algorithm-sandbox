#include <iostream>
#include <vector>

template <typename T>
inline void pprinter(std::vector<T> data) {
    for (auto item : data) {
        std::cout << item << " ";
    }
}

int coinchange_rec(int total_ammount, int i, std::vector<int> available_coins) {
    if (total_ammount < 0 || (total_ammount > 0 && available_coins.size() == i)) {
		return 0;
	}

	if (total_ammount == 0) {
		return 1;
	}
    return coinchange_rec(total_ammount - available_coins[i], i, available_coins) \
           + coinchange_rec(total_ammount, i + 1, available_coins);
}

int coinchange_dp(int total_ammount, std::vector<int> available_coins) {
    int** table;
    int table_width = available_coins.size();
    table = new int*[table_width + 1];

    for (register int i = 0; i <= table_width;++i) {
        table[i] = new int[total_ammount + 1];
        table[i][0] = 1;
    }

    for (register int i = 1; i <= table_width;++i) {
        for (register int j = 1; j <= total_ammount;++j) {
            if (available_coins[i-1] <= j) {
                table[i][j] = table[i-1][j] + table[i][j-available_coins[i-1]];                
			} else {
				table[i][j] = table[i-1][j];
            }

            std::cout << table[i][j] << " ";
        }
    }

    return table[total_ammount][table_width];
}

int main() {
    std::vector<int> coins = {1, 2, 5, 10};
    pprinter(coins);
    std::cout << std::endl;
    std::cout << coinchange_rec(50, 0, coins) << std::endl;
    std::cout << coinchange_dp(50, coins) << std::endl;
    return 0;
}