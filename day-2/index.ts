const fs = require("fs");
const { performance } = require("perf_hooks");

const t0 = performance.now();

enum Move {
  Rock = 1,
  Paper = 2,
  Scissors = 3
}

enum Result {
  Win = 6,
  Lose = 0,
  Draw = 3
}

type Round = {
  player1Move: Move;
  player2Move: Move;
}

type Round2 = {
  player1Move: Move;
  result: Result;
}

const convertMove = (move: string): Move => {
  if(move === 'A' || move === 'X') return Move.Rock;
  if(move === 'B' || move === 'Y') return Move.Paper;
  return Move.Scissors;
}

const convertResult = (result: string): Result => {
  if(result === 'X') return Result.Lose;
  if(result === 'Y') return Result.Draw;
  return Result.Win;
}

const rawData = fs.readFileSync("data.txt", "utf-8");
const data = rawData.split("\n");

const processEntries = (data: string[]): Round[] => {
    return data.map((element) => {
        const parts = element.split(" ");
        return {
            player1Move: convertMove(parts[0]),
            player2Move: convertMove(parts[1]),
        };
    });
};

const processEntries2 = (data: string[]): Round2[] => {
    return data.map((element) => {
        const parts = element.split(" ");
        return {
            player1Move: convertMove(parts[0]),
            result: convertResult(parts[1]),
        };
    });
};

const rounds: Round[] = processEntries(data);
const rounds2: Round2[] = processEntries2(data);

const getResult = (player1Move: Move, player2Move: Move): Result => {
  if(player1Move === player2Move) return Result.Draw;
  if(player1Move === Move.Rock && player2Move === Move.Paper) return Result.Win;
  if(player1Move === Move.Paper && player2Move === Move.Scissors) return Result.Win;
  if(player1Move === Move.Scissors && player2Move === Move.Rock) return Result.Win;
  return Result.Lose;
}

const getMove = (player1Move: Move, result: Result): Move => {
  if(result === Result.Draw) return player1Move;
  if(result === Result.Win && player1Move === Move.Scissors) return Move.Rock;
  if(result === Result.Win && player1Move === Move.Rock) return Move.Paper;
  if(result === Result.Win && player1Move === Move.Paper) return Move.Scissors;
  
  if(result === Result.Lose && player1Move === Move.Scissors) return Move.Paper;
  if(result === Result.Lose && player1Move === Move.Rock) return Move.Scissors;
  return Move.Rock;
}

const totalScore: number = rounds.reduce((acc, round) => {  
  acc += getResult(round.player1Move, round.player2Move) + round.player2Move;
  return acc;
}, 0);

const totalScore2: number = rounds2.reduce((acc, round) => {  
  acc += getMove(round.player1Move, round.result) + round.result;
  return acc;
}, 0);

const t1 = performance.now();

console.log(totalScore2);
console.log(`Elapsed: ` + (t1 - t0));
