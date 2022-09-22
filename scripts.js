var classicFighters = ['rock', 'paper', 'scissors']
var hardFighters = ['rock', 'paper', 'scissors', 'lizard', 'spock']
var customFighters = []

var human;
var computer;
var game;

// Pseudocode
// Goal: To build a system that would be able to resolve a rock/paper/scissors game of indefinite size using the position of each fighter element within an array to determine which other fighter elements it will defeat or be defeated by.
// Data: 
// * An array containing an odd number of elements, each representing a fighter.
// * An input, provided by a human player, selecting which fighter they which to play that round.
// * A randomly chosen fighter selected by their computer opponent which the human will play against.
// Questions: Is there an elegant way to "wrap" an array? That is, in an array of 5 values, read the array in an order like [[3], [4], [0], [1], [2]]? (Answer: YES! Use % and the array length)

// Step 1: Determine whether the array provided contains an odd number of elements. The rock/paper/scissors logic can be applied to any odd number of fighters, but the game logic cannot resolve wins and losses correctly when an even number of fighters is provided.
// Step 2: Find the midpoint of the provided array. This solution will resolve all conflicts by shifting the array to place the human controlled fighter at the midpoint--elements to the left will defeat the midpoint element, and elements to the right will be defeated by the midpoint element.
// Step 3: Forget all that about the offset value. We don't need an offset, we just need to know positions relative to the midpoint. Adding an offset value works fine, but it doesn't seem like the most streamlined solution. If we locate our human fighter on our first pass, starting at the midpoint, we should just be able to pull it out and adjust everything relative to that.
// Step 4: Look up the offset value of our selected fighter in the array and shift the array (probably just make a new array) to place that fighter at its midpoint.
// Step 5: At this point, everything to the left beats the human fighter, and everything to the right is beaten by the human fighter. Should allow players to make their own array and build their own rock/paper/scissors matches dynamically!

// Instantiates Person class for human and computer
function assignPlayers() {
  human = new Person()
  computer = new Person()
}

// Instantiates a new game session from the Game class
function beginNewGame(fightersArray, mode) {
  game = new Game(fightersArray, mode)
}

// Players select their fighters
function assignFighters(humanFighter) {
  human.takeTurn(humanFighter)
  computer.takeTurn()
}

// Verifies that our input array contains an odd number of elements. Also lets me practice ternerys!
function checkForOddness(array) {
  if (array.length % 2 !== 0) {
    game.isOdd = false
  }
}

// Finds the midpoint of our input array (based on array length, not array index position)
function findMidpoint(array) {
  game.midpoint = Math.ceil(array.length / 2)
}

// Runs a standard for loop, but tracks our position within the array starting from the midpoint instead of from index position 0. The tracker will wrap once it reaches the end of the array and start at the beginning. 
function findFighterOffset(midpoint, array, fighter) {
  for (var i = 0; i < array.length; i++) {
    var offset = (i + midpoint - 1) % array.length
    if (fighter === array[offset]) {
      human.offset = i
    }
  }
}

// Creates a new array, unique to this turn, which places the human selected fighter at the midpoint of the array using the offset. It maintains all other relationships within the array as if the array had wrapped from the end back to the beginning.
function centerFighterOnMidpoint(array, humanOffset) {
  for (var i = 0; i < array.length; i++) {
    var offset = (i + humanOffset) % array.length
    game.centeredFighters.push(array[offset])
  }
  console.log(game.centeredFighters)
}

function findComputerIndex(centeredArray, fighter) {
  computer.index = centeredArray.indexOf(fighter) + 1
}

// Checks the location of the computer fighter relative to the midpoint of the array to determine if the round is a win/loss/draw.
function determineWinner(computerFighter, humanFighter, midpoint) {
  if (computer.index === midpoint) {
    return `You both chose ${computerFighter}, it's a draw!`
  }
  else if (computer.index < midpoint) {
    return `Your opponent's ${computerFighter} beats your ${humanFighter}! Defeat!`
  }
  else {
    return `Your ${humanFighter} defeats your opponent's ${computerFighter}! Victory!`
  }
}

assignPlayers()
beginNewGame(hardFighters, 'hard')
assignFighters(`lizard`)
checkForOddness(game.fighters)
findMidpoint(game.fighters)
findFighterOffset(game.midpoint, game.fighters, human.fighter)
centerFighterOnMidpoint(game.fighters, human.offset)
findComputerIndex(game.centeredFighters, computer.fighter)
console.log(determineWinner(computer.fighter, human.fighter, game.midpoint))