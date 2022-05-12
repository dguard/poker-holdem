
const suitCards =['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a']
const listSuit = ['hearts', 'tiles', 'clovers', 'pikes']

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min + 1)) + min
}

class CardService {

  async generateCards() {
    const availableCardsIndexes = Array.from(Array(52)).map((_, index) => index)
    const newCardsIndexes = []

    while(newCardsIndexes.length < 52) {
      const newIndex = availableCardsIndexes.splice(getRandomInt(0, availableCardsIndexes.length-1), 1)
      newCardsIndexes.push(newIndex)
    }
    return newCardsIndexes.map((index) => {
      const suit = Math.trunc(index / suitCards.length)
      const card = index - suit * suitCards.length

      return `${listSuit[suit]}-${suitCards[card]}`
    })
  }
}

export const cardService = new CardService()