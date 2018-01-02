#include <iostream>
#include <vector>

template <typename T>
std::vector<T> concat(std::vector<T> vec1, std::vector<T> vec2) {
    std::vector<T> resp_vec(vec1);
    for (register int i = 0; i < vec2.size();++i) {
        resp_vec.push_back(vec2[i]);
    }

    return resp_vec;
}

template <typename T>
std::vector<T> quicksort(std::vector<T> vecIn) {
    if (vecIn.size() > 0) {
        T pivot = vecIn[0];
        std::vector<T> tail = std::vector<T>(vecIn.begin() + 1, vecIn.end());      
        std::vector<T> left_resp = quicksort(filter(tail, [pivot](T value) -> bool { return value < pivot; }));
        std::vector<T> right_resp = quicksort(filter(tail, [pivot](T value) -> bool { return value >= pivot; }));
        left_resp.push_back(pivot);

        return concat(left_resp, right_resp);
    } else {
        return vecIn;
    }
}

template <typename F, typename T>
std::vector<T> filter(std::vector<T> vecIn, F pred) {
    std::vector<T> vecOut;
    for (register int i = 0; i < vecIn.size();++i) {
        if (pred(vecIn[i])) {
            vecOut.push_back(vecIn[i]);
        }
    }

    return vecOut;
}

template <typename T>
inline void pprinter(std::vector<T> data) {
    for (register int i = 0; i < data.size();++i) {
        std::cout << data[i] << " ";
    }
}

int main() {
    std::vector<int> data = {12, 541, 51, 62435, 856, 121, 86, 8565, 124, -41, 2523};    

    std::cout << "Before ";
    pprinter(data);
    std::cout << std::endl;
    std::cout << "After ";
    pprinter(quicksort(data));

    return 0;
}