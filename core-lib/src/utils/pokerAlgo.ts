import { availableRounds, RoundDeposit } from "@core-lib/components/models/round";
import { DIP_AMOUNT_KEYS, DIP_AMOUNT_NUMBERS, PlayerDictDip } from "@core-lib/components/models/dipsAmount";
import { AvailablePlayerNames } from "@core-lib/components/models/players";

const SUITS = ['tiles', 'pikes', 'clovers', 'hearts']
type SuitsNames = 'tiles' | 'pikes' | 'clovers' | 'hearts'
type CardValues = 'a' | 'k' | 'q' | 'j' | 't' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2'
type SuitDict = {
  [k in SuitsNames]?: {
    [v in CardValues]?: {}
  }
}
type Cards = Array<string>

type RoyalFlush = {
  "royal_flush": SuitDict | null
}
type StraightFlush = {
  "straight_flush": SuitDict | null
}
type FourOfKind = {
  "four_of_kind": SuitDict | null
}
type FullHouse = {
  "full_house": SuitDict | null
}

type Flush = {
  "flush": SuitDict | null
}
type Straight = {
  "straight": SuitDict | null
}
type ThreeOfKind = {
  "three_of_kind": SuitDict | null
}
type TwoPairs = {
  "two_pairs": SuitDict | null
}
type Pair = {
  "pair": SuitDict | null
}
type HighCard = {
  "high_card": string | null
}

type NoPairResult = {
  winner?: string,
  result?: string
}
type ResultOnePair = NoPairResult | Promise<never>

type HandRanking = RoyalFlush & StraightFlush & FourOfKind & FullHouse
  & Flush & Straight & ThreeOfKind & TwoPairs & Pair & HighCard

export const getSuitDict = (cards): SuitDict => {
  const suitsDict = {}

  cards.forEach((card) => {
    const suit = card.split('-')[0]
    const value = card.split('-')[1]
    if(suitsDict[suit]) {
      suitsDict[suit][value] = {}
    } else {
      suitsDict[suit] = { [value]: {} }
    }
  })
  return suitsDict
}

export const detectRoyalFlush = (cards): RoyalFlush => {
  const suitsDict = getSuitDict(cards)
  let containsRoyalFlush = false
  let foundRoyalFlush

  for(let i in SUITS) {
    const suit = SUITS[i]
    if(suitsDict[suit]) {
      containsRoyalFlush =  containsRoyalFlush
        || ('a' in suitsDict[suit] && 'k' in suitsDict[suit]
          && 'q' in suitsDict[suit] && 'j' in suitsDict[suit]
          && 't' in suitsDict[suit])
      if(containsRoyalFlush) {
        foundRoyalFlush = { [suit]: { 'a': {}, 'k': {}, 'q': {}, 'j': {}, 't': {} } }
      }
      break
    }
  }

  return {
    'royal_flush': containsRoyalFlush ? foundRoyalFlush : null
  }
}

export const detectStraightFlush = (cards): StraightFlush => {
  const suitsDict = getSuitDict(cards)
  const sequences = [
    ['k', 'q', 'j', 't', '9'],
    ['q', 'j', 't', '9', '8'],
    ['j', 't', '9', '8', '7'],
    ['t', '9', '8', '7', '6'],
    ['9', '8', '7', '6', '5'],
    ['8', '7', '6', '5', '4'],
    ['7', '6', '5', '4', '3'],
    ['6', '5', '4', '3', '2'],
    ['5', '4', '3', '2', 'a']
  ]
  let containsStraightFlush = false
  let foundStraightFlush

  for(let i in SUITS) {
    const suit = SUITS[i]
    if(suitsDict[suit]) {

      for(let j in sequences) {
        const sequence = sequences[j]
        containsStraightFlush =  containsStraightFlush
          || (sequence[0] in suitsDict[suit] && sequence[1] in suitsDict[suit]
            && sequence[2] in suitsDict[suit] && sequence[3] in suitsDict[suit]
            && sequence[4] in suitsDict[suit])
        if(containsStraightFlush) {
          foundStraightFlush = {[suit]: {
              [sequence[0]]: {},
              [sequence[1]]: {},
              [sequence[2]]: {},
              [sequence[3]]: {},
              [sequence[4]]: {}
            } }
          break
        }
      }
      if(containsStraightFlush) {
        break
      }
    }
  }
  return {
    "straight_flush": containsStraightFlush ? foundStraightFlush : null
  }
}
export const detectFourOfKind = (cards): FourOfKind => {
  const suitsDict = getSuitDict(cards)

  const kinds = [
    ['a', 'a', 'a', 'a'],
    ['k', 'k', 'k', 'k'],
    ['q', 'q', 'q', 'q'],
    ['j', 'j', 'j', 'j'],
    ['t', 't', 't', 't'],
    ['9', '9', '9', '9'],
    ['8', '8', '8', '8'],
    ['7', '7', '7', '7'],
    ['6', '6', '6', '6'],
    ['5', '5', '5', '5'],
    ['4', '4', '4', '4'],
    ['3', '3', '3', '3'],
    ['2', '2', '2', '2'],
  ]
  let containsFourOfKind = false
  let foundFourOfKind

  for(let i in kinds) {
    const kind = kinds[i]
    if(suitsDict[SUITS[0]] && kind[0] in suitsDict[SUITS[0]]
      && suitsDict[SUITS[1]] && kind[1] in suitsDict[SUITS[1]]
      && suitsDict[SUITS[2]] && kind[2] in suitsDict[SUITS[2]]
      && suitsDict[SUITS[3]] && kind[3] in suitsDict[SUITS[3]]
    ) {
      foundFourOfKind = {
        [SUITS[0]]: {[kind[0]]: {}},
        [SUITS[1]]: {[kind[1]]: {}},
        [SUITS[2]]: {[kind[2]]: {}},
        [SUITS[3]]: {[kind[3]]: {}}
      }
      containsFourOfKind = true
      break
    }
  }
  return {
    "four_of_kind": containsFourOfKind ? foundFourOfKind : null
  }
}

