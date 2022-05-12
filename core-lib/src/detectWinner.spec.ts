import { detectWinner } from "@core-lib/utils/pokerAlgo";

async function sampleRoyalFlushAndStraightFlushAndFourOfKind() {
  let playerA = ['hearts-a', 'hearts-k', 'hearts-q', 'hearts-j', 'hearts-t']
  let playerB = ['tiles-5', 'tiles-4', 'tiles-3', 'tiles-2', 'tiles-a']
  let playerC = ['clovers-7', 'tiles-7', 'pikes-7', 'hearts-7', 'tiles-a']

  const res = await detectWinner([playerA, playerB, playerC])
  console.log(res)
}

async function sampleMultipleWinners() {
  let playerA = ['clovers-a', 'hearts-k', 'hearts-j', 'hearts-2', 'tiles-2', 'hearts-5', 'tiles-5']
  let playerB = ['pikes-a', 'tiles-q', 'hearts-j', 'hearts-2', 'tiles-2', 'hearts-5', 'tiles-5']

  const res = await detectWinner([playerA, playerB])
  console.log(res)
}

async function main() {
  await sampleRoyalFlushAndStraightFlushAndFourOfKind()
  await sampleMultipleWinners()
}

main()