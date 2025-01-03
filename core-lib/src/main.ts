import { playerDipsService } from "@core-lib/components/services/playerDips.service";
import { playerDepositsService } from "@core-lib/components/services/playerDeposits.service";
import { PokerAlgo } from "./pokerAlgo";
import { cardService } from "@core-lib/components/services/card.service";
import { PLAYER_ALADDIN, PLAYER_YAGO, PLAYER_ABU, PLAYER_WALLE, PLAYER_TIGER, PLAYER_EVE, PLAYER_CARPET, PLAYER_JASMINE, PLAYER_SULTAN, DILER_JINNY } from "./components/models/players";
import { DIP_AMOUNT_100 } from "@core-lib/components/models/dipsAmount";
import {detectHandRanking, comparePlayers, compareNoPairHands} from "@core-lib/utils/pokerAlgo";


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


async function detectWinner(pokerAlgo) {

  let winner = await pokerAlgo.detectWinner()
  if('winner' in winner) {
    let winnerCards = await pokerAlgo.getPlayerCards(winner['winner'])
    console.log({'player': winner['winner'], cards: winnerCards})
    console.log(winner)
    console.log({"riverCards": await pokerAlgo.getRiverCards()})
    let handRanking = await detectHandRanking(await pokerAlgo.getPlayerCards(winner['winner']))
    console.log({handRanking: JSON.stringify(handRanking)})
    console.log({winners: winner['winner']})
  } else if('winners' in winner) {
    console.log({winners: winner['winners']})

    let dictPlayers = {}
    let winners = winner['winners']

    let hands = await Promise.all(winners.map(async function(samplePlayer) {
      return [
        samplePlayer,
        [].concat(await pokerAlgo.getPlayerCards(samplePlayer)).concat(await pokerAlgo.getRiverCards())
      ]
    }))

    hands.sort((firstHandTuple, secondHandTuple)=> {
      let res = compareNoPairHands(firstHandTuple[1], secondHandTuple[1], 10)
      let player = firstHandTuple[0]
      let playerAnother = secondHandTuple[0]

      if(res['winner'] && res['winner']['first_hand']) {
        if(typeof dictPlayers[player] === 'undefined') {
          // keep
          dictPlayers[player] = 1
        } else {
          dictPlayers[player] += 1
        }
      } else if(res['winner'] && res['winner']['second_hand']) {
        if(typeof dictPlayers[playerAnother] === 'undefined') {
          // keep
          dictPlayers[playerAnother] = 1
        } else {
          dictPlayers[playerAnother] += 1
        }
      }

      return 0
    })
    let listPlayers = Object.keys(dictPlayers)
    let endPlayer = listPlayers[0]

    for (let player of winner['winners']) {
      let winnerCards = await pokerAlgo.getPlayerCards(player)
      console.log({'player': player, cards: winnerCards})
      let handRanking = await detectHandRanking(await pokerAlgo.getPlayerCards(player))
      console.log({handRanking: JSON.stringify(handRanking)})
    }
    console.log({winners: winner['winners']})
    console.log({"riverCards": await pokerAlgo.getRiverCards()})

    console.log({dictPlayers})
    if(Object.keys(dictPlayers).length === 2) {
      console.log({winners: Object.keys(dictPlayers)})
    } else {
      console.log({winner: endPlayer})
    }
  }
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

  // console.log({flopCards: await pokerAlgo.getFlopCards()})
  // console.log({turnCards: await pokerAlgo.getTurnCards()})
  // console.log({riverCards: await pokerAlgo.getRiverCards()})
  // console.log(await pokerAlgo.getCards())

  detectWinner(pokerAlgo)
}

main()