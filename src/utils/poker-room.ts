
export const animateMovingPlayerDips = async (chosenPlayerBet, player) => {
  await chosenPlayerBet.map(async (dip) => {
    const potDipElements = Array.from(document.querySelector('.potDibs').querySelector(`.${dip.dipAmount}`).querySelectorAll('img'))
    const preTopDip = Array.from(document.querySelector('.potDibs').querySelector(`.${dip.dipAmount}`).querySelectorAll('img')).slice(-2, -1)[0]
    const topDip = Array.from(document.querySelector('.potDibs').querySelector(`.${dip.dipAmount}`).querySelectorAll('img')).slice(-1)[0]
    const bottomDiff = topDip['style']['bottom'].replace('px', '') - preTopDip['style']['bottom'].replace('px', '')


    const playerBetDipsElements = Array.from(document.querySelector(`.${player}Dips`).querySelector(`.${dip.dipAmount}`).querySelectorAll('img')).slice(-dip.count)
    await [Promise.resolve()].concat(playerBetDipsElements).reduce(async (prev, dipElement, index) => {
      await prev
      await new Promise((resolve) => {
        var bodyRect = document.body.getBoundingClientRect(),
          elemRect = topDip.getBoundingClientRect(),
          offsetTop   = elemRect.top - bodyRect.top,
          offsetLeft   = elemRect.left - bodyRect.left,
          playerDipRect = dipElement.getBoundingClientRect(),
          playerDipOffsetTop   = playerDipRect.top - bodyRect.top,
          playerDipOffsetLeft   = playerDipRect.left - bodyRect.left;

        const newDipElement = dipElement.cloneNode(true)
        newDipElement['style']['z-index'] = 100
        newDipElement['style']['top'] = `${playerDipOffsetTop}px`
        newDipElement['style']['left'] = `${playerDipOffsetLeft}px`

        document.querySelector('.topLayer').appendChild(newDipElement)
        dipElement.style['visibility'] = 'hidden'

        setTimeout(() => {
          resolve()
        }, 0)
      })
      await new Promise((resolve) => {
        const newDipElement = Array.from(document.querySelector('.topLayer').querySelectorAll('img')).slice(-1)[0]
        var bodyRect = document.body.getBoundingClientRect(),
          elemRect = topDip.getBoundingClientRect(),
          offsetTop   = elemRect.top - bodyRect.top,
          offsetLeft   = elemRect.left - bodyRect.left,
          playerDipRect = dipElement.getBoundingClientRect(),
          playerDipOffsetTop   = playerDipRect.top - bodyRect.top,
          playerDipOffsetLeft   = playerDipRect.left - bodyRect.left;

        var translateYValue = offsetTop - playerDipOffsetTop - index*bottomDiff
        var translateXValue = offsetLeft - playerDipOffsetLeft
        newDipElement.style['transition'] = `2s all`
        newDipElement.style['z-index'] = 52+ potDipElements.length+index
        newDipElement.style['transform'] = `translateY(${translateYValue}px) translateX(${translateXValue}px)`

        setTimeout(() => {
          resolve()
        }, 100)
      })
    })
  })
}

export const calculateCardToFlop = async(cardPos) => {
  const element = document.querySelector(`.board-center`).querySelector(`.straight-card:nth-child(${cardPos})`)
  const deckCard = Array.from(document.querySelector('.dealer-deck').querySelectorAll('.deck-card')).slice(-`${cardPos}`)[0]

  var bodyRect = document.body.getBoundingClientRect(),
      elemRect = element.getBoundingClientRect(),
      offsetTop   = elemRect.top - bodyRect.top,
      offsetLeft   = elemRect.left - bodyRect.left,
      deckRect = deckCard.getBoundingClientRect(),
      deckOffsetTop   = deckRect.top - bodyRect.top,
      deckOffsetLeft   = deckRect.left - bodyRect.left;

  return {
    translateYValue: offsetTop - deckOffsetTop,
    translateXValue: offsetLeft - deckOffsetLeft,
  }
}

export const passCardToFlop = async function(cardPos, translates) {
  return new Promise((resolve) => {
    let translateYValue = translates["translateYValue"]
    let translateXValue = translates["translateXValue"]

    const deckCard = Array.from(document.querySelector('.dealer-deck').querySelectorAll('.deck-card')).slice(-cardPos)[0]

    deckCard.style['z-index'] = cardPos+1
    deckCard.style['transition'] = `2s all`

    deckCard.style['transform'] = `translateY(${translateYValue}px) translateX(${translateXValue}px) rotate(0deg)`

    deckCard.removeAttribute('src')
    // console.log(deckCard.style)

    setTimeout(() => {
//         deckCard.style['z-index'] = 0
        resolve()
    }, 250)
  })
}


export const getChangedPotDips = async (potDips, selectedPlayer, chosenPlayerBet) => {
  const newPotDipsPlayerDict = {}
  potDips[selectedPlayer] && JSON.parse(JSON.stringify(potDips)).filter((potDip) => {
    return potDip.player === selectedPlayer
  })[0].dips.forEach((potDip) => {
    newPotDipsPlayerDict[potDip.dipAmount] = potDip
  })
  const localChosenPlayerBet = JSON.parse(JSON.stringify(chosenPlayerBet))

  localChosenPlayerBet.forEach((playerBet) => {
    if(newPotDipsPlayerDict[playerBet.dipAmount]) {
      newPotDipsPlayerDict[playerBet.dipAmount].count += playerBet.count
    } else {
      newPotDipsPlayerDict[playerBet.dipAmount] = JSON.parse(JSON.stringify(playerBet))
    }
  })
  let newPotDips = JSON.parse(JSON.stringify(potDips))
  newPotDips[0].dips = potDips[0].dips.map((dip) => {
    if(newPotDipsPlayerDict[dip.dipAmount]) {
      return {
        dipAmount: dip.dipAmount,
        count: dip.count + newPotDipsPlayerDict[dip.dipAmount].count
      }
    }
    return JSON.parse(JSON.stringify(dip))
  })
  return newPotDips
}

export const getChangedPlayerDips = async (playersDips, selectedPlayer, chosenPlayerBet) => {
  const newPlayersDips = JSON.parse(JSON.stringify(playersDips))
  const chosenPlayerBetDict = {}
  const localChosenPlayerBet = JSON.parse(JSON.stringify(chosenPlayerBet))
  localChosenPlayerBet.forEach((playerBet) => {
    chosenPlayerBetDict[playerBet.dipAmount] = playerBet
  })
  const newPlayerDips = JSON.parse(JSON.stringify(playersDips)).filter((playerDip) => {
    return playerDip.player === selectedPlayer
  } )[0].dips.map((dip) => {
    if(chosenPlayerBetDict[dip.dipAmount]) {
      return {
        dipAmount: dip.dipAmount,
        count: dip.count - chosenPlayerBetDict[dip.dipAmount].count
      }
    }
    return dip
  })
  let playerIndex
  playersDips.forEach((playerDip, index) => {
    if(playerDip.player === selectedPlayer) {
      playerIndex = index
    }
  })
  newPlayersDips[playerIndex].dips = newPlayerDips

  return newPlayersDips
}
