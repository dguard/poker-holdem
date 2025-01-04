import React, { ReactElement, useEffect, useState } from "react";
import LayoutUser from "components/LayoutUser";
import styled from 'styled-components';
import {
  animateMovingPlayerDips,
  getChangedPlayerDips,
  getChangedPotDips, passCardToFlop,
  calculateCardToFlop
} from "../../utils/poker-room";
import { Simulate } from "react-dom/test-utils";
import { SmallBet } from "../../components/blocks/SmallBet";
import { ArrayValue } from "../../utils/ArrayValue";

const RoomContainer = styled.div``

const TableBorder = styled.div``
const Table = styled.div``

const CardOpened = styled.img`
 /* line 102, index.sass */
  &.deck-card.tA {
   background-position: -2px -96px;
 }

 /* line 102, index.sass */
  &.deck-card.t2 {
   background-position: -102px -96px;
 }

 /* line 102, index.sass */
  &.deck-card.t3 {
    background-position: -130px -96px;
 }

 /* line 102, index.sass */
  &.deck-card.t4 {
    background-position: -194px -96px;
 }

 /* line 102, index.sass */
  &.deck-card.t5 {
    background-position: -258px -96px;
 }

 /* line 102, index.sass */
  &.deck-card.t6 {
    background-position: -322px -96px;
 }

 /* line 102, index.sass */
  &.deck-card.t7 {
    background-position: -386px -96px;
 }

 /* line 102, index.sass */
  &.deck-card.t8 {
    background-position: -450px -96px;
 }

 /* line 102, index.sass */
  &.deck-card.t9 {
    background-position: -514px -96px;
 }

 /* line 102, index.sass */
  &.deck-card.tT {
    background-position: -578px -96px;
 }

 /* line 102, index.sass */
  &.deck-card.tJ {
    background-position: -642px -96px;
 }

 /* line 102, index.sass */
  &.deck-card.tQ {
    background-position: -706px -96px;
 }

 /* line 102, index.sass */
  &.deck-card.tK {
    background-position: -770px -96px;
 }

 /* line 106, index.sass */ 
  &.deck-card.pA {
   background-position: 0px -284px;
 }

 /* line 106, index.sass */
 &.deck-card.p2 {
   background-position: -66px -284px;
 }

 /* line 106, index.sass */
 &.deck-card.p3 {
   background-position: -130px -284px;
 }

 /* line 106, index.sass */
 &.deck-card.p4 {
   background-position: -194px -284px;
 }

 /* line 106, index.sass */
 &.deck-card.p5 {
   background-position: -258px -284px;
 }

 /* line 106, index.sass */
 &.deck-card.p6 {
   background-position: -322px -284px;
 }

 /* line 106, index.sass */
 &.deck-card.p7 {
   background-position: -386px -284px;
 }

 /* line 106, index.sass */
 &.deck-card.p8 {
   background-position: -450px -284px;
 }

 /* line 106, index.sass */
 &.deck-card.p9 {
   background-position: -514px -284px;
 }

 /* line 106, index.sass */
  &.deck-card.pT {
    background-position: -578px -284px;
 }

 /* line 106, index.sass */
  &.deck-card.pJ {
    background-position: -642px -284px;
 }

 /* line 106, index.sass */
  &.deck-card.pQ {
    background-position: -706px -284px;
 }

 /* line 106, index.sass */
  &.deck-card.pK {
    background-position: -770px -284px;
 }

 /* line 110, index.sass */
  &.deck-card.hA {
   background-position: 0px -190px;
 }

 /* line 110, index.sass */
  &.deck-card.h2 {
    background-position: -66px -190px;
 }

 /* line 110, index.sass */
  &.deck-card.h3 {
    background-position: -130px -190px;
 }

 /* line 110, index.sass */
  &.deck-card.h4 {
    background-position: -194px -190px;
 }

 /* line 110, index.sass */
 &.deck-card.h5 {
   background-position: -258px -190px;
 }

 /* line 110, index.sass */
 &.deck-card.h6 {
   background-position: -322px -190px;
 }

 /* line 110, index.sass */
 &.deck-card.h7 {
   background-position: -386px -190px;
 }

 /* line 110, index.sass */
 &.deck-card.h8 {
   background-position: -450px -190px;
 }

 /* line 110, index.sass */
 &.deck-card.h9 {
   background-position: -514px -190px;
 }

 /* line 110, index.sass */
 &.deck-card.hT {
   background-position: -578px -190px;
 }

 /* line 110, index.sass */
 &.deck-card.hJ {
   background-position: -642px -190px;
 }

 /* line 110, index.sass */
  &.deck-card.hQ {
    background-position: -706px -190px;
 }

 /* line 110, index.sass */
  &.deck-card.hK {
    background-position: -770px -190px;
 }

 /* line 114, index.sass */ 
 &.deck-card.cA {
   background-position: -2px -2px;
 }

 /* line 114, index.sass */
 &.deck-card.c2 {
   background-position: -66px -2px;
 }

 /* line 114, index.sass */
 &.deck-card.c3 {
   background-position: -130px -2px;
 }

 /* line 114, index.sass */
  &.deck-card.c4 {
    background-position: -194px -2px;
 }

 /* line 114, index.sass */
  &.deck-card.c5 {
    background-position: -258px -2px;
 }

 /* line 114, index.sass */
  &.deck-card.c6 {
    background-position: -322px -2px;
 }

 /* line 114, index.sass */
  &.deck-card.c7 {
    background-position: -386px -2px;
 }

 /* line 114, index.sass */
  &.deck-card.c8 {
    background-position: -450px -2px;
 }

 /* line 114, index.sass */
  &.deck-card.c9 {
    background-position: -514px -2px;
 }

 /* line 114, index.sass */
  &.deck-card.cT {
    background-position: -578px -2px;
 }

 /* line 114, index.sass */
  &.deck-card.cJ {
    background-position: -642px -2px;
 }

 /* line 114, index.sass */
  &.deck-card.cQ {
    background-position: -706px -2px;
 }

 /* line 114, index.sass */
  &.deck-card.cK {
    background-position: -770px -2px;
 }
 `
// const CardOpened = (className) => {
//   const newStyle = Object.assign({
//     backgroundImage: `url("public/cards.png")`
//   })
//
//   return <div className={'card card-clovers-13'} width={60} height={90} />
// }