export const _detectThreeOfKind = (cards): ThreeOfKind => {
  const suitsDict = getSuitDict(cards)

  const kinds = [
    ['a', 'a', 'a', 'a'],
    ['k', 'k', 'k', 'k'],
    ['q', 'q', 'q', 'q'],
    ['j', 'j', 'j', 'j'],
    ['t', 't', 't', 't'],
    ['9', '9', '9', '9'],
    ['8', '8', '8', '8'],
    ['7', '7', '7', '7'],
    ['6', '6', '6', '6'],
    ['5', '5', '5', '5'],
    ['4', '4', '4', '4'],
    ['3', '3', '3', '3'],
    ['2', '2', '2', '2'],
  ]
  let containsThreeOfKind = false
  let foundThreeOfKind

  for(let i in kinds) {
    const kind = kinds[i]
    if(suitsDict[SUITS[1]] && kind[1] in suitsDict[SUITS[1]]
      && suitsDict[SUITS[2]] && kind[2] in suitsDict[SUITS[2]]
      && suitsDict[SUITS[3]] && kind[3] in suitsDict[SUITS[3]]
    ) {
      foundThreeOfKind = {
        [SUITS[1]]: {[kind[1]]: {}},
        [SUITS[2]]: {[kind[2]]: {}},
        [SUITS[3]]: {[kind[3]]: {}}
      }
      containsThreeOfKind = true
      break
    }
    if(suitsDict[SUITS[0]] && kind[0] in suitsDict[SUITS[0]]
      && suitsDict[SUITS[1]] && kind[1] in suitsDict[SUITS[1]]
      && suitsDict[SUITS[3]] && kind[3] in suitsDict[SUITS[3]]
    ) {
      foundThreeOfKind = {
        [SUITS[0]]: {[kind[0]]: {}},
        [SUITS[1]]: {[kind[1]]: {}},
        [SUITS[3]]: {[kind[3]]: {}}
      }
      containsThreeOfKind = true
      break
    }
    if(suitsDict[SUITS[0]] && kind[0] in suitsDict[SUITS[0]]
      && suitsDict[SUITS[1]] && kind[1] in suitsDict[SUITS[1]]
      && suitsDict[SUITS[2]] && kind[2] in suitsDict[SUITS[2]]
    ) {
      foundThreeOfKind = {
        [SUITS[0]]: {[kind[0]]: {}},
        [SUITS[1]]: {[kind[1]]: {}},
        [SUITS[2]]: {[kind[2]]: {}},
      }
      containsThreeOfKind = true
      break
    }
    if(suitsDict[SUITS[0]] && kind[0] in suitsDict[SUITS[0]]
      && suitsDict[SUITS[2]] && kind[2] in suitsDict[SUITS[2]]
      && suitsDict[SUITS[3]] && kind[3] in suitsDict[SUITS[3]]
    ) {
      foundThreeOfKind = {
        [SUITS[0]]: {[kind[0]]: {}},
        [SUITS[2]]: {[kind[2]]: {}},
        [SUITS[3]]: {[kind[3]]: {}},
      }
      containsThreeOfKind = true
      break
    }
  }
  return {
    "three_of_kind": containsThreeOfKind ? foundThreeOfKind : null
  }
}

