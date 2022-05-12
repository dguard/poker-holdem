import { playerDipsService } from "@core-lib/components/services/playerDips.service";
import { playerDepositsService } from "@core-lib/components/services/playerDeposits.service";
import { PokerAlgo } from "./pokerAlgo";
import { cardService } from "@core-lib/components/services/card.service";
import { PLAYER_ALADDIN, PLAYER_YAGO, PLAYER_ABU, PLAYER_WALLE, PLAYER_TIGER, PLAYER_EVE, PLAYER_CARPET, PLAYER_JASMINE, PLAYER_SULTAN, DILER_JINNY } from "./components/models/players";
import { DIP_AMOUNT_100 } from "@core-lib/components/models/dipsAmount";


const players = [/* DILER_JINNY, */ PLAYER_ALADDIN, PLAYER_YAGO, PLAYER_CARPET,
  PLAYER_WALLE, PLAYER_JASMINE, PLAYER_SULTAN, PLAYER_TIGER, PLAYER_EVE, PLAYER_ABU
]

async function samplePreflop(pokerAlgo){
  await pokerAlgo.spreadCards()

  const playerCards = {}
  await players.reduce(async (prev, player) => {
    await prev
    playerCards[player] = await pokerAlgo.getPlayerCards(player)
    return Promise.resolve()
  }, Promise.resolve())

  await pokerAlgo.bet(PLAYER_ALADDIN, { [DIP_AMOUNT_100]: { count: 5 } })

  await pokerAlgo.call(PLAYER_YAGO)

  await pokerAlgo.raise(PLAYER_CARPET, { [DIP_AMOUNT_100]: { count: 7 } })

  await pokerAlgo.fold(PLAYER_WALLE)

  await pokerAlgo.check(PLAYER_JASMINE)

  await pokerAlgo.call(PLAYER_SULTAN)

  await pokerAlgo.fold(PLAYER_TIGER)
  await pokerAlgo.fold(PLAYER_EVE)

  await pokerAlgo.fold(PLAYER_ABU)

  await pokerAlgo.call(PLAYER_ALADDIN)
  await pokerAlgo.call(PLAYER_YAGO)

  await pokerAlgo.keepSame(PLAYER_CARPET)
  try {
    await pokerAlgo.check(PLAYER_JASMINE)
  } catch(err) {
    console.log("skip:", err.message)
  }
  await pokerAlgo.call(PLAYER_JASMINE)

  await pokerAlgo.keepSame(PLAYER_SULTAN)
}

async function sampleFlop(pokerAlgo) {
  await pokerAlgo.spreadCards()
  const roundCards = await pokerAlgo.getCards()
  console.log(roundCards)

  await pokerAlgo.bet(PLAYER_ALADDIN, { DIP_AMOUNT_100:  {count: 5}})
  await pokerAlgo.call(PLAYER_YAGO)

  await pokerAlgo.call(PLAYER_CARPET)
  await pokerAlgo.call(PLAYER_JASMINE)
  await pokerAlgo.call(PLAYER_SULTAN)

  await pokerAlgo.raise(PLAYER_ALADDIN, { DIP_AMOUNT_1000:  {count: 1}})
  await pokerAlgo.call(PLAYER_YAGO)

  await pokerAlgo.call(PLAYER_CARPET)
  await pokerAlgo.fold(PLAYER_JASMINE)
  await pokerAlgo.call(PLAYER_SULTAN)

  await pokerAlgo.keepSame(PLAYER_ALADDIN)
}

async function sampleTurn(pokerAlgo) {
  await pokerAlgo.spreadCards()
  const roundCards = await pokerAlgo.getCards()
  console.log(roundCards)

  await pokerAlgo.bet(PLAYER_ALADDIN, { DIP_AMOUNT_100:  {count: 5}})

  await pokerAlgo.call(PLAYER_YAGO)

  await pokerAlgo.call(PLAYER_CARPET)
  await pokerAlgo.call(PLAYER_SULTAN)

  await pokerAlgo.raise(PLAYER_ALADDIN, { DIP_AMOUNT_100:  {count: 7}})

  await pokerAlgo.call(PLAYER_YAGO)

  await pokerAlgo.call(PLAYER_CARPET)
  await pokerAlgo.fold(PLAYER_SULTAN)

  await pokerAlgo.keepSame(PLAYER_ALADDIN)
}

async function sampleRiver(pokerAlgo) {
  await pokerAlgo.spreadCards()
  const roundCards = await pokerAlgo.getCards()
  console.log(roundCards)

  await pokerAlgo.bet(PLAYER_ALADDIN, { DIP_AMOUNT_100:  {count: 5}})
  await pokerAlgo.call(PLAYER_YAGO)
  await pokerAlgo.call(PLAYER_CARPET)

  await pokerAlgo.keepSame(PLAYER_ALADDIN)

  // detect winner
  let winnersRes = await pokerAlgo.detectWinner()
  console.log(winnersRes)

  let res = await pokerAlgo.getPlayerDeposit(winnersRes['winners'] ? winnersRes['winners'][0] : winnersRes['winner'])
  console.log(res)
  res = await pokerAlgo.getPlayerDeposit(winnersRes['winners'] ? winnersRes['winners'][1] : winnersRes['winner'])
  console.log(res)
}


async function main(){
  const playerDipsMap = await playerDipsService.findPlayerDipsMap()
  const playerDeposits = await playerDepositsService.findPlayerDepositsMap()

  const cards = await cardService.generateCards()
  const pokerAlgo = new PokerAlgo.js({
    players,
    deposits: playerDipsMap,
    playerDeposits,
    diler: DILER_JINNY,
    cards: cards
  })

  await samplePreflop(pokerAlgo)
  await sampleFlop(pokerAlgo)
  await sampleTurn(pokerAlgo)
  await sampleRiver(pokerAlgo)
}

main()