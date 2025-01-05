import { playerDipsService } from "@core-lib/components/services/playerDips.service";
import { playerDepositsService } from "@core-lib/components/services/playerDeposits.service";
import { PokerAlgo } from "./pokerAlgo";
import { cardService } from "@core-lib/components/services/card.service";
import { PLAYER_ALADDIN, PLAYER_YAGO, PLAYER_ABU, PLAYER_WALLE, PLAYER_TIGER, PLAYER_EVE, PLAYER_CARPET, PLAYER_JASMINE, PLAYER_SULTAN, DILER_JINNY } from "./components/models/players";
import { DIP_AMOUNT_100 } from "@core-lib/components/models/dipsAmount";
import {
  detectHandRanking,
  comparePlayers,
  compareNoPairHands,
  compareThreeOfKind,
  comparePair, detectWinner
} from "@core-lib/utils/pokerAlgo";


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
  return

  let res = await pokerAlgo.getPlayerDeposit(winnersRes['winners'] ? winnersRes['winners'][0] : winnersRes['winner'])
  console.log(res)
  res = await pokerAlgo.getPlayerDeposit(winnersRes['winners'] ? winnersRes['winners'][1] : winnersRes['winner'])
  console.log(res)
}

// async function comparePair8And8() {
//   let firstHand = ['hearts-7', 'pikes-6', 'clovers-8', 'hearts-7', 'pikes-8']
//   let secondHand = ['tiles-9', 'clovers-7', 'hearts-8', 'tiles-8', 'tiles-2']
//
//   let res = [firstHand, secondHand].sort(async function(hands, handsAnother){
//     return await comparePlayers(hands, handsAnother)
//   }).reverse()
//
//   console.log("res", [JSON.stringify(firstHand), JSON.stringify(secondHand)].indexOf(JSON.stringify(res[0])) === 0 ?
//       {winner: {first_hand: {}}} : {winner: {second_hand: {}}} )
// }
// async function compareThreeOfKindOfQueens() {
//   let firstHand = ['pikes-q', 'pikes-3'].concat(['hearts-q', 'clovers-q', 'clovers-4', 'clovers-3', 'hearts-8'])
//   let secondHand = [ 'tiles-q', 'pikes-k'].concat(['hearts-q', 'clovers-q', 'clovers-4', 'clovers-3', 'hearts-8'])
//
//   let res = [firstHand, secondHand].sort(async function(hand, handAnother){
//     return await comparePlayers(hand, handAnother)
//   }).reverse()
//
//   console.log("res", [JSON.stringify(firstHand), JSON.stringify(secondHand)].indexOf(JSON.stringify(res[0])) === 0 ?
//       {winner: {first_hand: {}}} : {winner: {second_hand: {}}} )
// }
// async function compareTwoPairsKingsAnd8() {
//
// }
// async function compareStreet7To11() {
//
// }
// async function compareTwoFlashes() {
//
// }
// async function compareTwoPlayers(){
//   let firstHand = [ 'pikes-j', 'tiles-8' ].concat(['hearts-q', 'tiles-3', 'tiles-a', 'clovers-3', 'clovers-6'])
//
//   let secondHand = [ 'hearts-9', 'pikes-t' ].concat(['hearts-q', 'tiles-3', 'tiles-a', 'clovers-3', 'clovers-6'])
//
//   let res = [firstHand, secondHand].sort(async function(hand, handAnother){
//     return await comparePlayers(hand, handAnother)
//   }).reverse()
//   const firstPlayerRanking = await detectHandRanking(firstHand)
//   const secondPlayerRanking = await detectHandRanking(secondHand)
//
//   // console.log("res", res)
//   // console.log("firstPlayerRanking", firstPlayerRanking)
//   // console.log("secondPlayerRanking", secondPlayerRanking)
//   // process.exit()
//
//
//   console.log("res", [JSON.stringify(firstHand), JSON.stringify(secondHand)].indexOf(JSON.stringify(res[0])) === 0 ?
//       {winner: {first_hand: {}}} : {winner: {second_hand: {}}} )
//   process.exit()
// }

async function localDetectWinner(pokerAlgo) {
  let winner = await pokerAlgo.detectWinner()
  // console.log("'winners' in winner", 'winners' in winner)

  if('winners' in winner) {
    const playersCards = []
    await Promise.all(winner['winners'].map(async (player) => {
      const playerCard = await pokerAlgo.getPlayerCards(player)
      const boardCards = await pokerAlgo.getCards()
      playersCards.push(playerCard.concat(boardCards))
    }))

    let res = await detectWinner(playersCards)
    if('winners' in res) {
      let confirmWinner = []
      res['winners'].forEach((item) => {
        confirmWinner.push(winner['winners'][item])
      })

      console.log("confirm")
      console.log("winners", confirmWinner)
    } else {
      console.log("confirm")
      console.log("winner", winner['winners'][res['winner']])
    }

    for (let player of winner['winners']) {
      let winnerCards = await pokerAlgo.getPlayerCards(player)
      console.log({'player': player, cards: winnerCards})
      let handRanking = await detectHandRanking(await pokerAlgo.getPlayerCards(player))
      console.log({handRanking: JSON.stringify(handRanking)})
    }
    console.log({"riverCards": await pokerAlgo.getRiverCards()})

    return
  }
  console.log("confirm")
  console.log("winner", winner['winner'])
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

  // https://pokercm.com/baza-znaniy/spornye-situatsii-v-pokere/
  // highestCard, kicker

  // Пример 1: Совпадение пар
  // Пример 2: Совпадение троек
  // Пример 3: Совпадение «две пары»
  // Пример 4: Совпадение старшинства комбинаций
  // Пример 5: Совпадение флэшей

  // await comparePair8And8()
  // await compareThreeOfKindOfQueens()
  // console.log({flopCards: await pokerAlgo.getFlopCards()})
  // console.log({turnCards: await pokerAlgo.getTurnCards()})
  // console.log({riverCards: await pokerAlgo.getRiverCards()})
  // console.log(await pokerAlgo.getCards())
  // await compareTwoPlayers()

  localDetectWinner(pokerAlgo)
}

main()