export const _detectPair = (cards): Pair => {
  const suitsDict = getSuitDict(cards)

  const kinds = [
    ['a', 'a', 'a', 'a'],
    ['k', 'k', 'k', 'k'],
    ['q', 'q', 'q', 'q'],
    ['j', 'j', 'j', 'j'],
    ['t', 't', 't', 't'],
    ['9', '9', '9', '9'],
    ['8', '8', '8', '8'],
    ['7', '7', '7', '7'],
    ['6', '6', '6', '6'],
    ['5', '5', '5', '5'],
    ['4', '4', '4', '4'],
    ['3', '3', '3', '3'],
    ['2', '2', '2', '2'],
  ]
  let containsPair = false
  let foundPair

  for(let i in kinds) {
    const kind = kinds[i]
    if(suitsDict[SUITS[0]] && kind[0] in suitsDict[SUITS[0]]
      && suitsDict[SUITS[1]] && kind[1] in suitsDict[SUITS[1]]
    ) {
      foundPair = {
        [SUITS[0]]: {[kind[0]]: {}},
        [SUITS[1]]: {[kind[1]]: {}},
      }
      containsPair = true
      break
    }
    if(suitsDict[SUITS[1]] && kind[1] in suitsDict[SUITS[1]]
      && suitsDict[SUITS[2]] && kind[2] in suitsDict[SUITS[2]]
    ) {
      foundPair = {
        [SUITS[1]]: {[kind[1]]: {}},
        [SUITS[2]]: {[kind[2]]: {}},
      }
      containsPair = true
      break
    }
    if(suitsDict[SUITS[2]] && kind[2] in suitsDict[SUITS[2]]
      && suitsDict[SUITS[3]] && kind[3] in suitsDict[SUITS[3]]
    ) {
      foundPair = {
        [SUITS[2]]: {[kind[2]]: {}},
        [SUITS[3]]: {[kind[3]]: {}},
      }
      containsPair = true
      break
    }
    if(suitsDict[SUITS[3]] && kind[3] in suitsDict[SUITS[3]]
      && suitsDict[SUITS[0]] && kind[0] in suitsDict[SUITS[0]]
    ) {
      foundPair = {
        [SUITS[3]]: {[kind[3]]: {}},
        [SUITS[0]]: {[kind[0]]: {}},
      }
      containsPair = true
      break
    }
    if(suitsDict[SUITS[1]] && kind[1] in suitsDict[SUITS[1]]
      && suitsDict[SUITS[3]] && kind[3] in suitsDict[SUITS[3]]
    ) {
      foundPair = {
        [SUITS[1]]: {[kind[1]]: {}},
        [SUITS[3]]: {[kind[3]]: {}},
      }
      containsPair = true
      break
    }
    if(suitsDict[SUITS[2]] && kind[2] in suitsDict[SUITS[2]]
      && suitsDict[SUITS[0]] && kind[0] in suitsDict[SUITS[0]]
    ) {
      foundPair = {
        [SUITS[2]]: {[kind[2]]: {}},
        [SUITS[0]]: {[kind[0]]: {}},
      }
      containsPair = true
      break
    }
  }
  return {
    "pair": containsPair ? foundPair : null
  }
}

export const detectFullHouse = (cards): FullHouse => {
  const localCards = cards.slice(0)
  let foundThreeOfKind = false
  let foundPair = false

  let hands = _detectThreeOfKind(localCards)

  if(hands['three_of_kind'] !== null) {
    Object.keys(hands['three_of_kind']).forEach((suit) => {
      Object.keys(hands['three_of_kind'][suit]).forEach((value) => {
        localCards.splice(localCards.indexOf(`${suit}-${value}`), 1)
      })
    })
    foundThreeOfKind = true

    hands = Object.assign(hands, _detectPair(localCards))
    if(hands['pair'] !== null) {
      foundPair = true
    }
  }
  let handsFullHouse
  if(foundThreeOfKind && foundPair) {
    handsFullHouse = hands['three_of_kind']

    SUITS.forEach((suit) => {
      if(!handsFullHouse[suit]) {
        handsFullHouse[suit] = {}
      }
      if(hands['pair'][suit]) {
        Object.keys(hands['pair'][suit]).forEach((value) => {
          handsFullHouse[suit][value] = {}
        })
      }
    })
  }

  return {
    "full_house": foundThreeOfKind && foundPair ? handsFullHouse : null
  }
}

export const detectFlush = (cards): Flush => {
  const suitsDict = getSuitDict(cards)
  const sequence = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5', '4', "3", "2"]
  let containsFlush = false
  let foundFlush

  for(let i in SUITS) {
    const suit = SUITS[i]
    if(suitsDict[suit] && Object.keys(suitsDict[suit]).length >= 5) {
      const newFlush = []
      sequence.forEach((value) => {
        if(suitsDict[suit][value]) {
          newFlush.push(value)
        }
      })
      const newFoundFlush = {}
      newFlush.slice(0, 5).forEach((value) => {
        if(!newFoundFlush[suit]) {
          newFoundFlush[suit] = {}
        }
        newFoundFlush[suit][value] = {}
      })
      foundFlush = newFoundFlush
      containsFlush = true
      break
    }
  }
  return {
    "flush": containsFlush ? foundFlush : null
  }
}
export const detectStraight = (cards): Straight => {
  const sequences = [
    ['a', 'k', 'q', 'j', 't'],
    ['k', 'q', 'j', 't', '9'],
    ['q', 'j', 't', '9', '8'],
    ['j', 't', '9', '8', '7'],
    ['t', '9', '8', '7', '6'],
    ['9', '8', '7', '6', '5'],
    ['8', '7', '6', '5', '4'],
    ['7', '6', '5', '4', '3'],
    ['6', '5', '4', '3', '2'],
    ['5', '4', '3', '2', 'a'],
  ]

  const dictValues = {}
  cards.forEach((card) => {
    const value = card.split('-')[1]
    dictValues[value] = card
  })

  let containsStraight = false
  let foundStraight

  for(let i in sequences) {
    const sequence = sequences[i]
    if(sequence[0] in dictValues && sequence[1] in dictValues
      && sequence[2] in dictValues && sequence[3] in dictValues
      && sequence[4] in dictValues
    ) {
      const newFoundPieces = [dictValues[sequence[0]], dictValues[sequence[1]],
        dictValues[sequence[2]], dictValues[sequence[3]], dictValues[sequence[4]]
      ]
      const newFoundStraight = {}
      newFoundPieces.forEach((card) => {
        const suit = card.split('-')[0]
        const value = card.split('-')[1]
        if(!newFoundStraight[suit]) {
          newFoundStraight[suit] = {}
        }
        newFoundStraight[suit][value] = {}
      })
      foundStraight = newFoundStraight
      containsStraight = true
      break
    }
  }

  return {
    "straight": containsStraight ? foundStraight : null
  }
}
export const detectThreeOfKind = (cards): ThreeOfKind => {
  return _detectThreeOfKind(cards)
}
export const detectTwoPairs = (cards): TwoPairs => {
  const localCards = cards.slice(0)
  const hands = _detectPair(localCards)

  let containsFirstPair = false
  let containsSecondPair = false
  let foundSecondPair

  if(hands['pair'] !== null) {
    Object.keys(hands['pair']).forEach((suit) => {
      Object.keys(hands['pair'][suit]).forEach((value) => {
        localCards.splice(localCards.indexOf(`${suit}-${value}`), 1)
      })
    })
    containsFirstPair = true

    foundSecondPair = _detectPair(localCards)
    if(foundSecondPair['pair'] !== null) {
      containsSecondPair = true
    }
  }

  let handsTwoPairs
  if(containsFirstPair && containsSecondPair) {
    handsTwoPairs = hands['pair']

    SUITS.forEach((suit) => {
      if(!handsTwoPairs[suit]) {
        handsTwoPairs[suit] = {}
      }
      if(foundSecondPair['pair'][suit]) {
        Object.keys(foundSecondPair['pair'][suit]).forEach((value) => {
          handsTwoPairs[suit][value] = {}
        })
      }
    })
  }

  return {
    "two_pairs": containsFirstPair && containsSecondPair ? handsTwoPairs : null
  }
}
export const detectPair = (cards): Pair => {
  return _detectPair(cards)
}
export const detectHighCard = (cards): HighCard => {
  const sequence = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5', '4', "3", "2"]

  let containsHighCard = false
  let foundHighCard

  const cardsValues = {}

  for(let i in cards) {
    const value = cards[i].split('-')[1]
    cardsValues[value] = cards[i]
  }
  for(let i in sequence) {
    if(sequence[i] in cardsValues) {
      foundHighCard = cardsValues[sequence[i]]
      containsHighCard = true
      break
    }
  }

  return {
    "high_card": containsHighCard ? foundHighCard : null
  }
}