const CardShirt = ({style, className}: {style?: object, className?: string}) => {
  const newStyle = Object.assign({
    borderRadius: 14,
    border: '2px solid #fff',
    backgroundImage: 'url("public/cards.png")',
    // backgroundPosition: '-2px -2px',
    border: '1px solid #fff',
    borderRadius: '5px'

  }, style ?? style)

  return <CardOpened className={`${className}`} width={60} height={90} style={newStyle} src={'public/cardShirt.png'} />
}
let counter = 1

const Dib25Cent = ({style}: {style?: object}) => {
  const newStyle = Object.assign({
    height: 50, width: 50, borderRadius: 50
  }, style ?? style)
  return <img src={'public/dib25Cent.png'} style={newStyle} />
}
const Dib50Cent = ({style}: {style?: object}) => {
  const newStyle = Object.assign({
    height: 50, width: 50, borderRadius: 50
  }, style ?? style)
  return <img src={'public/dib50Cent.png'} style={newStyle} />
}
const Dib1Dollar = ({style}: {style?: object}) => {
  const newStyle = Object.assign({
    height: 50, width: 50, borderRadius: 50
  }, style ?? style)
  return <img src={'public/dib1Dollar.png'} style={newStyle} />
}
const Dib5Dollars = ({style}: {style?: object}) => {
  const newStyle = Object.assign({
    height: 50, width: 50, borderRadius: 50
  }, style ?? style)
  return <img src={'public/dib5Dollars.png'} style={newStyle} />
}
const Dib10Dollars = ({style}: {style?: object}) => {
  const newStyle = Object.assign({
    height: 50, width: 50, borderRadius: 50
  }, style ?? style)
  return <img src={'public/dib10Dollars.png'} style={newStyle} />
}
const Dib25Dollars = ({style}: {style?: object}) => {
  const newStyle = Object.assign({
    height: 50, width: 50, borderRadius: 50
  }, style ?? style)
  return <img src={'public/dib25Dollars.png'} style={newStyle} />
}
const Dib50Dollars = ({style}: {style?: object}) => {
  const newStyle = Object.assign({
    height: 50, width: 50, borderRadius: 50
  }, style ?? style)
  return <img src={'public/dib50Dollars.png'} style={newStyle} />
}
const Dib100Dollars = ({style}: {style?: object}) => {
  const newStyle = Object.assign({
    height: 50, width: 50, borderRadius: 50
  }, style ?? style)
  return <img src={'public/dib100Dollars.png'} style={newStyle} />
}
const Dib500Dollars = ({style}: {style?: object}) => {
  const newStyle = Object.assign({
    height: 50, width: 50, borderRadius: 50
  }, style ?? style)
  return <img src={'public/dib500Dollars.png'} style={newStyle} />
}
const Dib1000Dollars = ({style}: {style?: object}) => {
  const newStyle = Object.assign({
    height: 50, width: 50, borderRadius: 50
  }, style ?? style)
  return <img src={'public/dib1000Dollars.png'} style={newStyle} />
}
const Dib5000Dollars = ({style}: {style?: object}) => {
  const newStyle = Object.assign({
    height: 50, width: 50, borderRadius: 50
  }, style ?? style)
  return <img src={'public/dib5000Dollars.png'} style={newStyle} />
}
const Dib10000Dollars = ({style}: {style?: object}) => {
  const newStyle = Object.assign({
    height: 50, width: 50, borderRadius: 50
  }, style ?? style)
  return <img src={'public/dib10000Dollars.png'} style={newStyle} />
}

const DibGroup = ({dib, count, rotate, style, className}: {dib: ReactElement, count: number, rotate?: string, style?: object, className?: string}) => {
  const newStyle = Object.assign({position: 'relative', width: 50, height: 50, display:' inline-block'}, style ?? style)
  return <div className={className} style={newStyle}>
    {Array.from(Array(count)).map((_, index) => {
      switch(dib) {
        case Dib50Dollars:
          if (rotate === '-180deg') {
            return <Dib50Dollars key={index} style={{position: 'absolute', top: 0 + index * 4}}/>
          }
          return <Dib50Dollars key={index} style={{position: 'absolute', bottom: 0 + index * 4}}/>
          break
            case Dib100Dollars:
              if (rotate === '-180deg') {
                return <Dib100Dollars key={index} style={{position: 'absolute', top: 0 + index * 4}}/>
              }
              return <Dib100Dollars key={index} style={{position: 'absolute', bottom: 0 + index * 4}}/>
              break
            case Dib5000Dollars:
              if (rotate === '-180deg') {
                return <Dib5000Dollars key={index} style={{position: 'absolute', top: 0 + index * 4}}/>
              }
              return <Dib5000Dollars key={index} style={{position: 'absolute', bottom: 0 + index * 4}}/>
              break
            case Dib10000Dollars:
              if (rotate === '-180deg') {
                return <Dib10000Dollars key={index} style={{position: 'absolute', top: 0 + index * 4}}/>
              }
              return <Dib10000Dollars key={index} style={{position: 'absolute', bottom: 0 + index * 4}}/>
              break
      }
    })}
  </div>
}

const PlayerLeftTopDiagonalCards = () => {
  return (
    <div className='player-left-top' style={{position: 'absolute', top: 160, display: 'flex', left: 140, transform: 'rotate(135deg)'}}>
      <div style={{position: 'relative'}}>
        <CardShirt className='rotated-card' style={{visibility: 'hidden', transformOrigin: 'left bottom',  position: 'absolute', left: 0, transform: 'rotate(-14deg)'}}  />
        <CardShirt style={{visibility: 'hidden'}} />
        <CardShirt className='straight-card' style={{visibility: 'hidden', position: 'absolute', bottom: 5, left: 0, right: 0}} />
      </div>
    </div>
  )
}

