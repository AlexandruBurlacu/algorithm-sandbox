/**
 * Inspired by http://curtis.ml.cmu.edu/w/courses/index.php/Beam_Search
 *             http://jhave.org/algorithms/graphs/beamsearch/beamsearch.shtml
 *             http://www.cs.utexas.edu/~mooney/cs343/slide-handouts/heuristic-search.4.pdf
 * 
 * Adjacency List
 * data Graph = [
 *   {name : [distance, neibhours[]]}
 * ] 
 * 
 */

const romanianRoutesGraph = [
    {city: "Arad", value: 366, neibhours: ["Zerind", "Sibiu", "Timisoara"]},
    {city: "Bucharest", value: 0, neibhours: ["Fagaras", "Pitesti", "Giurgiu", "Urziceni"]},
    {city: "Craiova", value: 160, neibhours: ["Dobreta", "Rimniciu Vilcea", "Pitesti"]},
    {city: "Dobreta", value: 242, neibhours: ["Mehadia", "Craiova"]},
    {city: "Eforie", value: 161, neibhours: ["Hirsova"]},
    {city: "Fagaras", value: 178, neibhours: ["Sibiu", "Bucharest"]},
    {city: "Giurgiu", value: 77, neibhours: ["Bucharest"]},
    {city: "Hirsova", value: 151, neibhours: ["Eforie", "Urziceni"]},
    {city: "Iasi", value: 226, neibhours: ["Vaslui", "Neamt"]},
    {city: "Lugoj", value: 244, neibhours: ["Timisoara", "Mehadia"]},
    {city: "Mehadia", value: 241, neibhours: ["Lugoj", "Dobreta"]},
    {city: "Neamt", value: 234, neibhours: ["Iasi"]},
    {city: "Oradea", value: 380, neibhours: ["Sibiu", "Zerind"]},
    {city: "Pitesti", value: 98, neibhours: ["Bucharest", "Rimniciu Vilcea", "Craiova"]},
    {city: "Rimniciu Vilcea", value: 193, neibhours: ["Sibiu", "Pitesti", "Craiova"]},
    {city: "Sibiu", value: 253, neibhours: ["Arad", "Oradea", "Fagaras", "Rimniciu Vilcea"]},
    {city: "Timisoara", value: 329, neibhours: ["Arad", "Lugoj"]},
    {city: "Urziceni", value: 80, neibhours: ["Bucharest", "Vaslui", "Hirsova"]},
    {city: "Vaslui", value: 199, neibhours: ["Urziceni", "Iasi"]},
    {city: "Zerind", value: 374, neibhours: ["Arad", "Oradea"]}
]


class BeamSearch {
    problemSpace
    constructor(problem) {
        this.problemSpace = problem
    }

    private in(state, states) {
        return states.filter(st => st === state).length > 0
    }

    private add(state, states) {
        return [...states, state]
    }

    private flatten(arr) {
        return [].concat(...arr)
    }

    private prune(candidates, beamSize) {
        return candidates.slice(0, beamSize)
    }

    private goalNotIn(states) {
        return states.filter(s => s.city === "Bucharest").length === 0
    }

    private next(states) {
        const __states = [...states]
        return this.flatten(__states
                              .pop()
                              .neibhours
                              .map(c => this.problemSpace.filter(st => st.city === c)))
    }

    run(initialStateIndex: number, beamSize: number, scoreFn) {
        let currentStates = []
        let visited = []
        currentStates = this.add(this.problemSpace[initialStateIndex], currentStates)
        visited = this.add(this.problemSpace[initialStateIndex], currentStates)

        var i = 0
        while(this.goalNotIn(currentStates)) {
            const candidates = this.next(currentStates).map(scoreFn).sort((a, b) => a.value - b.value)
            currentStates = this.flatten([...currentStates, this.prune(candidates, beamSize)])
            currentStates = currentStates.filter(st => !this.in(st, visited))
            visited = visited.concat(candidates)
        }
        return currentStates
    }
}

console.log(new BeamSearch(romanianRoutesGraph).run(0, 2, node => node))

// const traverse = xs => xs.forEach(element => element.neibhours.forEach(n => console.log(n)))
// traverse(romanianRoutesGraph)