const getCardsValues = (cards) => {
  const valuesDict = {}
  for(let i in cards) {
    const card = cards[i]

    const value = card.split('-')[1]
    if(!valuesDict[value]) {
      valuesDict[value] = {}
      continue
    }
    if(valuesDict[value]) {
      valuesDict[`2x${value}`] = {}
      continue
    }
    if(valuesDict[`2x${value}`]) {
      valuesDict[`3x${value}`] = {}
      continue
    }
    if(valuesDict[`3x${value}`]) {
      valuesDict[`4x${value}`] = {}
      continue
    }
  }
  return valuesDict
}

export const compareNoPairHands = (firstHand, secondHand, iterations): NoPairResult => {
  let firstLocalCards = firstHand.slice(0)
  let secondLocalCards = secondHand.slice(0)

  const sequence = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5', '4', "3", "2"]
  let foundWinner

  let iterationCounter = 0
  while(firstLocalCards.length && secondLocalCards.length && iterationCounter < iterations) {
    let firstHandHighCard = detectHighCard(firstLocalCards)
    let secondHandHighCard = detectHighCard(secondLocalCards)

    let firstValue = firstHandHighCard['high_card'].split('-')[1]
    let secondValue = secondHandHighCard['high_card'].split('-')[1]

    if(sequence.indexOf(firstValue) < sequence.indexOf(secondValue)) {
      foundWinner = { "first_hand": {} }
      break
    }
    if(sequence.indexOf(firstValue) > sequence.indexOf(secondValue)) {
      foundWinner = { "second_hand": {} }
      break
    }

    firstLocalCards.splice(firstLocalCards.indexOf(firstHandHighCard['high_card']), 1)
    secondLocalCards.splice(secondLocalCards.indexOf(secondHandHighCard['high_card']), 1)
    iterationCounter++
  }
  if(foundWinner) {
    return {
      "winner": foundWinner
    }
  }
  return {
    "result": "tie"
  }
}

const convertSuitDictIntoCards = (dict: SuitDict): Cards => {
  const newCards = []
  for(let i in SUITS) {
    const suit = SUITS[i]
    if(dict[suit]) {
      Object.keys(dict[suit]).forEach((value) => {
        newCards.push(`${suit}-${value}`)
      })
    }
  }
  return newCards
}

export const comparePair = (firstHand, secondHand) => {
  const firstHandPair = detectPair(firstHand)
  const secondHandPair = detectPair(secondHand)

  if(firstHandPair['pair'] && secondHandPair['pair']) {
    const res = compareNoPairHands(convertSuitDictIntoCards(firstHandPair['pair']), convertSuitDictIntoCards(secondHandPair['pair']), 1)
    if (res['winner']) {
      return res
    }
    return compareSameOnePair(firstHand, secondHand)
  } else {
    throw new Error('both hands expected to have a pair')
  }
}

export const compareSameOnePair = (firstHand, secondHand): ResultOnePair => {
  let firstLocalCards = firstHand.slice(0)
  let secondLocalCards = secondHand.slice(0)

  const firstHandPair = detectPair(firstLocalCards)
  const secondHandPair = detectPair(secondLocalCards)

  if(firstHandPair['pair'] && secondHandPair['pair']) {
    let firstHandCardsToRemove = convertSuitDictIntoCards(firstHandPair['pair'])
    firstHandCardsToRemove.forEach((card) => {
      firstLocalCards.splice(firstLocalCards.indexOf(card), 1)
    })

    let secondHandCardsToRemove = convertSuitDictIntoCards(secondHandPair['pair'])
    secondHandCardsToRemove.forEach((card) => {
      secondLocalCards.splice(secondLocalCards.indexOf(card), 1)
    })

    return compareNoPairHands(firstLocalCards, secondLocalCards, 3)
  } else {
    throw new Error('both hands expected to have a pair')
  }
}