const PlayerRightTopDiagonalCards = () => {
  return (<div style={{ position: 'absolute', top: 160, display: 'flex', right: 140, transform: 'rotate(-135deg)' }}>
    <div className='player-right-top' style={{ position: 'relative' }}>
      <CardShirt
        className='rotated-card'
        style={{visibility: 'hidden', transformOrigin: 'left bottom', position: 'absolute', left: 0, transform: 'rotate(-14deg)' }} />
      <CardShirt style={{visibility: 'hidden'}} />
      <CardShirt className='straight-card' style={{visibility: 'hidden', position: 'absolute', bottom: 5, left: 0, right: 0 }} />
    </div>
  </div>
  )
}
const PlayerLeftBottomCards = () => {
  return (<div style={{ position: 'absolute', bottom: 150, display: 'flex', left: 140, transform: 'rotate(45deg)' }}>
    <div className='player-left-bottom' style={{ position: 'relative' }}>
      <CardShirt className='rotated-card'
        style={{visibility: 'hidden', transformOrigin: 'left bottom', position: 'absolute', left: 0, transform: 'rotate(-14deg)' }} />
      <CardShirt style={{visibility: 'hidden'}} />
      <CardShirt className='straight-card' style={{visibility: 'hidden', position: 'absolute', bottom: 5, left: 0, right: 0 }} />
    </div>
  </div>)
}
const PlayerRightBottomCards = () => {
  return (<div style={{position: 'absolute', bottom: 150, display: 'flex', right: 140, transform: 'rotate(-45deg)'}}>
    <div className='player-right-bottom' style={{position: 'relative'}}>
      <CardShirt className='rotated-card' style={{visibility: 'hidden', transformOrigin: 'left bottom',  position: 'absolute', left: 0, transform: 'rotate(-14deg)'}}  />
      <CardShirt style={{visibility: 'hidden'}} />
      <CardShirt className='straight-card' style={{visibility: 'hidden',position: 'absolute', bottom: 5, left: 0, right: 0}} />
    </div>
  </div>)
}

const PlayerTopRightCards = () => {
  return (<div className='player-top-right' style={{position: 'relative'}}>
    <CardShirt className='rotated-card' style={{visibility: 'hidden', transformOrigin: 'left bottom',  position: 'absolute', left: 0, transform: 'rotate(-14deg)'}}  />
    <CardShirt style={{visibility: 'hidden'}} />
    <CardShirt className='straight-card' style={{visibility: 'hidden',position: 'absolute', bottom: 5, left: 0, right: 0}} />
  </div>)
}

const PlayerTopCenterCards = () => {
  return (
    <div className='player-top-center' style={{position: 'relative'}}>
      <CardShirt className='rotated-card' style={{visibility: 'hidden', transformOrigin: 'left bottom',  position: 'absolute', left: 0, transform: 'rotate(-14deg)'}}  />
      <CardShirt style={{visibility: 'hidden'}} />
      <CardShirt className='straight-card' style={{visibility: 'hidden',position: 'absolute', bottom: 5, left: 0, right: 0}} />
    </div>
  )
}
const PlayerTopLeftCards = () => {
  return (
    <div className='player-top-left' style={{position: 'relative'}}>
      <CardShirt className='rotated-card' style={{visibility: 'hidden', transformOrigin: 'left bottom',  position: 'absolute', left: 0, transform: 'rotate(-14deg)'}}  />
      <CardShirt style={{visibility: 'hidden'}} />
      <CardShirt className='straight-card' style={{visibility: 'hidden', position: 'absolute', bottom: 5, left: 0, right: 0}} />
    </div>
  )
}

const PlayerBottomLeftCards = () => {
  return (
    <div className='player-bottom-left' style={{position: 'relative'}}>
      <CardShirt className={'rotated-card'} style={{visibility: 'hidden', transformOrigin: 'left bottom',  position: 'absolute', left: 0, transform: 'rotate(-14deg)'}}  />
      <CardShirt style={{visibility: 'hidden'}} />
      <CardShirt className='straight-card' style={{visibility: 'hidden', position: 'absolute', bottom: 5, left: 0, right: 0}} />
    </div>
  )
}

const PlayerBottomCenterCards = () => {
  return (
    <div className='player-bottom-center' style={{position: 'relative', marginLeft: 0}}>
      <CardShirt className='rotated-card' style={{visibility: 'hidden', transformOrigin: 'left bottom',  position: 'absolute', left: 0, transform: 'rotate(-14deg)'}}  />
      <CardShirt style={{visibility: 'hidden'}} />
      <CardShirt className='straight-card' style={{visibility: 'hidden', position: 'absolute', bottom: 5, left: 0, right: 0}} />
    </div>
  )
}

const PlayerBottomRightCards = ({cards}) => {
console.log(cards)
 return (
   <div className={'dealer-deck'} style={{position: 'relative'}}>
      {/*<CardShirt style={{transformOrigin: 'left bottom',  position: 'absolute', left: 0, transform: 'rotate(-14deg)'}}  />*/}
      {/*<CardShirt />*/}
     {Array.from(Array(cards.length)).map((_, index) => {
       return <CardShirt key={index} className={`deck-card ${cards[index]}`} style={{ position: 'absolute', bottom: index === 0 ? -117 : -115 + index * 0.4, left: 0, right: 0}} />
     })}
   </div>
 )
}

const DIP_AMOUNT_25_CENTS = 'Dip25Cents'
const DIP_AMOUNT_50_CENTS = 'Dip50Cents'
const DIP_AMOUNT_1_DOLLAR = 'Dip1Dollar'
const DIP_AMOUNT_5_DOLLARS = 'Dip5Dollars'
const DIP_AMOUNT_10_DOLLARS = 'Dip10Dollars'
const DIP_AMOUNT_25_DOLLARS = 'Dip25Dollars'
const DIP_AMOUNT_50_DOLLARS = 'Dip50Dollars'
const DIP_AMOUNT_100_DOLLARS = 'Dip100Dollars'
const DIP_AMOUNT_500_DOLLARS = 'Dip500Dollars'
const DIP_AMOUNT_1000_DOLLARS = 'Dip1000Dollars'
const DIP_AMOUNT_5000_DOLLARS = 'Dip5000Dollars'
const DIP_AMOUNT_10000_DOLLARS = 'Dip10000Dollars'

const DIP_AMOUNTS = [DIP_AMOUNT_25_CENTS, DIP_AMOUNT_50_CENTS, DIP_AMOUNT_1_DOLLAR, DIP_AMOUNT_5_DOLLARS,
  DIP_AMOUNT_10_DOLLARS, DIP_AMOUNT_25_DOLLARS, DIP_AMOUNT_50_DOLLARS, DIP_AMOUNT_100_DOLLARS, DIP_AMOUNT_500_DOLLARS,
  DIP_AMOUNT_1000_DOLLARS, DIP_AMOUNT_5000_DOLLARS, DIP_AMOUNT_10000_DOLLARS]

