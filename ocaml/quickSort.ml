let rec quickSort xs =
  match xs with
  | [] -> []
  | x :: xs -> let smaller, bigger = List.partition (fun y -> y < x) xs
               in quickSort smaller @ (x :: (quickSort bigger))
;;

let as_string =
    [1; 432; 124; 34; -12; 543; 9; -24]
    |> quickSort
    |> List.map string_of_int
    |> String.concat " "
;;

print_endline as_string
;;