export const detectHandRanking = async (cards): Promise<HandRanking> => {
  const hands = {
    ...detectRoyalFlush(cards),
    ...detectStraightFlush(cards),
    ...detectFourOfKind(cards),
    ...detectFullHouse(cards),
    ...detectFlush(cards),
    ...detectStraight(cards),
    ...detectThreeOfKind(cards),
    ...detectTwoPairs(cards),
    ...detectPair(cards),
    ...detectHighCard(cards)
  }

  return hands
}
export const compareTwoPairs = (firstHand, secondHand) => {
  let firstLocalCards = firstHand.slice(0)
  let secondLocalCards = secondHand.slice(0)

  const firstHandPairs = detectTwoPairs(firstLocalCards)
  const secondHandPairs = detectTwoPairs(secondLocalCards)

  if(firstHandPairs['two_pairs'] && secondHandPairs['two_pairs']) {
    let iterationCounter = 0
    while(firstLocalCards.length && secondLocalCards.length) {
      if(iterationCounter === 2) {
        return compareNoPairHands(firstLocalCards, secondLocalCards, 1)
      }

      const higherFirstHandPair = detectPair(convertSuitDictIntoCards(firstHandPairs['two_pairs']))
      const higherSecondHandPair = detectPair(convertSuitDictIntoCards(secondHandPairs['two_pairs']))

      const res = compareNoPairHands(
        convertSuitDictIntoCards(higherFirstHandPair['pair']),
        convertSuitDictIntoCards(higherSecondHandPair['pair']),
        1
      )

      if(res['winner']) {
        return res
      }

      let firstHandCardsToRemove = convertSuitDictIntoCards(higherFirstHandPair['pair'])
      firstHandCardsToRemove.forEach((card) => {
        firstLocalCards.splice(firstLocalCards.indexOf(card), 1)
      })
      let secondHandCardsToRemove = convertSuitDictIntoCards(higherSecondHandPair['pair'])
      secondHandCardsToRemove.forEach((card) => {
        secondLocalCards.splice(secondLocalCards.indexOf(card), 1)
      })
      iterationCounter++
    }
  } else {
    throw new Error('both hands expected to have two pairs')
  }

  return {
    "result": "tie"
  }
}

export const compareThreeOfKind = (firstHand, secondHand) => {
  let firstLocalCards = firstHand.slice(0)
  let secondLocalCards = secondHand.slice(0)

  const firstHandThreeOfKind = _detectThreeOfKind(firstLocalCards)
  const secondHandThreeOfKind = _detectThreeOfKind(secondLocalCards)

  const res = compareNoPairHands(
    convertSuitDictIntoCards(firstHandThreeOfKind['three_of_kind']),
    convertSuitDictIntoCards(secondHandThreeOfKind['three_of_kind']),
    1
  )
  if(res['winner']) {
    return res
  }

  let firstHandCardsToRemove = convertSuitDictIntoCards(firstHandThreeOfKind['three_of_kind'])
  firstHandCardsToRemove.forEach((card) => {
    firstLocalCards.splice(firstLocalCards.indexOf(card), 1)
  })
  let secondHandCardsToRemove = convertSuitDictIntoCards(secondHandThreeOfKind['three_of_kind'])
  secondHandCardsToRemove.forEach((card) => {
    secondLocalCards.splice(secondLocalCards.indexOf(card), 1)
  })
  return compareNoPairHands(firstLocalCards, secondLocalCards, 2)
}

export const calculateBet = (playerDeposit) => {
  return Object.keys(JSON.parse(JSON.stringify(playerDeposit))).reduce(
    (prev, key) => prev + DIP_AMOUNT_NUMBERS[key] * playerDeposit[key].count,
    0)
}

const takeSumFromPotUsingAmount = (requiredSum, amount, summaryPot, potPerPlayer, winner) => {
  const newPotPerPlayer = JSON.parse(JSON.stringify(potPerPlayer))
  const newSummaryPot = JSON.parse(JSON.stringify(summaryPot))

  let takenSum = 0
  // console.log("newSummaryPot before", newSummaryPot)
  if(newSummaryPot[amount]) {
    const requiredCount = Math.trunc(requiredSum / DIP_AMOUNT_NUMBERS[amount])
    if(requiredCount <= newSummaryPot[amount].count && newSummaryPot[amount].count > 0) {
      if(!newPotPerPlayer[winner][amount]) {
        newPotPerPlayer[winner][amount] = { count: 0 }
      }
      newPotPerPlayer[winner][amount].count += requiredCount
      newSummaryPot[amount].count -= requiredCount
      takenSum += requiredCount * DIP_AMOUNT_NUMBERS[amount]
    } else if(newSummaryPot[amount].count > 0) {
      if(!newPotPerPlayer[winner][amount]) {
        newPotPerPlayer[winner][amount] = { count: 0 }
      }
      newPotPerPlayer[winner][amount].count += requiredCount
      newSummaryPot[amount].count -= requiredCount
      takenSum += requiredCount * DIP_AMOUNT_NUMBERS[amount]
    }
  }
  // console.log(takenSum)
  // console.log("newSummaryPot after", newSummaryPot)
  // console.log({winner, requiredSum, amount, takenSum})

  return {
    summaryPot: newSummaryPot,
    potPerPlayer: newPotPerPlayer,
    takenSum,
  }
}