const DIP_TEXTS_INTERNAL = ['25c', '50c', '$1', '$5', '$10', '$25', '$50', '$100', '$500', '$1000', '$5000', '$10000']
export const DIP_TEXTS = DIP_AMOUNTS.map((item, index) => {
  return {
    dipAmount: item,
    text: DIP_TEXTS_INTERNAL[index]
  }
})
const DIP_NUMBERS_INTERNAL = ['$0.25', '$0.5', '$1', '$5', '$10', '$25', '$50', '$100', '$500', '$1000', '$5000', '$10000']
export const DIP_NUMBERS = DIP_AMOUNTS.map((item, index) => {
  return {
    dipAmount: item,
    number: DIP_NUMBERS_INTERNAL[index]
  }
})

const PlayerDibs = ({style, rotate, className, dips}: {style?: object, rotate?: string, className?: string, dips: object}) => {
  const newStyle = Object.assign({
    width: 240, display: 'flex', flexDirection: 'row', justifyContent: 'center',
  }, style ?? style)

  return (<div className='dipsWorkspace' style={newStyle}>
    <div className={className} style={{position: 'relative'}}>
      {dips.map((dip, index) => {
        if(dip.dipAmount === DIP_AMOUNT_50_DOLLARS) {
          return <DibGroup key={index} className={DIP_AMOUNT_50_DOLLARS} rotate={rotate} dib={Dib50Dollars} count={dip.count} style={{zIndex: rotate === '-180deg' ? DIP_AMOUNTS.length-index : 0}} />
        }
        if(dip.dipAmount === DIP_AMOUNT_100_DOLLARS) {
          return <DibGroup key={index} className={DIP_AMOUNT_100_DOLLARS} rotate={rotate} dib={Dib100Dollars} count={dip.count} style={{zIndex: rotate === '-180deg' ? DIP_AMOUNTS.length-index : 0}} />
        }
        if(dip.dipAmount === DIP_AMOUNT_5000_DOLLARS) {
          return <DibGroup key={index} className={DIP_AMOUNT_5000_DOLLARS} rotate={rotate} dib={Dib5000Dollars} count={dip.count} style={{zIndex: rotate === '-180deg' ? DIP_AMOUNTS.length-index : 0}} />
        }
        if(dip.dipAmount === DIP_AMOUNT_10000_DOLLARS) {
          return <DibGroup key={index} className={DIP_AMOUNT_10000_DOLLARS} rotate={rotate} dib={Dib10000Dollars} count={dip.count} style={{zIndex: rotate === '-180deg' ? DIP_AMOUNTS.length-index : 0}} />
        }
      })}
    </div>

    <div style={{position: 'relative'}}>
    </div>

    <div style={{position: 'relative'}}>
    </div>
  </div>)
}

const ROUND_PREFLOP = 'pre-flop'
const ROUND_FLOP = 'flop'
const ROUND_TURN = 'turn'
const ROUND_RIVER = 'river'

const PLAY_SMALL_BLIND = 'play_small_blind'
const PLAY_BIG_BLIND = 'play_big_blind'

const PLAYER_ALLADIN = 'alladin'
const PLAYER_YAGO = 'yago'
const PLAYER_ABU = 'abu'
const PLAYER_WALLE = 'walle'
const PLAYER_JASMINE = 'jasmine'
const PLAYER_SULTAN = 'sultan'
const PLAYER_TIGER = 'tiger'
const PLAYER_EVE = 'eve'
const PLAYER_CARPET = 'carpet'
const PLAYER_JINNY = 'jinny'

const ROUND_STAGE_DEALER = 'stage_dealer'
const ROUND_STAGE_PLAYERS = 'stage_players'
const ROuND_STAGE_COMPLETE = 'complete'
const round_stages = ['dealer', 'players', 'complete']

const PLAYERS_CIRCLE = {
  [PLAYER_ALLADIN]: PLAYER_YAGO,
  [PLAYER_YAGO]: PLAYER_ABU,
  [PLAYER_ABU]: PLAYER_WALLE,
  [PLAYER_WALLE]: PLAYER_JASMINE,
  [PLAYER_JASMINE]: PLAYER_SULTAN,
  [PLAYER_SULTAN]: PLAYER_TIGER,
  [PLAYER_TIGER]: PLAYER_EVE,
  [PLAYER_EVE]: PLAYER_CARPET,
  [PLAYER_CARPET]: PLAYER_JINNY,
  [PLAYER_JINNY]: PLAYER_ALLADIN
}

// h – черви, d – бубны, c – трефы, s – пики.
const lears =['h','t','c','p']
const lear_pack = ['A','K','Q','J','T',9,8,7,6,5,4,3,2]

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min+1)) + min
}

const createDeck = () => {
  const newDeckInitial = []
  lears.map((lear) => {
    lear_pack.map((card) => {
      newDeckInitial.push([lear, card].join(''))
    })
  })
  const newDeck = []
  while(newDeckInitial.length) {
    const selectedIndex = getRandomNumber(0, newDeckInitial.length-1)
    newDeck.push(newDeckInitial.splice(selectedIndex, 1)[0])
  }

  return newDeck
}
const POT_DIPS = 'pot_dips'

