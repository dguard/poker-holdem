import {
  compareFlush, compareFourOfKind, compareFullHouse,
  compareNoPairHands, comparePair, compareRoyalFlush,
  compareSameOnePair, compareStraight, compareStraightFlush,
  compareThreeOfKind,
  compareTwoPairs
} from "@core-lib/utils/pokerAlgo";

async function sampleNoPair() {
  let firstHand = ['tiles-a', 'clovers-j', 'pikes-t', 'hearts-8', 'pikes-5']
  let secondHand = ['hearts-a', 'pikes-j', 'hearts-t', 'tiles-8', 'tiles-2']

  let res = compareNoPairHands(firstHand, secondHand, 5)
  console.log("sampleNoPair", res)
}

async function samplePair() {
  let firstHand = ['tiles-k', 'clovers-k', 'clovers-t', 'hearts-7', 'pikes-5']
  let secondHand = ['hearts-t', 'pikes-t', 'hearts-9', 'tiles-4', 'tiles-2']

  let res = comparePair(firstHand, secondHand)
  console.log("samplePair", res)
}

async function sampleSameOnePair() {
  let firstHand = ['tiles-k', 'clovers-k', 'pikes-t', 'hearts-7', 'pikes-5']
  let secondHand = ['hearts-k', 'pikes-k', 'hearts-9', 'tiles-4', 'tiles-2']

  let res = compareSameOnePair(firstHand, secondHand)
  console.log("sampleSameOnePair", res)
}
async function sampleTwoPairs() {
  let firstHand = ['tiles-j', 'clovers-j', 'pikes-2', 'hearts-2', 'pikes-5']
  let secondHand = ['hearts-t', 'pikes-t', 'hearts-9', 'tiles-9', 'tiles-2']

  let res = compareTwoPairs(firstHand, secondHand)
  console.log("sampleTwoPairs", res)

  firstHand = ['tiles-7', 'clovers-7', 'pikes-3', 'hearts-3', 'pikes-a']
  secondHand = ['hearts-5', 'pikes-5', 'hearts-4', 'tiles-4', 'tiles-2']

  res = compareTwoPairs(firstHand, secondHand)
  console.log("sampleTwoPairs", res)
}
async function sampleThreeOfKind() {
  let firstHand = ['tiles-q', 'clovers-q', 'pikes-q', 'hearts-t', 'pikes-2']
  let secondHand = ['hearts-q', 'pikes-q', 'tiles-q', 'tiles-7', 'tiles-6']

  let res = compareThreeOfKind(firstHand, secondHand)
  console.log("sampleThreeOfKind", res)
}
async function sampleStraight() {
  let firstHand = ['tiles-7', 'clovers-6', 'pikes-5', 'hearts-4', 'pikes-3']
  let secondHand = ['hearts-5', 'pikes-4', 'tiles-3', 'tiles-2', 'tiles-a']

  let res = compareStraight(firstHand, secondHand)
  console.log("sampleStraight", res)
}
async function sampleFlush() {
  let firstHand = ['pikes-j', 'pikes-9', 'pikes-5', 'pikes-3', 'pikes-2']
  let secondHand = ['pikes-t', 'pikes-8', 'pikes-7', 'pikes-6', 'pikes-4']

  let res = compareFlush(firstHand, secondHand)
  console.log("sampleFlush", res)
}
async function sampleFullHouse() {
  let firstHand = ['pikes-t', 'clovers-t', 'hearts-t', 'pikes-2', 'clovers-2']
  let secondHand = ['clovers-7', 'tiles-7', 'pikes-7', 'pikes-a', 'tiles-a']

  let res = compareFullHouse(firstHand, secondHand)
  console.log("sampleFullHouse", res)

  firstHand = ['pikes-q', 'clovers-q', 'hearts-q', 'pikes-3', 'clovers-3']
  secondHand = ['clovers-q', 'tiles-q', 'pikes-q', 'pikes-2', 'tiles-2']

  res = compareFullHouse(firstHand, secondHand)
  console.log("sampleFullHouse", res)
}
async function sampleFourOfKind() {
  let firstHand = ['pikes-j', 'clovers-j', 'hearts-j', 'tiles-j', 'clovers-2']
  let secondHand = ['clovers-7', 'tiles-7', 'pikes-7', 'hearts-7', 'tiles-a']

  let res = compareFourOfKind(firstHand, secondHand)
  console.log("sampleFourOfKind", res)
}
async function sampleStraightFlush() {
  let firstHand = ['hearts-8', 'hearts-7', 'hearts-6', 'hearts-5', 'hearts-4']
  let secondHand = ['tiles-5', 'tiles-4', 'tiles-3', 'tiles-2', 'tiles-a']

  let res = compareStraightFlush(firstHand, secondHand)
  console.log("sampleStraightFlush", res)
}
async function sampleRoyalFlush() {
  let firstHand = ['hearts-a', 'hearts-k', 'hearts-q', 'hearts-j', 'hearts-t']
  let secondHand = ['tiles-a', 'tiles-k', 'tiles-q', 'tiles-j', 'tiles-t']

  let res = compareRoyalFlush(firstHand, secondHand)
  console.log("sampleRoyalFlush", res)
}


async function main(){
  await sampleNoPair()
  await samplePair()
  await sampleSameOnePair()
  await sampleTwoPairs()
  await sampleThreeOfKind()

  await sampleStraight()
  await sampleFlush()
  await sampleFullHouse()
  await sampleFourOfKind()
  await sampleStraightFlush()
  await sampleRoyalFlush()
}

main()