export const splitPot = (winners, playersDeposits: {[k in AvailablePlayerNames]?: PlayerDictDip}, roundDeposit: RoundDeposit) => {
  let summaryPot: PlayerDictDip = {}
  const newPlayerDeposits = JSON.parse(JSON.stringify(playersDeposits))

  Object.keys(availableRounds).forEach((roundKey) => {
    Object.keys(roundDeposit[roundKey]).forEach((player) => {
      Object.keys(roundDeposit[roundKey][player]).forEach((amountKey) => {
        if(!summaryPot[amountKey]) {
          summaryPot[amountKey] = { count: 0 }
        }
        summaryPot[amountKey].count += roundDeposit[roundKey][player][amountKey].count
      })
    })
  })
  // console.log("summaryPot", summaryPot)

  let potPerPlayer = JSON.parse(JSON.stringify(newPlayerDeposits))
  let dipAmountKeysDesc = DIP_AMOUNT_KEYS.reverse()

  for(let amountIndex = 0; amountIndex < dipAmountKeysDesc.length; amountIndex++) {
    const dipAmount = dipAmountKeysDesc[amountIndex]
    if(summaryPot[dipAmount]) {
      const amountPerPlayer = Math.trunc(summaryPot[dipAmount].count * DIP_AMOUNT_NUMBERS[dipAmount] / winners.length)

      if(summaryPot[dipAmount].count % winners.length === 0) {
        winners.forEach((winner) => {
          const { summaryPot: newSummaryPot, potPerPlayer: newPotPerPlayer } = takeSumFromPotUsingAmount(amountPerPlayer, dipAmount, summaryPot, potPerPlayer, winner)

          summaryPot = newSummaryPot
          potPerPlayer = newPotPerPlayer
        })
      } else {
        winners.forEach((winner) => {
          let takenSumPerPlayer = 0
          dipAmountKeysDesc.forEach((lowerDipAmount) => {
            const requiredSum = amountPerPlayer - takenSumPerPlayer
            const { summaryPot: newSummaryPot, potPerPlayer: newPotPerPlayer, takenSum } = takeSumFromPotUsingAmount(requiredSum, lowerDipAmount, summaryPot, potPerPlayer, winner)
            takenSumPerPlayer += takenSum

            summaryPot = newSummaryPot
            potPerPlayer = newPotPerPlayer
          })
        })
      }
    }
  }
  return potPerPlayer
}

export const compareStraight = (firstHand, secondHand) => {
  const firstHandStraight = detectStraight(firstHand)
  const secondHandStraight = detectStraight(secondHand)

  const sequence = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5', '4', "3", "2"]
  let foundWinner

  if(firstHandStraight['straight'] && secondHandStraight['straight']) {
    const firstHandValues = getCardsValues(convertSuitDictIntoCards(firstHandStraight['straight']))
    const firstHandStraightContainsOne = ['5', '4', "3", "2", 'a'].reduce((prev, value) => prev && firstHandValues[value], true)

    const secondHandValues = getCardsValues(convertSuitDictIntoCards(secondHandStraight['straight']))
    const secondHandStraightContainsOne = ['5', '4', "3", "2", 'a'].reduce((prev, value) => prev && secondHandValues[value], true)

    if(firstHandStraightContainsOne && !secondHandStraightContainsOne) {
      const firstHandValue = '5'
      const secondHandValue = detectHighCard(convertSuitDictIntoCards(secondHandStraight['straight']))['high_card'].split('-')[1]

      if(sequence.indexOf(firstHandValue) < sequence.indexOf(secondHandValue)) {
        foundWinner = { first_hand: {} }

        return { winner: foundWinner }
      }
      if(sequence.indexOf(firstHandValue) > sequence.indexOf(secondHandValue)) {
        foundWinner = { second_hand: {} }

        return { winner: foundWinner }
      }
      return { res: "tie" }
    }
    if(!firstHandStraightContainsOne && secondHandStraightContainsOne) {
      const firstHandValue = detectHighCard(convertSuitDictIntoCards(firstHandStraight['straight']))['high_card'].split('-')[1]
      const secondHandValue = '5'

      if(sequence.indexOf(firstHandValue) < sequence.indexOf(secondHandValue)) {
        foundWinner = { first_hand: {} }

        return { winner: foundWinner }
      }
      if(sequence.indexOf(firstHandValue) > sequence.indexOf(secondHandValue)) {
        foundWinner = { second_hand: {} }

        return { winner: foundWinner }
      }
      return { res: "tie" }
    }
    if(firstHandStraightContainsOne && secondHandStraightContainsOne) {
      return {
        "result": "tie"
      }
    }
    return compareNoPairHands(
      convertSuitDictIntoCards(firstHandStraight['straight']),
      convertSuitDictIntoCards(secondHandStraight['straight']),
      5
    )
  } else {
    throw new Error("both hands expected to have straight")
  }
}

