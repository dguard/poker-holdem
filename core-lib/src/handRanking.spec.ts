import { detectHandRanking } from "@core-lib/utils/pokerAlgo";

async function sampleRoyalFlush() {
  const cards = ['tiles-k', 'tiles-q', 'tiles-j', 'tiles-t', 'tiles-a']
  const handRanking = await detectHandRanking(cards)
  console.log(handRanking)
}
async function sampleStraightFlush() {
  const cards = ['tiles-t', 'tiles-9', 'tiles-8','tiles-7', 'tiles-6']
  const handRanking = await detectHandRanking(cards)
  console.log(handRanking)
}
async function sampleFourOfKind() {
  const cards = ['clovers-q', 'tiles-q', 'hearts-q','pikes-q', 'tiles-6']
  const handRanking = await detectHandRanking(cards)
  console.log(handRanking)
}
async function sampleFullHouse() {
  const cards = ['hearts-t', 'tiles-t', 'pikes-t','clovers-9', 'tiles-9']
  const handRanking = await detectHandRanking(cards)
  console.log(handRanking)
}
async function sampleFlush() {
  const cards = ['clovers-4', 'clovers-j', 'clovers-8','clovers-2', 'clovers-9']
  const handRanking = await detectHandRanking(cards)
  console.log(handRanking)
}
async function sampleStraight() {
  const cards = ['clovers-9', 'tiles-8', 'pikes-7','tiles-6', 'hears-5']
  const handRanking = await detectHandRanking(cards)
  console.log(handRanking)
}
async function sampleThreeOfKind() {
  const cards = ['clovers-7', 'tiles-7', 'pikes-7','clovers-k', 'tiles-3']
  const handRanking = await detectHandRanking(cards)
  console.log(handRanking)
}

async function sampleTwoPairs() {
  const cards = ['clovers-4', 'pikes-4', 'clovers-3','tiles-3', 'clovers-q']
  const handRanking = await detectHandRanking(cards)
  console.log(handRanking)
}
async function samplePair() {
  const cards = ['hearts-a', 'tiles-a', 'clovers-8','pikes-4', 'hearts-7']
  const handRanking = await detectHandRanking(cards)
  console.log(handRanking)
}
async function sampleHigherCard() {
  const cards = ['tiles-3', 'clovers-j', 'clovers-8','hearts-4', 'pikes-2']
  const handRanking = await detectHandRanking(cards)
  console.log(handRanking)
}

async function main(){
  await sampleRoyalFlush()
  await sampleStraightFlush()
  await sampleFourOfKind()
  await sampleFullHouse()

  await sampleFlush()
  await sampleStraight()
  await sampleThreeOfKind()
  await sampleTwoPairs()

  await samplePair()
  await sampleHigherCard()
}

main()