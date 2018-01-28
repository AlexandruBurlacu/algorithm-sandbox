let coinChange amount coins =
  let ways = Array.make (amount + 1) 0
  Array.set ways 0 1
  
  List.iter (fun coin ->
      for j = coin to amount do
        Array.set ways j (Array.get ways j + Array.get ways (j - coin))
      done) coins

  Array.get ways amount

coinChange 25 [1; 5; 10; 20]
|> string_of_int
|> print_endline