export const compareFlush = (firstHand, secondHand) => {
  const firstHandFlush = detectFlush(firstHand)
  const secondHandFlush = detectFlush(secondHand)

  if(firstHandFlush['flush'] && secondHandFlush['flush']) {
    return compareNoPairHands(
      convertSuitDictIntoCards(firstHandFlush['flush']),
      convertSuitDictIntoCards(secondHandFlush['flush']),
      5
    )
  } else {
    throw new Error("both hands expected to have flush")
  }
}

export const compareFullHouse = (firstHand, secondHand) => {
  let firstLocalCards = firstHand.slice(0)
  let secondLocalCards = secondHand.slice(0)

  const firstHandFullHouse = detectFullHouse(firstLocalCards)
  const secondHandFullHouse = detectFullHouse(secondLocalCards)

  if(firstHandFullHouse['full_house'] && secondHandFullHouse['full_house']) {
    const firstHandThreeOfKind = detectThreeOfKind(convertSuitDictIntoCards(firstHandFullHouse['full_house']))
    const secondHandThreeOfKind = detectThreeOfKind(convertSuitDictIntoCards(secondHandFullHouse['full_house']))

    const res = compareNoPairHands(
      convertSuitDictIntoCards(firstHandThreeOfKind['three_of_kind']),
      convertSuitDictIntoCards(secondHandThreeOfKind['three_of_kind']),
      1
    )
    if(res['winner']) {
      return res
    }
    let firstHandCardsToRemove = convertSuitDictIntoCards(firstHandThreeOfKind['three_of_kind'])
    firstHandCardsToRemove.forEach((card) => {
      firstLocalCards.splice(firstLocalCards.indexOf(card), 1)
    })
    let secondHandCardsToRemove = convertSuitDictIntoCards(secondHandThreeOfKind['three_of_kind'])
    secondHandCardsToRemove.forEach((card) => {
      secondLocalCards.splice(secondLocalCards.indexOf(card), 1)
    })

    const firstHandPair = detectPair(firstLocalCards)
    const secondHandPair = detectPair(secondLocalCards)

    return compareNoPairHands(
      convertSuitDictIntoCards(firstHandPair['pair']),
      convertSuitDictIntoCards(secondHandPair['pair']),
      1
    )
  } else {
    throw new Error("both hands expected to have full_house")
  }
}

export const compareFourOfKind = (firstHand, secondHand) => {
  const firstHandFourOfKind = detectFourOfKind(firstHand)
  const secondHandFourOfKind = detectFourOfKind(secondHand)

  if(firstHandFourOfKind['four_of_kind'] && secondHandFourOfKind['four_of_kind']) {
    return compareNoPairHands(
      convertSuitDictIntoCards(firstHandFourOfKind['four_of_kind']),
      convertSuitDictIntoCards(secondHandFourOfKind['four_of_kind']),
      1
    )
  } else {
    throw new Error("both hands expected to have four_of_kind")
  }
}

export const compareStraightFlush = (firstHand, secondHand) => {
  const firstHandStraight = detectStraightFlush(firstHand)
  const secondHandStraight = detectStraightFlush(secondHand)

  if(firstHandStraight['straight_flush'] && secondHandStraight['straight_flush']) {
    return compareStraight(convertSuitDictIntoCards(firstHandStraight['straight_flush']), convertSuitDictIntoCards(secondHandStraight['straight_flush']))
  } else {
    throw new Error("both hands expected to have straight straight")
  }
}

export const compareRoyalFlush = (firstHand, secondHand) => {
  const firstHandStraight = detectRoyalFlush(firstHand)
  const secondHandStraight = detectRoyalFlush(secondHand)

  if(firstHandStraight['royal_flush'] && secondHandStraight['royal_flush']) {
    return compareStraight(convertSuitDictIntoCards(firstHandStraight['royal_flush']), convertSuitDictIntoCards(secondHandStraight['royal_flush']))
  } else {
    throw new Error("both hands expected to have royal flush")
  }
}

