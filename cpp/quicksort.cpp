#include <iostream>
#include <vector>

template <typename T>
std::vector<T> concat(std::vector<T> vec1, std::vector<T> vec2) {
    std::vector<T> resp_vec(vec1);
    for (auto element : vec2) {
        resp_vec.push_back(element);
    }

    return resp_vec;
}

template <typename T>
std::vector<T> quicksort(std::vector<T> vec_in) {
    if (vec_in.size() > 0) {
        T pivot = vec_in[0];
        std::vector<T> tail = std::vector<T>(vec_in.begin() + 1, vec_in.end());      
        std::vector<T> left_resp = quicksort(filter(tail, [pivot](T value) -> bool { return value < pivot; }));
        std::vector<T> right_resp = quicksort(filter(tail, [pivot](T value) -> bool { return value >= pivot; }));
        left_resp.push_back(pivot);

        return concat(left_resp, right_resp);
    } else {
        return vec_in;
    }
}

template <typename F, typename T>
std::vector<T> filter(std::vector<T> vec_in, F pred) {
    std::vector<T> resp;
    for (auto element : vec_in) {
        if (pred(element)) {
            resp.push_back(element);
        }
    }

    return resp;
}

template <typename T>
inline void pprinter(std::vector<T> data) {
    for (auto item : data) {
        std::cout << item << " ";
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