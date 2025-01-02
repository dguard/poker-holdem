import React from "react";
import { DIP_NUMBERS, DIP_TEXTS } from "../../../pages/PokerRoom";
import { observer } from 'mobx-react'

export const SmallBet = observer(({playersDips, chosenPlayerBetValue, selectedPlayer, onAddToBet, onClearBet, onCompleteSmallBlindBet}) => {
  const dipHighlighted = (dipAmount) => {
    const addedDipsCount = [0].concat(chosenPlayerBetValue.value.filter((dip) => {
      return dip.dipAmount === dipAmount
    })).reduce((prev, curr) => {
      return prev + curr.count
    })
    const chosenDipsCount = playersDips.filter((playerDip) => {
      return playerDip.player === selectedPlayer
    } )[0].dips.filter((dip) => {
      return dip.dipAmount === dipAmount
    })[0].count

    return addedDipsCount < chosenDipsCount
  }

  const getAvailablePlayerBet = () => {
    return DIP_TEXTS.filter((item) => {
      return getAvailableDipAmount(selectedPlayer).indexOf(item.dipAmount) !== -1
    })
  }
  const getAvailableDipAmount = (player) => {
    return playersDips.filter((playerDip) => {
      return playerDip.player === player
    } )[0].dips.map((dip) => {
      return dip.dipAmount
    })
  }

    return (
    <div style={{
      background: '#00c763',
      padding: '20px 30px',
      color: 'white',
      fontSize: 19
    }}><div style={{marginBottom: 10}}>Do small blind bet</div>
      <div style={{marginBottom: 10}}>
        {getAvailablePlayerBet().map((dipText, index) => {
          const highlighted = dipHighlighted(dipText.dipAmount)
          return <div key={index} style={{position: 'relative', display: 'inline-block'}}>
            <div data-text={dipText.text} className='player-bet-as-dip' onClick={() => highlighted ? onAddToBet(selectedPlayer, dipText.dipAmount) : {} } style={{display: 'inline-block', padding: '5px 10px', background: highlighted ? '#fcbc0a' : 'lightgray', borderRadius: 10, marginRight: 10, marginBottom: 10, cursor: 'pointer', userSelect: 'none'}}>{dipText.text}</div>
          </div>
        })}
        <div onClick={() => onClearBet(selectedPlayer)} style={{display: 'inline-block', padding: '5px 10px', background: 'white', color: '#000', borderRadius: 10, marginRight: 10, marginBottom: 10, cursor: 'pointer', userSelect: 'none'}}>Clear</div>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <div className='player-bet' style={{
          background: '#f77038',
          padding: '5px 10px',
          color: 'white',
          display: 'inline-block',
          fontSize: 19
        }}>Total: ${chosenPlayerBetValue.value.length && [0].concat(chosenPlayerBetValue.value).reduce((prev, curr) => {
          return prev + curr.count*Number(DIP_NUMBERS.filter((item) => item.dipAmount === curr.dipAmount)[0].number.replace('$', ''))
        }) || 0 }</div>
        <div style={{textDecoration: 'underline', cursor: 'pointer', userSelect: 'none'}} onClick={() => onCompleteSmallBlindBet(selectedPlayer)}>Complete</div>
      </div>
    </div>
  )
}
)