export const comparePlayers = async (firstPlayerCards, secondPlayerCards) => {
  const firstPlayerRanking = await detectHandRanking(firstPlayerCards)
  const secondPlayerRanking = await detectHandRanking(secondPlayerCards)

  if(firstPlayerRanking['royal_flush'] !== null && secondPlayerRanking['royal_flush'] !== null) {
    const res = compareRoyalFlush(firstPlayerCards, secondPlayerCards)
    if(res['winner'] && typeof res['winner']['first_hand'] !== 'undefined') return -1
    if(res['winner'] && typeof res['winner']['second_hand'] !== 'undefined') return 1
    return 0
  }
  if(firstPlayerRanking['royal_flush']) return -1
  if(secondPlayerRanking['royal_flush']) return 1

  if(firstPlayerRanking['straight_flush'] !== null && secondPlayerRanking['straight_flush'] !== null) {
    const res = compareStraightFlush(firstPlayerCards, secondPlayerCards)
    if(res['winner'] && typeof res['winner']['first_hand'] !== 'undefined') return -1
    if(res['winner'] && typeof res['winner']['second_hand'] !== 'undefined') return 1
    return 0
  }
  if(firstPlayerRanking['straight_flush']) return -1
  if(secondPlayerRanking['straight_flush']) return 1

  if(firstPlayerRanking['four_of_kind'] !== null && secondPlayerRanking['four_of_kind'] !== null) {
    const res = compareFourOfKind(firstPlayerCards, secondPlayerCards)
    if(res['winner'] && typeof res['winner']['first_hand'] !== 'undefined') return -1
    if(res['winner'] && typeof res['winner']['second_hand'] !== 'undefined') return 1
    return 0
  }
  if(firstPlayerRanking['four_of_kind']) return -1
  if(secondPlayerRanking['four_of_kind']) return 1

  if(firstPlayerRanking['full_house'] !== null && secondPlayerRanking['full_house'] !== null) {
    const res = compareFullHouse(firstPlayerCards, secondPlayerCards)
    if(res['winner'] && typeof res['winner']['first_hand'] !== 'undefined') return -1
    if(res['winner'] && typeof res['winner']['second_hand'] !== 'undefined') return 1
    return 0
  }
  if(firstPlayerRanking['full_house']) return -1
  if(secondPlayerRanking['full_house']) return 1

  if(firstPlayerRanking['flush'] !== null && secondPlayerRanking['flush'] !== null) {
    const res = compareFlush(firstPlayerCards, secondPlayerCards)
    if(res['winner'] && typeof res['winner']['first_hand'] !== 'undefined') return -1
    if(res['winner'] && typeof res['winner']['second_hand'] !== 'undefined') return 1
    return 0
  }
  if(firstPlayerRanking['flush']) return -1
  if(secondPlayerRanking['flush']) return 1

  if(firstPlayerRanking['straight'] !== null && secondPlayerRanking['straight'] !== null) {
    const res = compareStraight(firstPlayerCards, secondPlayerCards)
    if(res['winner'] && typeof res['winner']['first_hand'] !== 'undefined') return -1
    if(res['winner'] && typeof res['winner']['second_hand'] !== 'undefined') return 1
    return 0
  }
  if(firstPlayerRanking['straight']) return -1
  if(secondPlayerRanking['straight']) return 1

  if(firstPlayerRanking['three_of_kind'] !== null && secondPlayerRanking['three_of_kind'] !== null) {
    const res = compareThreeOfKind(firstPlayerCards, secondPlayerCards)
    if(res['winner'] && typeof res['winner']['first_hand'] !== 'undefined') return -1
    if(res['winner'] && typeof res['winner']['second_hand'] !== 'undefined') return 1
    return 0
  }
  if(firstPlayerRanking['three_of_kind']) return -1
  if(secondPlayerRanking['three_of_kind']) return 1

  if(firstPlayerRanking['two_pairs'] !== null && secondPlayerRanking['two_pairs'] !== null) {
    const res = compareTwoPairs(firstPlayerCards, secondPlayerCards)

    if(res['winner'] && typeof res['winner']['first_hand'] !== 'undefined') return -1
    if(res['winner'] && typeof res['winner']['second_hand'] !== 'undefined') return 1
    return 0
  }
  if(firstPlayerRanking['two_pairs']) return -1
  if(secondPlayerRanking['two_pairs']) return 1

  if(firstPlayerRanking['pair'] !== null && secondPlayerRanking['pair'] !== null) {
    const res = comparePair(firstPlayerCards, secondPlayerCards)
    if(res['winner'] && typeof res['winner']['first_hand'] !== 'undefined') return -1
    if(res['winner'] && typeof res['winner']['second_hand'] !== 'undefined') return 1
    return 0
  }
  if(firstPlayerRanking['pair']) return -1
  if(secondPlayerRanking['pair']) return 1

  const res = compareNoPairHands(firstPlayerCards, secondPlayerCards, 1)
  if(res['winner'] && typeof res['winner']['first_hand'] !== 'undefined') return -1
  if(res['winner'] && typeof res['winner']['second_hand'] !== 'undefined') return 1
  return 0
}

export const detectWinner = async (playersCards) => {
  const playersPoints = {}

  const sortedPlayers = playersCards.sort(async (firstPlayerCards, secondPlayerCards) => {
    return comparePlayers(firstPlayerCards, secondPlayerCards)
  })
  const loseTree = {}

  for(let index = 0; index < sortedPlayers.length; index++) {
    if(index+1 < sortedPlayers.length) {
      const res = await comparePlayers(sortedPlayers[index], sortedPlayers[index+1])
      if(res === -1) {
        if(!loseTree[index+1]) {
          loseTree[index+1] = []
        }
        loseTree[index+1].push(index)

        if(!playersPoints[index]) {
          playersPoints[index] = 0
        }
        playersPoints[index] += 1
        continue
      }
      if(res === 1) {
        if(!loseTree[index]) {
          loseTree[index] = []
        }
        loseTree[index].push(index+1)

        if(!playersPoints[index+1]) {
          playersPoints[index+1] = 0
        }
        playersPoints[index+1] += 1
        continue
      }

      if(!playersPoints[index]) {
        playersPoints[index] = 0
      }
      if(!playersPoints[index+1]) {
        playersPoints[index+1] = 0
      }
    }
  }
  // console.log("playersPoints", playersPoints)
  const score = {}
  Object.keys(playersPoints).map((index) => {
    if(!score[playersPoints[index]]) {
      score[playersPoints[index]] = []
    }
    score[playersPoints[index]].push(index)
  })

  let players = playersPoints
  Object.keys(loseTree).forEach((index) => {
    delete players[index]
  })
  let filteredWinners = Object.keys(players).map((item) => {return Number(item)})

  // console.log("playersPoints", playersPoints)
  // console.log("loseTree", loseTree)

  if(filteredWinners.length === 1) {
    return {
      "winner": filteredWinners[0]
    }
  }
  return {
    "winners": filteredWinners
  }
}
