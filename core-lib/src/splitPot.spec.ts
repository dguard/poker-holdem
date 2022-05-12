import { calculateBet, splitPot } from "@core-lib/utils/pokerAlgo";

async function sampleSplitPotForTwoPlayers() {
  const winners = ["PLAYER_ALADDIN", "PLAYER_CARPET"]
  const roundDeposit = {
    "ROUND_PREFLOP": {
      "PLAYER_ALADDIN": {
        "DIP_AMOUNT_1000": {count: 4},
        "DIP_AMOUNT_500": {count: 12},
        "DIP_AMOUNT_100": {count: 21}
      }
    },
    "ROUND_FLOP": {},
    "ROUND_TURN": {},
    "ROUND_RIVER": {}
  }

  const playerDeposits = {
    "PLAYER_ALADDIN": {
      DIP_AMOUNT_100: { count: 1 },
      DIP_AMOUNT_500: { count: 8 },
      DIP_AMOUNT_1000: { count: 4 },
      DIP_AMOUNT_5000: { count: 1 }
    },
    "PLAYER_CARPET": {
      DIP_AMOUNT_100: { count: 16 },
      DIP_AMOUNT_500: { count: 7 },
      DIP_AMOUNT_1000: { count: 4 },
      DIP_AMOUNT_5000: { count: 1 }
    }
  }
  log("playerDeposits", playerDeposits)

  let res = calculateBet(playerDeposits[winners[0]])
  log(winners[0], res)

  res = calculateBet(playerDeposits[winners[1]])
  log(winners[1], res)

  const newDeposits = splitPot(winners, playerDeposits, roundDeposit)
  log("newDeposits", newDeposits)
  res = calculateBet(newDeposits[winners[0]])
  log(winners[0], res)

  res = calculateBet(newDeposits[winners[1]])
  log(winners[1], res)

}

const log = (...args: any[]) => {
  console.log.apply(null, args)
}

async function sampleSplitPotForThreePlayers() {
  const winners = ["PLAYER_ALADDIN", "PLAYER_YAGO", "PLAYER_CARPET"]
  const roundDeposit = {"ROUND_PREFLOP":{"PLAYER_CARPET":{"DIP_AMOUNT_500":{"count":1},"DIP_AMOUNT_100":{"count":2}},"PLAYER_SULTAN":{"DIP_AMOUNT_500":{"count":1},"DIP_AMOUNT_100":{"count":2}},"PLAYER_ALADDIN":{"DIP_AMOUNT_500":{"count":1},"DIP_AMOUNT_100":{"count":2}},"PLAYER_YAGO":{"DIP_AMOUNT_500":{"count":1},"DIP_AMOUNT_100":{"count":2}},"PLAYER_JASMINE":{"DIP_AMOUNT_500":{"count":1},"DIP_AMOUNT_100":{"count":2}}},"ROUND_FLOP":{"PLAYER_ALADDIN":{"DIP_AMOUNT_1000":{"count":1}},"PLAYER_JASMINE":{"DIP_AMOUNT_500":{"count":1}},"PLAYER_YAGO":{"DIP_AMOUNT_1000":{"count":1}},"PLAYER_CARPET":{"DIP_AMOUNT_1000":{"count":1}},"PLAYER_SULTAN":{"DIP_AMOUNT_1000":{"count":1}}},"ROUND_TURN":{"PLAYER_ALADDIN":{"DIP_AMOUNT_500":{"count":1},"DIP_AMOUNT_100":{"count":2}},"PLAYER_SULTAN":{"DIP_AMOUNT_500":{"count":1}},"PLAYER_YAGO":{"DIP_AMOUNT_500":{"count":1},"DIP_AMOUNT_100":{"count":2}},"PLAYER_CARPET":{"DIP_AMOUNT_500":{"count":1},"DIP_AMOUNT_100":{"count":2}}},"ROUND_RIVER":{"PLAYER_ALADDIN":{"DIP_AMOUNT_100":{"count":5}},"PLAYER_YAGO":{"DIP_AMOUNT_500":{"count":1}},"PLAYER_CARPET":{"DIP_AMOUNT_500":{"count":1}}}}

  const playersDeposits = {
    PLAYER_ALADDIN: {
      DIP_AMOUNT_100: { count: 6 },
      DIP_AMOUNT_500: { count: 9 },
      DIP_AMOUNT_1000: { count: 4 },
      DIP_AMOUNT_5000: { count: 1 }
    },
    PLAYER_CARPET: {
      DIP_AMOUNT_100: { count: 16 },
      DIP_AMOUNT_500: { count: 7 },
      DIP_AMOUNT_1000: { count: 4 },
      DIP_AMOUNT_5000: { count: 1 }
    },
    PLAYER_YAGO: {
      DIP_AMOUNT_100: { count: 16 },
      DIP_AMOUNT_500: { count: 7 },
      DIP_AMOUNT_1000: { count: 4 },
      DIP_AMOUNT_5000: { count: 1 }
    },
  }
  log("playerDeposits", playersDeposits)

  let res = calculateBet(playersDeposits[winners[0]])
  log(winners[0], res)

  res = calculateBet(playersDeposits[winners[1]])
  log(winners[1], res)

  res = calculateBet(playersDeposits[winners[2]])
  log(winners[2], res)

  const newDeposits = splitPot(winners, playersDeposits, roundDeposit)
  log("newDeposits", newDeposits)
  res = calculateBet(newDeposits[winners[0]])
  log(winners[0], res)

  res = calculateBet(newDeposits[winners[1]])
  log(winners[1], res)

  res = calculateBet(newDeposits[winners[2]])
  log(winners[2], res)
}

async function main() {
  await sampleSplitPotForTwoPlayers()
  await sampleSplitPotForThreePlayers()

  // await sampleSplitNotEventAmountBetweenTwoPlayers()
}

main()