export function PokerRoom(){
  const [selectedPlayer, setSelectedPlayerInternal] = useState()
  const [selectedRound, setSelectedRound] = useState(ROUND_PREFLOP)
  const [selectedStage, setSelectedStage] = useState(ROUND_STAGE_DEALER)
  const [playerPlayed, setPlayerPlayed] = useState({})

  useEffect(() => {
    if(!selectedPlayer) {
      setSelectedPlayer(PLAYER_JINNY)
    }
  })

  const setSelectedPlayer = async(player) => {
    if(selectedPlayer) {
      document.querySelector(`.${selectedPlayer}player`).style['transition'] = '0.5s all'
      document.querySelector(`.${selectedPlayer}player`).style['transform'] = 'scale(0.9)'
      document.querySelector(`.${selectedPlayer}player`).style['border-width'] = '1px'
    }
    if(typeof playerPlayed[player] === "undefined") {
      playerPlayed[player] = 1
    } else {
      playerPlayed[player] += 1
    }
    setPlayerPlayed(playerPlayed)
    console.log({playerPlayed})

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 500)
    })

    document.querySelector(`.${player}player`).style['transition'] = '0.5s all'
    document.querySelector(`.${player}player`).style['transform'] = 'scale(1.2)'
    document.querySelector(`.${player}player`).style['border-width'] = '5px'

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 500)
    })
    setSelectedPlayerInternal(player)


    if(playerPlayed[PLAYER_JINNY] === 2) {
      alert("flop started")
    }
  }

  const [deck, setDeck] = useState(createDeck())
  const [passCompleted, setPassCompleted] = useState(false)
  const [deckCardPositions, setDeckCardPositions] = useState([])
  const [smallBlindBetAllowed, setsmallBlindBetAllowed] = useState(true)
  const [callAllowed, setCallAllowed] = useState(false)
  const [raiseAllowed, setRaiseAllowed] = useState(false)
  const [maxBet, setMaxBet] = useState(-Number.MAX_VALUE)

  let showAnimateMovingPlayerDips = 'show-animate-from-original'

  const defaultPlayerDips = [{
    dipAmount: DIP_AMOUNT_50_DOLLARS,
    count: 5
  }, {
    dipAmount: DIP_AMOUNT_100_DOLLARS,
    count: 10
  }, {
    dipAmount: DIP_AMOUNT_5000_DOLLARS,
    count: 10
  }, {
    dipAmount: DIP_AMOUNT_10000_DOLLARS,
    count: 1
  }]

  const defaultPotDips = [{
    dipAmount: DIP_AMOUNT_50_DOLLARS,
    count: 2
  }, {
    dipAmount: DIP_AMOUNT_100_DOLLARS,
    count: 2
  }, {
    dipAmount: DIP_AMOUNT_5000_DOLLARS,
    count: 2
  }, {
    dipAmount: DIP_AMOUNT_10000_DOLLARS,
    count: 2
  }]

  const [potDipsPositions, setPotDipsPositions] = useState([])
  const [potDips, setPotDips] = useState([
    {
      player: POT_DIPS,
      dips: defaultPotDips
    }
  ])
  const [playersDips, setPlayersDips] = useState([
    {
      player: PLAYER_ALLADIN,
      dips: defaultPlayerDips
    },
    {
      player: PLAYER_YAGO,
      dips: defaultPlayerDips
    },
    {
      player: PLAYER_ABU,
      dips: defaultPlayerDips
    },
    {
      player: PLAYER_WALLE,
      dips: defaultPlayerDips
    },
    {
      player: PLAYER_JASMINE,
      dips: defaultPlayerDips
    },
    {
      player: PLAYER_SULTAN,
      dips: defaultPlayerDips
    },
    {
      player: PLAYER_TIGER,
      dips: defaultPlayerDips
    },
    {
      player: PLAYER_EVE,
      dips: defaultPlayerDips
    },
    {
      player: PLAYER_CARPET,
      dips: defaultPlayerDips
    }
  ])
  const [chosenPlayerBetValue] = useState(new ArrayValue([]))
  // const [chosenPlayersBets, setChosenPlayersBets] = useState([])

  const passes = ['passToBottomCenterPlayer', 'passToBottomLeftPlayer', 'passToLeftBottomPlayer',
    'passToLeftTopPlayer', 'passToTopLeftPlayer', 'passToTopCenterPlayer', 'passToTopRightPlayer', 'passToRightTopPlayer', 'passToRightBottomPlayer']

  const playersPositions = ['player-bottom-center', 'player-bottom-left', 'player-left-bottom', 'player-left-top',
    'player-top-left', 'player-top-center', 'player-top-right', 'player-right-top', 'player-right-bottom']
  const rotate = ['-14deg', '-14deg', `${45-14}deg`, `${135-14}deg`, '-14deg', '-14deg', '-14deg', `${-135-14}deg`, `${-45-14}deg`]
  const rotateStraight = ['0deg', '0deg', `${45}deg`, `${135}deg`, '0deg', '0deg', '0deg', `${-135}deg`, `${-45}deg`]


  const calculateCard = async(positionIndex, cardIndex, cardType) => {
    const element = document.querySelector(`.${playersPositions[positionIndex]}`).querySelector(cardType === 'rotated' ? '.rotated-card' : '.straight-card')
    const deckCard = Array.from(document.querySelector('.dealer-deck').querySelectorAll('.deck-card')).slice(-cardIndex)[0]

    var bodyRect = document.body.getBoundingClientRect(),
        elemRect = element.getBoundingClientRect(),
        offsetTop = elemRect.top - bodyRect.top,
        offsetLeft = elemRect.left - bodyRect.left,
        deckRect = deckCard.getBoundingClientRect(),
        deckOffsetTop = deckRect.top - bodyRect.top,
        deckOffsetLeft = deckRect.left - bodyRect.left;

    if (cardType === 'rotated') {
      return {
        positionIndex,
        cardIndex,
        translateYValue: offsetTop - deckOffsetTop,
        translateXValue: offsetLeft - deckOffsetLeft,
        rotateValue: rotate[positionIndex],
        bottomValue: deckCard.style['bottom']
      }
    } else {
      return {
        positionIndex,
        cardIndex,
        translateYValue: offsetTop - deckOffsetTop,
        translateXValue: offsetLeft - deckOffsetLeft,
        rotateValue: rotateStraight[positionIndex],
        bottomValue: deckCard.style['bottom']
      }
    }
  }

  const passCard = async(positionIndex, cardIndex, cardType, translateYValue, translateXValue, rotateValue) => {
    return new Promise((resolve) => {
      const deckCard = Array.from(document.querySelector('.dealer-deck').querySelectorAll('.deck-card')).slice(-cardIndex)[0]

      deckCard.style['z-index'] = cardIndex+1
      deckCard.style['transition'] = `2s all`
      if(cardType === 'rotated') {
        deckCard.style['transform'] = `translateY(${translateYValue}px) translateX(${translateXValue}px) rotate(${rotateValue})`
      } else {
        deckCard.style['transform'] = `translateY(${translateYValue}px) translateX(${translateXValue}px) rotate(${rotateValue})`
      }
      // console.log(deckCard.style)

      setTimeout(() => {
        deckCard.style['z-index'] = 0
        resolve()
      }, 250)
    })
  }

  useEffect(() => {
    // deckCard.style['transition'] = `2s all`
    const run = async () => {
      if(selectedPlayer === PLAYER_JINNY && selectedStage === ROUND_STAGE_DEALER && !passCompleted) {
        const newCardPositions = []
        await [Promise.resolve()].concat(passes.slice(0, playersPositions.length)).reduce(async (prev, curr, index) => {
          return new Promise(async (resolve) => {
            await prev
            const {positionIndex, cardIndex, translateYValue, translateXValue, rotateValue, bottomValue} = await calculateCard(index-1, index-1, 'rotated')
            newCardPositions.push({
              cardValue: deck[cardIndex],
              positionIndex,
              cardIndex,
              translateYValue,
              translateXValue,
              rotateValue,
              bottomValue
            })
            await passCard(index-1, index-1, 'rotated', translateYValue, translateXValue, rotateValue)
            resolve()
          })
        })
        await [Promise.resolve()].concat(passes.slice(0, playersPositions.length)).reduce(async (prev, curr, index) => {
          return new Promise(async (resolve) => {
            await prev
            const {positionIndex, cardIndex, translateYValue, translateXValue, rotateValue, bottomValue} = await calculateCard(index-1, playersPositions.length + index-1, 'straight')
            newCardPositions.push({
              cardValue: deck[cardIndex],
              positionIndex,
              cardIndex,
              translateYValue,
              translateXValue,
              rotateValue,
              bottomValue
            })
            await passCard(index-1, playersPositions.length + index-1, 'straight', translateYValue, translateXValue, rotateValue)
            resolve()
          })
        })
        await new Promise((resolve) => {
          setTimeout(() => {resolve()}, 1500)
        })

        setSelectedPlayer(PLAYER_ABU)
        setSelectedStage(ROUND_STAGE_PLAYERS)
        setPassCompleted(true)
        setDeckCardPositions(newCardPositions)

        const newDeck = JSON.parse(JSON.stringify(deck.slice(0)))
        newDeck.splice(-(playersPositions.length+playersPositions.length),playersPositions.length+playersPositions.length)
        setDeck(newDeck)

        setTimeout(async function(){
          let cardPos = 1
          let translates = await calculateCardToFlop(cardPos)
          passCardToFlop(cardPos, translates)
          await new Promise((resolve) => {
            setTimeout(() => {resolve()}, 500)
          })

          /* let */ cardPos = 2
          /* let */ translates = await calculateCardToFlop(cardPos)
          passCardToFlop(cardPos, translates)
          await new Promise((resolve) => {
            setTimeout(() => {resolve()}, 500)
          })

          /* let */ cardPos = 3
          /* let */ translates = await calculateCardToFlop(cardPos)
          passCardToFlop(cardPos, translates)

          await new Promise((resolve) => {
            setTimeout(() => {resolve()}, 700)
          })
          /* TURN */
          /* let */ cardPos = 4
          /* let */ translates = await calculateCardToFlop(cardPos)
          passCardToFlop(cardPos, translates)
          await new Promise((resolve) => {
            setTimeout(() => {resolve()}, 700)
          })

          /* RIVER */
          /* let */ cardPos = 5
          /* let */ translates = await calculateCardToFlop(cardPos)
          passCardToFlop(cardPos, translates)
        }, 250)
      }
    }
    run()
  })

  const getSumBet = (playerBet) => {
    return [0].concat(chosenPlayerBetValue.value).reduce((prev, curr) => {
      return prev + curr.count * Number(DIP_NUMBERS.filter((item) => {return item.dipAmount === curr.dipAmount})[0].number.replace('$', ''))
    })
  }

  const handleCompleteSmallBlindBet = async (player) => {
    if('show-animate-from-original' === showAnimateMovingPlayerDips) {
      // keep
    } else {
      return false
    }
    showAnimateMovingPlayerDips = 'show-animate-moving-player-dips'
    await animateMovingPlayerDips(chosenPlayerBetValue.value, player)

    await new Promise((resolve) => {
      setTimeout(() => {
        showAnimateMovingPlayerDips = 'show-animate-from-original'
        resolve()
      }, 2000)
    })
    const newPotDips = await getChangedPotDips(potDips, player, chosenPlayerBetValue.value)
    const newPlayersDips = await getChangedPlayerDips(playersDips, player, chosenPlayerBetValue.value)

    const sumBet = getSumBet(chosenPlayerBetValue.value)
    if(sumBet > maxBet) {
      setMaxBet(sumBet)
    }

    chosenPlayerBetValue.set([])
    setPlayersDips(newPlayersDips)
    setPotDips(newPotDips)

    setSelectedPlayer(PLAYERS_CIRCLE[player])
  }
  const handleClearBet = () => {
    chosenPlayerBetValue.set([])
  }
  const handleAddToBet = async(selectedPlayer, dipAmount) => {
    const playerBetDict = {}
    JSON.parse(JSON.stringify(chosenPlayerBetValue.value)).forEach((betDip) => {
      playerBetDict[betDip.dipAmount] = betDip
    })
    if(playerBetDict[dipAmount]) {
      playerBetDict[dipAmount].count++
    } else {
      playerBetDict[dipAmount] = {
        dipAmount: dipAmount,
        count: 1
      }
    }
    const newPlayerBet = Object.keys(playerBetDict).map((key) => {
      return playerBetDict[key]
    })
    chosenPlayerBetValue.set(newPlayerBet)
  }

  const formatPotDips = () => {
    const potDipsDict = {}
    potDips.forEach((playerDips) => {
      playerDips.dips.forEach((potDip) => {
        if(potDipsDict[potDip.dipAmount]) {
          potDipsDict[potDip.dipAmount].count += potDip.count
        } else {
          potDipsDict[potDip.dipAmount] = potDip
        }
      })
    })

    return Object.keys(potDipsDict).map((key) => {
      return potDipsDict[key]
    })
  }

  const isCallAllowed = () => {
    return maxBet > 0
  }
  const isRaiseAllowed = () => {

  }
  const handleCall = async() => {
    if('show-animate-from-original' === showAnimateMovingPlayerDips) {
      // keep
    } else {
      return false
    }

    // maxBet
    const playerDips = playersDips.filter((item) => {
      return item.player === selectedPlayer
    })[0].dips
    const listBetPieces = []
    let currentBet = 0

    for(let i = playerDips.length-1; i >= 0; i--) {
      const oneDip = Number(DIP_NUMBERS.filter((item) => { return item.dipAmount === playerDips[i].dipAmount })[0].number.replace('$', ''))
      if(currentBet === maxBet) {
        break
      }
      if((currentBet + oneDip) > maxBet) {
        continue
      }
      if((currentBet + oneDip) === maxBet) {
        listBetPieces.push({
          dipAmount: playerDips[i].dipAmount,
          count: 1
        })
        currentBet += oneDip
        break
      }
      if((currentBet + oneDip * playerDips[i].count) < maxBet) {
        while(playerDips[i].count > 0) {
          listBetPieces.push({
            dipAmount: playerDips[i].dipAmount,
            count: 1
          })
          currentBet += oneDip
          playerDips[i].count--
        }
        continue
      }
      if((currentBet + oneDip * playerDips[i].count) > maxBet) {
        while((currentBet + oneDip) <= maxBet) {
          listBetPieces.push({
            dipAmount: playerDips[i].dipAmount,
            count: 1
          })
          currentBet += oneDip
        }
        continue
      }
      if((currentBet + oneDip * playerDips[i].count) === maxBet) {
        listBetPieces.push({
          dipAmount: playerDips[i].dipAmount,
          count: playerDips[i].count
        })
        currentBet += oneDip
        break
      }
    }
    await [Promise.resolve()].concat(listBetPieces).reduce(async (prev, item) => {
      await prev
      await handleAddToBet(selectedPlayer, item.dipAmount)
    })
    await handleCompleteSmallBlindBet(selectedPlayer)
  }


  return (
    <LayoutUser>
      <RoomContainer>
        <div className="topLayer"></div>

        <div style={{ width: 1400, position: 'relative', height: 858, borderRadius: 500, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TableBorder style={{ width: 1200, height: 708, background: '#333333', borderRadius: 500, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Table style={{ width: 1050, height: 558, background: '#5db779', borderRadius: 500, position: 'relative' }}>

              <PlayerLeftTopDiagonalCards />
              <PlayerLeftBottomCards />
              <PlayerRightTopDiagonalCards />
              <PlayerRightBottomCards />


              <div style={{position: 'absolute', left: 0, right: 0}}>

              <div style={{width: 500, position: 'relative', height: 558, margin: 'auto'}}>
                <div style={{position: 'absolute', top: 120, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', left: 0, right: 0, transform: 'rotate(-180deg)'}}>
                  <PlayerTopRightCards />
                  <PlayerTopCenterCards />
                  <PlayerTopLeftCards />
                </div>
                <div className={"board-center"} style={{position: 'relative', marginLeft: 0}}>
                  <CardShirt className='straight-card'
                             style={{visibility: 'hidden', position: 'absolute', top: 180, left: 128, right: 0}}/>
                  <CardShirt className='straight-card'
                             style={{visibility: 'hidden', position: 'absolute', top: 180, left: 128 + 80, right: 0}}/>
                  <CardShirt className='straight-card'
                               style={{visibility: 'hidden', position: 'absolute', top: 180, left: 128 + 80 + 80, right: 0}}/>
                  <CardShirt className='straight-card'
                             style={{visibility: 'hidden', position: 'absolute', top: 180, left: 128 + 80 + 80 + 80, right: 0}}/>
                  <CardShirt className='straight-card'
                             style={{visibility: 'hidden', position: 'absolute', top: 180, left: 128 + 80 + 80 + 80 + 80, right: 0}}/>
                </div>


                <div style={{
                  position: 'absolute',
                  bottom: 120,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  left: 0,
                  right: 0
                }}>
                  <PlayerBottomLeftCards/>
                  <PlayerBottomCenterCards/>

                  <div style={{position: 'relative'}}>
                    <img style={{marginTop: 10}} width={50} height={50} src={'public/dealer.png'}/>

                    {deckCardPositions.map((card, index) => {
                      return (
                        <div className='dealer-deck-moved' key={index} style={{position: 'relative'}}>
                          <CardShirt style={{zIndex: 0, position: 'absolute', bottom: card.bottomValue, left: 0, right: 0,
                            transform: `translateY(${card.translateYValue}px) translateX(${card.translateXValue}px) rotate(${card.rotateValue})` }} />
                        </div>
                      )
                    })}
                    <PlayerBottomRightCards cards={deck} />


                  </div>
                </div>

                <PlayerDibs dips={formatPotDips()} className='potDibs' style={{position: 'absolute', top: 200, left: -40, right: 0, bottom: 0, margin: 'right', width: 200}} />

                {/*<div style={{position: 'absolute', right: -40, top: 230}}>*/}
                {/*  <CardShirt style={{marginRight: 10}} />*/}
                {/*  <CardShirt style={{marginRight: 10}}/>*/}
                {/*  <CardShirt style={{marginRight: 10}}/>*/}
                {/*  <CardShirt style={{marginRight: 10}}/>*/}
                {/*  <CardShirt />*/}
                {/*</div>*/}

                <PlayerDibs className={`${PLAYER_WALLE}Dips`} dips={playersDips.filter((playerDip) => {
                  return playerDip.player === PLAYER_WALLE
                } )[0].dips} rotate={"-180deg"} style={{position: 'absolute', top: 106, left: -276, right: 0, transform: 'rotate(135deg)'}} />
                <PlayerDibs className={`${PLAYER_EVE}Dips`} dips={playersDips.filter((playerDip) => {
                  return playerDip.player === PLAYER_EVE
                } )[0].dips} rotate={"-180deg"} style={{position: 'absolute', top: 106, right: -276, transform: 'rotate(-135deg)'}} />
                <PlayerDibs className={`${PLAYER_ABU}Dips`} dips={playersDips.filter((playerDip) => {
                  return playerDip.player === PLAYER_ABU
                } )[0].dips} rotate={"-180deg"} style={{position: 'absolute', bottom: 106, left: -276, right: 0, transform: 'rotate(45deg)'}} />
                <PlayerDibs className={`${PLAYER_CARPET}Dips`} dips={playersDips.filter((playerDip) => {
                  return playerDip.player === PLAYER_CARPET
                } )[0].dips} rotate={"-180deg"} style={{position: 'absolute', bottom: 106, right: -276, transform: 'rotate(-45deg)'}} />

                <PlayerDibs className={`${PLAYER_JASMINE}Dips`} dips={playersDips.filter((playerDip) => {
                  return playerDip.player === PLAYER_JASMINE
                } )[0].dips} rotate={"-180deg"} style={{position: 'absolute', top: 20, left: -90, right: 0, transform: 'rotate(-180deg)'}} />
                <PlayerDibs className={`${PLAYER_SULTAN}Dips`} dips={playersDips.filter((playerDip) => {
                  return playerDip.player === PLAYER_SULTAN
                } )[0].dips} rotate={"-180deg"} style={{position: 'absolute', top: 20, left: 0, right: 0, margin: 'auto', transform: 'rotate(-180deg)'}} />
                <PlayerDibs className={`${PLAYER_TIGER}Dips`} dips={playersDips.filter((playerDip) => {
                  return playerDip.player === PLAYER_TIGER
                } )[0].dips} rotate={"-180deg"} style={{position: 'absolute', top: 20, right: -90, transform: 'rotate(-180deg)'}} />

                <PlayerDibs className={`${PLAYER_YAGO}Dips`} dips={playersDips.filter((playerDip) => {
                  return playerDip.player === PLAYER_YAGO
                } )[0].dips} style={{position: 'absolute', bottom: 20, left: -60, right: 0}} />
                <PlayerDibs className={`${PLAYER_ALLADIN}Dips`} dips={playersDips.filter((playerDip) => {
                  return playerDip.player === PLAYER_ALLADIN
                } )[0].dips} style={{position: 'absolute', bottom: 20, left: 0, right: -60, margin: 'auto'}} />
                {/*<PlayerDibs style={{position: 'absolute', bottom: 20, right: -120}} />*/}

              </div>

              </div>

            </Table>
          </TableBorder>



          <img className={`${PLAYER_JASMINE}player`} style={{position: 'absolute', top: 20, left: 420, backgroundColor: 'white', borderRadius: 100, border: `2px solid #2a89af`, backgroundColor: '#2a89af'}} width={100} height={100} src={'public/jasmine.png'} />
          <img className={`${PLAYER_SULTAN}player`} style={{position: 'absolute', top: 20, right: 0, left: 0, margin: 'auto', borderRadius: 100, border: `2px solid #feb937`, backgroundColor: '#feb937'}} width={100} height={100} src={'public/sultan.png'} />
          <img className={`${PLAYER_TIGER}player`} style={{position: 'absolute', top: 20, right: 420, borderRadius: 100, border: `2px solid #cc8207`, backgroundColor: '#cc8207'}} width={100} height={100} src={'public/tiger.png'} />

          <img className={`${PLAYER_EVE}player`} style={{position: 'absolute', top: 150, right: 120, backgroundColor: 'white', borderRadius: 100, border: `2px solid #71457b`, backgroundColor: '#71457b'}} width={100} height={100} src={'public/eva.png'} />
          <img className={`${PLAYER_WALLE}player`} style={{position: 'absolute', top: 150, left: 120, backgroundColor: 'white', borderRadius: 100, border: `2px solid #71457b`, backgroundColor: '#71457b'}} width={100} height={100} src={'public/walle.png'} />
          <img className={`${PLAYER_CARPET}player`} style={{position: 'absolute', bottom: 150, right: 120, backgroundColor: 'white', borderRadius: 100, border: `2px solid #71457b`, backgroundColor: '#71457b'}} width={100} height={100} src={'public/carpet.png'} />
          <img className={`${PLAYER_ABU}player`} style={{position: 'absolute', bottom: 150, left: 120, backgroundColor: 'white', borderRadius: 100, border: `2px solid #71457b`, backgroundColor: '#71457b'}} width={100} height={100} src={'public/monkey.png'} />
          <img className={`${PLAYER_YAGO}player`} style={{position: 'absolute', bottom: 20, left: 420, backgroundColor: 'white', borderRadius: 100, border: `2px solid #ff2531`, backgroundColor: '#ff2531'}} width={100} height={100} src={'public/yago.png'} />
          <img className={`${PLAYER_ALLADIN}player`} style={{position: 'absolute', bottom: 20, right: 0, left: 0, margin: 'auto', borderRadius: 100, border: `2px solid #dd446c`, backgroundColor: '#dd446c'}} width={100} height={100} src={'public/aladdin.png'} />
          <img className={`${PLAYER_JINNY}player`} style={{position: 'absolute', bottom: 20, right: 420, borderRadius: 100, border: `2px solid #51bbeb`, backgroundColor: '#51bbeb', backgroundColor: '#51bbeb'}} width={100} height={100} src={'public/jinn.png'} />
        </div>

        { [PLAYER_ALLADIN, PLAYER_YAGO, PLAYER_ABU, PLAYER_CARPET, PLAYER_WALLE, PLAYER_JASMINE, PLAYER_SULTAN, PLAYER_TIGER, PLAYER_EVE, PLAYER_CARPET].indexOf(selectedPlayer) !== -1 && (
          <div style={{position: 'absolute', left:0, right: 0, bottom:0, top:0, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
            <div style={{ width: 300, height: 500, background: 'white', zIndex: 100, marginRight: 30 }}>
              <div style={{fontSize: 21, padding: '20px 30px'}}>Pre-flop Betting Round</div>

              {smallBlindBetAllowed && (
                <SmallBet
                  playersDips={playersDips}
                  chosenPlayerBetValue={chosenPlayerBetValue}
                  selectedPlayer={selectedPlayer}
                  onAddToBet={handleAddToBet}
                  onClearBet={handleClearBet}
                  onCompleteSmallBlindBet={handleCompleteSmallBlindBet}
                />
              )}

              {'show-animate-from-original' === showAnimateMovingPlayerDips && isCallAllowed() && (<div style={{
                background: 'rgb(41, 128, 185)',
                padding: '20px 30px',
                color: '#000',
                fontSize: 19,
                color: '#fff',
                cursor: 'pointer'
              }}><div onClick={handleCall} style={{marginBottom: 10}}><div>Call</div></div></div>)}
              {isRaiseAllowed() && (
                <div style={{
                  background: '#f3f3f3',
                  padding: '20px 30px',
                  color: '#000',
                  fontSize: 19
                }}><div data-logic='same-logic-as-bet' data-toggle-logic='toggle-into-bet-on-click' style={{marginBottom: 10}}><div>Raise</div></div>
                </div>
              )}

              <div style={{
                background: '#f3f3f3',
                padding: '20px 30px',
                color: '#000',
                fontSize: 19
              }}><div style={{marginBottom: 10}}><div>Fold</div></div>
              </div>
            </div>
          </div>
        )}

      </RoomContainer>
    </LayoutUser>)
}
