import { DIP_AMOUNT_NUMBERS, PlayerDictDip, PlayerListDip } from "@core-lib/components/models/dipsAmount";
import { AvailablePlayerNames } from "./components/models/players";
import { ROUND_PREFLOP, ROUND_FLOP, ROUND_RIVER, ROUND_TURN, RoundDeposit } from "./components/models/round";
import { detectWinner, calculateBet } from "@core-lib/utils/pokerAlgo";

export const PokerAlgo: {js?} = {}

interface PokerAlgoJs {
  keepSame: (player) => void
  bet: (player, playerDeposit) => void
  call: (player) => void
  raise: (player, playerDeposit) => void
  fold: (player) => void
  check: (player) => void
  spreadCards: () => void
  getPlayerCards: (player) => Promise<string[]>
  getCards: () => Promise<string[]>
  spreadFlopCards: () => void
  spreadTurnCards: () => void
  spreadRiverCards: () => void
  getFlopCards: () => Promise<string[]>
  getTurnCards: () => Promise<string[]>
  getRiverCards: () => Promise<string[]>
  detectWinner: () => void

  getPlayerDeposit: (player) => Promise<PlayerDictDip>
  spreadPot: (winners: string[]) => void
}

PokerAlgo.js = function PokerAlgo (this: PokerAlgoJs, {players, deposits, playerDeposits, diler, cards}: {players: string[], deposits: {[k in AvailablePlayerNames]: PlayerDictDip}, playerDeposits: RoundDeposit, diler: string, cards}) {
  let selectedRound = ROUND_PREFLOP
  const setSelectedRound = (newValue) => {
    console.log("next round:", newValue)
    selectedRound = newValue
  }
  const copyObj = (obj) => JSON.parse(JSON.stringify(obj))

  let selectedPlayer = players[0];
  const setSelectedPlayer = (newValue) => {
    selectedPlayer = newValue
  }
  const that = this

  let protectedDeposits = copyObj(deposits)
  const setDeposits = (newValue) => {
    protectedDeposits = newValue
  }

  let roundsDeposit: RoundDeposit = {
    [ROUND_PREFLOP]: {},
    [ROUND_FLOP]: {},
    [ROUND_TURN]: {},
    [ROUND_RIVER]: {}
  }
  const setRoundDeposit = (newValue) => {
    roundsDeposit = newValue
  }

  const roundCircle = {
    [ROUND_PREFLOP]: ROUND_FLOP,
    [ROUND_FLOP]: ROUND_TURN,
    [ROUND_TURN]: ROUND_RIVER,
    [ROUND_RIVER]: {}
  }

  let roundPlayerCircle = {}
  players.forEach((_, index) => {
    if(index < players.length-1) {
      roundPlayerCircle[players[index]] = players[index+1]
    } else {
      roundPlayerCircle[players[index]] = players[0]
    }
  })

  const getNextPlayer = () => {
    let nextPlayer = roundPlayerCircle[selectedPlayer]
    while(foldedPlayers[nextPlayer]) {
      nextPlayer = roundPlayerCircle[nextPlayer]
    }
    return nextPlayer
  }

  let foldedPlayers: {[k in AvailablePlayerNames]?: {}} = {}
  const setFoldedPlayers = (newValue) => {
    foldedPlayers = newValue
  }

  let playersWithCheck: {[k in AvailablePlayerNames]?: {}} = {}
  const setPlayersWithCheck = (newValue) => {
    playersWithCheck = newValue
  }

  let playersWithSameBet: {[k in AvailablePlayerNames]?: {}} = {}
  const setPlayersWithSameBet = (newValue) => {
    playersWithSameBet = newValue
  }

  let maxBet = -Number.MAX_VALUE
  const setMaxBet = (newValue) => {
    maxBet = newValue
  }

  const resetPlayerCheck = (player: AvailablePlayerNames) => {
    const newPlayersWithCheck = copyObj(playersWithCheck)
    delete newPlayersWithCheck[player]

    setPlayersWithCheck(newPlayersWithCheck)
  }

  const putDeposit = (player: AvailablePlayerNames, playerDeposit) => {
    const newDeposits = copyObj(protectedDeposits)
    for(let key in playerDeposit) {
      if(playerDeposit.hasOwnProperty(key)) {
        if(newDeposits[player][key].count >= playerDeposit[key].count) {
          newDeposits[player][key].count -= playerDeposit[key].count
        } else {
          return Promise.reject(new Error("not enough dips"))
        }
      }
    }
    return newDeposits
  }

  const restoreDeposit = (player: AvailablePlayerNames, playerDeposit) => {
    const newDeposits = copyObj(protectedDeposits)
    for(let key in playerDeposit) {
      if(playerDeposit.hasOwnProperty(key)) {
        newDeposits[player][key].count += playerDeposit[key].count
      }
    }
    return newDeposits
  }

  const putRoundDeposit = (player: AvailablePlayerNames, playerDeposit) => {
    const newRoundsDeposit = copyObj(roundsDeposit)
    newRoundsDeposit[selectedRound][player] = playerDeposit
    return newRoundsDeposit
  }

  const restoreRoundDeposit = (player: AvailablePlayerNames) => {
    const newRoundsDeposit = copyObj(roundsDeposit)
    delete newRoundsDeposit[selectedRound][player]
    return newRoundsDeposit
  }



  const betInternal = (player: AvailablePlayerNames, playerDeposit) => {
    const newDeposits = putDeposit(player, playerDeposit)
    setDeposits(newDeposits)

    const newRoundsDeposit = putRoundDeposit(player, playerDeposit)
    setRoundDeposit(newRoundsDeposit)

    resetPlayerCheck(player)

    setSelectedPlayer(getNextPlayer())

    const newMaxBet = calculateBet(playerDeposit)
    setMaxBet(newMaxBet)
  }

  this.bet = async function(player: AvailablePlayerNames, playerDeposit: PlayerDictDip){
    await checkSelectedPlayer(player)
    betInternal(player, playerDeposit)
  }

  const checkSelectedPlayer = async (player) => {
    if(player === selectedPlayer) {
      // keep
    } else {
      return Promise.reject(new Error('it is not a turn for this player'))
    }
  }

  let gameCompleted = false
  const setGameCompleted = (newValue) => {
    gameCompleted = true
  }

  const getRoundAvailablePlayers = () => {
    const roundAvailablePlayers = []
    Object.keys(roundsDeposit[selectedRound]).forEach((key) => {
      if(foldedPlayers[key]) return
      roundAvailablePlayers.push(key)
    })
    return roundAvailablePlayers
  }

  this.keepSame = async function(player: AvailablePlayerNames) {
    await checkSelectedPlayer(player)

    const playerBet = calculateBet(roundsDeposit[selectedRound][player])
    if(playerBet >= maxBet) {
      // keep
    } else {
      return Promise.reject(new Error("bet in this round should be same to use keep same option"))
    }
    const newPlayersWithSameBet = copyObj(playersWithSameBet)
    newPlayersWithSameBet[player] = {}
    setPlayersWithSameBet(newPlayersWithSameBet)

    resetPlayerCheck(player)
    setSelectedPlayer(getNextPlayer())

    const roundAvailablePlayers = getRoundAvailablePlayers()

    const roundCompleted = Object.keys(playersWithCheck).length === 0
      && roundAvailablePlayers.reduce((prev, curr) => {
      const playerBet = calculateBet(roundsDeposit[selectedRound][curr])
      return prev && playerBet === maxBet
    }, true)
    if(roundCompleted && typeof roundCircle[selectedRound] === 'string') {
      setSelectedRound(roundCircle[selectedRound])
      setMaxBet(0)

      const newPlayersWithCheck = {}
      setPlayersWithCheck(newPlayersWithCheck)

      console.log(roundsDeposit)
      setSelectedPlayer(players[0])
    } else if(roundCompleted) {
      // one game completed
      setGameCompleted(true)
    }
  }

  const calculateDeposit = (player: AvailablePlayerNames, usedBet) => {
    const newKeys = Object.keys(protectedDeposits[player]).sort((a,b) => {
      return Number(a.split('_')[2]) - Number(b.split('_')[2])
    }).reverse()
    const newBetDip: PlayerDictDip = {}
    let newBet = 0
    for(let i in newKeys) {
      const key = newKeys[i]
      if(newBet === usedBet) break

      while(newBet + DIP_AMOUNT_NUMBERS[key] <= usedBet) {
        newBet += DIP_AMOUNT_NUMBERS[key]

        if(newBetDip[key]) {
          newBetDip[key].count++
        } else {
          newBetDip[key] = { count: 1 }
        }
      }
    }
    return newBetDip
  }

  this.call = async function(player: AvailablePlayerNames){
    await checkSelectedPlayer(player)

    if(roundsDeposit[selectedRound][player]) {
      // aka transaction
      const newDeposits = restoreDeposit(player, roundsDeposit[selectedRound][player])
      setDeposits(newDeposits)

      const newRoundsDeposit = restoreRoundDeposit(player)
      setRoundDeposit(newRoundsDeposit)
    }

    const newBetDip = calculateDeposit(player, maxBet)
    betInternal(player, newBetDip)
  }
  this.raise = async function (player: AvailablePlayerNames, playerDeposit: PlayerDictDip){
    await checkSelectedPlayer(player)
    const newMaxBet = calculateBet(playerDeposit)
    if(newMaxBet >= maxBet) {
      setMaxBet(newMaxBet)
    } else {
      return Promise.reject(new Error("bet should be higher than max bet"))
    }

    const newBetDip = calculateDeposit(player, newMaxBet)
    betInternal(player, newBetDip)
  }
  this.fold = async function(player: AvailablePlayerNames){
    await checkSelectedPlayer(player)
    const newFoldedPlayers = copyObj(foldedPlayers)
    newFoldedPlayers[player] = {}
    setFoldedPlayers(newFoldedPlayers)

    setSelectedPlayer(getNextPlayer())
  }

  this.check = async function(player: AvailablePlayerNames) {
    await checkSelectedPlayer(player)
    if(playersWithCheck[player]) {
      return Promise.reject(new Error("player already did a check, he needs to do call either raise"))
    }
    const newPlayersWithCheck = copyObj(playersWithCheck)
    newPlayersWithCheck[player] = {}
    setPlayersWithCheck(newPlayersWithCheck)

    setSelectedPlayer(getNextPlayer())
  }

  const playerCards = {}

  this.spreadCards = async function(){
    if(selectedRound === ROUND_PREFLOP) {
      players.forEach((player) => {
        playerCards[player] = cards.splice(cards.length-2, 2)
      })
    } else if (selectedRound === ROUND_FLOP) {
      that.spreadFlopCards()
    } else if(selectedRound === ROUND_TURN) {
      that.spreadTurnCards()
    } else if(selectedRound === ROUND_RIVER) {
      that.spreadRiverCards()
    }
  }
  this.getPlayerCards = async function(player) {
    return playerCards[player]
  }

  let flopCards = []
  const setFlopCards = (newValue) => {
    flopCards = newValue
  }
  let turnCards = []
  const setTurnCards = (newValue) => {
    turnCards = newValue
  }
  let riverCards = []
  const setRiverCards = (newValue) => {
    riverCards = newValue
  }

  this.spreadFlopCards = async function() {
    if(flopCards.length) return
    const newCards = cards.splice(cards.length-3, 3)
    setFlopCards(newCards)
  }
  this.spreadTurnCards = async function() {
    if(turnCards.length) return
    const newCards = cards.splice(cards.length-1, 1)
    setTurnCards(newCards)
  }
  this.spreadRiverCards = async function() {
    if(riverCards.length) return
    const newCards = cards.splice(cards.length-1, 1)
    setRiverCards(newCards)
  }

  this.getFlopCards = async function() {
    return flopCards
  }
  this.getTurnCards = async function() {
    return flopCards.concat(turnCards)
  }
  this.getRiverCards = async function() {
    return flopCards.concat(turnCards).concat(riverCards)
  }

  this.getCards = async function() {
    if(selectedRound === ROUND_FLOP) return that.getFlopCards()
    if(selectedRound === ROUND_TURN) return that.getTurnCards()
    if(selectedRound === ROUND_RIVER) return that.getRiverCards()
  }

  this.detectWinner = async function() {
    if(selectedRound === ROUND_RIVER) {
      console.log('winners')
      console.log(protectedDeposits)
      console.log("roundDeposit", JSON.stringify(roundsDeposit))

      const roundAvailablePlayers = getRoundAvailablePlayers()
      const playersCards = []
      await Promise.all(roundAvailablePlayers.map(async (player) => {
        const playerCard = await that.getPlayerCards(player)
        const boardCards = await that.getCards()
        playersCards.push(playerCard.concat(boardCards))
      }))

      let res = await detectWinner(playersCards)

      let foundWinner
      if('winner' in res) {
        foundWinner = roundAvailablePlayers[res['winner']]
      }
      if('winners' in res) {
        foundWinner = roundAvailablePlayers.filter((_, index) => res['winners'].indexOf(index) !== -1)
      }
      return {
        [res['winners'] ? 'winners' : 'winner']: foundWinner
      }
    }
  }

  this.getPlayerDeposit = async function(player) {
    return protectedDeposits[player]
  }

  this.spreadPot = async function(winners) {

  }

}