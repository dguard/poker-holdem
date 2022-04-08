import React, { ReactElement, useState } from "react";
import LayoutUser from "components/LayoutUser";
import styled from 'styled-components';

const RoomContainer = styled.div``

const TableBorder = styled.div``
const Table = styled.div``

const CardShirt = ({style}: {style?: object}) => {
  const newStyle = Object.assign({
    borderRadius: 14, border: '2px solid #fff'
  }, style ?? style)

  return <img width={60} height={90} style={newStyle} src={'cardShirt.png'} />
}

const Dib25Cent = ({style}: {style?: object}) => {
  const newStyle = Object.assign({
    height: 50, width: 50, borderRadius: 50
  }, style ?? style)
  return <img src={'dib25Cent.png'} style={newStyle} />
}
const Dib50Cent = ({style}: {style?: object}) => {
  const newStyle = Object.assign({
    height: 50, width: 50, borderRadius: 50
  }, style ?? style)
  return <img src={'dib50Cent.png'} style={newStyle} />
}
const Dib1Dollar = ({style}: {style?: object}) => {
  const newStyle = Object.assign({
    height: 50, width: 50, borderRadius: 50
  }, style ?? style)
  return <img src={'dib1Dollar.png'} style={newStyle} />
}
const Dib5Dollars = ({style}: {style?: object}) => {
  const newStyle = Object.assign({
    height: 50, width: 50, borderRadius: 50
  }, style ?? style)
  return <img src={'dib5Dollars.png'} style={newStyle} />
}
const Dib10Dollars = ({style}: {style?: object}) => {
  const newStyle = Object.assign({
    height: 50, width: 50, borderRadius: 50
  }, style ?? style)
  return <img src={'dib10Dollars.png'} style={newStyle} />
}
const Dib25Dollars = ({style}: {style?: object}) => {
  const newStyle = Object.assign({
    height: 50, width: 50, borderRadius: 50
  }, style ?? style)
  return <img src={'dib25Dollars.png'} style={newStyle} />
}
const Dib50Dollars = ({style}: {style?: object}) => {
  const newStyle = Object.assign({
    height: 50, width: 50, borderRadius: 50
  }, style ?? style)
  return <img src={'dib50Dollars.png'} style={newStyle} />
}
const Dib100Dollars = ({style}: {style?: object}) => {
  const newStyle = Object.assign({
    height: 50, width: 50, borderRadius: 50
  }, style ?? style)
  return <img src={'dib100Dollars.png'} style={newStyle} />
}
const Dib500Dollars = ({style}: {style?: object}) => {
  const newStyle = Object.assign({
    height: 50, width: 50, borderRadius: 50
  }, style ?? style)
  return <img src={'dib500Dollars.png'} style={newStyle} />
}
const Dib1000Dollars = ({style}: {style?: object}) => {
  const newStyle = Object.assign({
    height: 50, width: 50, borderRadius: 50
  }, style ?? style)
  return <img src={'dib1000Dollars.png'} style={newStyle} />
}
const Dib5000Dollars = ({style}: {style?: object}) => {
  const newStyle = Object.assign({
    height: 50, width: 50, borderRadius: 50
  }, style ?? style)
  return <img src={'dib5000Dollars.png'} style={newStyle} />
}
const Dib10000Dollars = ({style}: {style?: object}) => {
  const newStyle = Object.assign({
    height: 50, width: 50, borderRadius: 50
  }, style ?? style)
  return <img src={'dib10000Dollars.png'} style={newStyle} />
}

const DibGroup = ({dib, count, rotate, style}: {dib: ReactElement, count: number, rotate?: string, style?: object}) => {
  const newStyle = Object.assign({position: 'relative', width: 50, height: 50, display:' inline-block'}, style ?? style)
  return <div style={newStyle}>
    {Array.from(Array(count)).map((_, index) => {
      if(rotate === '-180deg') {
        return dib({style: {position: 'absolute', top: 0 +index * 4}})
      }

      return dib({style: {position: 'absolute', bottom: 0 + index * 4}})
    })}
  </div>
}

const PlayerLeftTopDiagonalCards = () => {
  return (
    <div style={{position: 'absolute', top: 160, display: 'flex', left: 140, transform: 'rotate(135deg)'}}>
      <div style={{position: 'relative'}}>
        <CardShirt style={{transformOrigin: 'left bottom',  position: 'absolute', left: 0, transform: 'rotate(-14deg)'}}  />
        <CardShirt />
        <CardShirt style={{position: 'absolute', bottom: 5, left: 0, right: 0}} />
      </div>
    </div>
  )
}

const PlayerRightTopDiagonalCards = () => {
  return (<div style={{ position: 'absolute', top: 160, display: 'flex', right: 140, transform: 'rotate(-135deg)' }}>
    <div style={{ position: 'relative' }}>
      <CardShirt
        style={{ transformOrigin: 'left bottom', position: 'absolute', left: 0, transform: 'rotate(-14deg)' }} />
      <CardShirt />
      <CardShirt style={{ position: 'absolute', bottom: 5, left: 0, right: 0 }} />
    </div>
  </div>
  )
}
const PlayerLeftBottomCards = () => {
  return (<div style={{ position: 'absolute', bottom: 150, display: 'flex', left: 140, transform: 'rotate(45deg)' }}>
    <div style={{ position: 'relative' }}>
      <CardShirt
        style={{ transformOrigin: 'left bottom', position: 'absolute', left: 0, transform: 'rotate(-14deg)' }} />
      <CardShirt />
      <CardShirt style={{ position: 'absolute', bottom: 5, left: 0, right: 0 }} />
    </div>
  </div>)
}
const PlayerRightBottomCards = () => {
  return (<div style={{position: 'absolute', bottom: 150, display: 'flex', right: 140, transform: 'rotate(-45deg)'}}>
    <div style={{position: 'relative'}}>
      <CardShirt style={{transformOrigin: 'left bottom',  position: 'absolute', left: 0, transform: 'rotate(-14deg)'}}  />
      <CardShirt />
      <CardShirt style={{position: 'absolute', bottom: 5, left: 0, right: 0}} />
    </div>
  </div>)
}

const PlayerTopLeftCards = () => {
  return (<div style={{position: 'relative'}}>
    <CardShirt style={{transformOrigin: 'left bottom',  position: 'absolute', left: 0, transform: 'rotate(-14deg)'}}  />
    <CardShirt />
    <CardShirt style={{position: 'absolute', bottom: 5, left: 0, right: 0}} />
  </div>)
}

const PlayerTopCenterCards = () => {
  return (
    <div style={{position: 'relative'}}>
      <CardShirt style={{transformOrigin: 'left bottom',  position: 'absolute', left: 0, transform: 'rotate(-14deg)'}}  />
      <CardShirt />
      <CardShirt style={{position: 'absolute', bottom: 5, left: 0, right: 0}} />
    </div>
  )
}
const PlayerTopRightCards = () => {
  return (
    <div style={{position: 'relative'}}>
      <CardShirt style={{transformOrigin: 'left bottom',  position: 'absolute', left: 0, transform: 'rotate(-14deg)'}}  />
      <CardShirt />
      <CardShirt style={{position: 'absolute', bottom: 5, left: 0, right: 0}} />
    </div>
  )
}

const PlayerBottomLeftCards = () => {
  return (
    <div style={{position: 'relative'}}>
      <CardShirt style={{transformOrigin: 'left bottom',  position: 'absolute', left: 0, transform: 'rotate(-14deg)'}}  />
      <CardShirt />
      <CardShirt style={{position: 'absolute', bottom: 5, left: 0, right: 0}} />
    </div>
  )
}

const PlayerBottomCenterCards = () => {
  return (
    <div style={{position: 'relative'}}>
      <CardShirt style={{transformOrigin: 'left bottom',  position: 'absolute', left: 0, transform: 'rotate(-14deg)'}}  />
      <CardShirt />
      <CardShirt style={{position: 'absolute', bottom: 5, left: 0, right: 0}} />
    </div>
  )
}

const PlayerBottomRightCards = () => {
 return (
   <div style={{position: 'relative'}}>
     <CardShirt style={{transformOrigin: 'left bottom',  position: 'absolute', left: 0, transform: 'rotate(-14deg)'}}  />
     <CardShirt />
     <CardShirt style={{position: 'absolute', bottom: 5, left: 0, right: 0}} />
   </div>
 )
}


const PlayerDibs = ({style, rotate}: {style?: object, rotate?: string}) => {
  const newStyle = Object.assign({
    width: 240, display: 'flex', flexDirection: 'row', justifyContent: 'center',
  }, style ?? style)

  return (<div style={newStyle}>
    <div style={{position: 'relative'}}>
      {/*<Dib25Cent style={{zIndex: rotate === '-180deg' ? 12 : 0}} />*/}
      {/*<Dib50Cent style={{zIndex: rotate === '-180deg' ? 11 : 0}} />*/}
      {/*<Dib1Dollar style={{zIndex: rotate === '-180deg' ? 10 : 0}} />*/}
      {/*<Dib5Dollars style={{zIndex: rotate === '-180deg' ? 9 : 0}} />*/}
      {/*<Dib10Dollars style={{zIndex: rotate === '-180deg' ? 8 : 0}}/>*/}
      {/*<Dib25Dollars style={{zIndex: rotate === '-180deg' ? 7 : 0}}/>*/}
      {<DibGroup rotate={rotate} dib={Dib50Dollars} count={5} style={{zIndex: rotate === '-180deg' ? 6 : 0}} />}

      {<DibGroup rotate={rotate} dib={Dib100Dollars} count={10} style={{zIndex: rotate === '-180deg' ? 5 : 0}} />}

      {/*<Dib500Dollars style={{zIndex: rotate === '-180deg' ? 4 : 0}}/>*/}
      {/*<Dib1000Dollars style={{zIndex: rotate === '-180deg' ? 3 : 0}}/>*/}

      {<DibGroup rotate={rotate} dib={Dib5000Dollars} count={10} style={{zIndex: rotate === '-180deg' ? 2 : 0}} />}
      <Dib10000Dollars style={{zIndex: rotate === '-180deg' ? 1 : 0}}/>
    </div>

    <div style={{position: 'relative'}}>
    </div>

    <div style={{position: 'relative'}}>
    </div>
  </div>)
}

export function PokerRoom(){
  return (
    <LayoutUser>
      <RoomContainer>
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
                  <PlayerTopLeftCards />
                  <PlayerTopCenterCards />
                  <PlayerTopRightCards />
                </div>


                <div style={{position: 'absolute', bottom: 120, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', left: 0, right: 0}}>
                  <PlayerBottomLeftCards />
                  <PlayerBottomCenterCards />
                  <PlayerBottomRightCards />
                </div>

                <PlayerDibs style={{position: 'absolute', top: 200, left: -40, right: 0, bottom: 0, margin: 'right', width: 200}} />

                <div style={{position: 'absolute', right: -40, top: 230}}>
                  <CardShirt style={{marginRight: 10}} />
                  <CardShirt style={{marginRight: 10}}/>
                  <CardShirt style={{marginRight: 10}}/>
                  <CardShirt style={{marginRight: 10}}/>
                  <CardShirt />
                </div>

                <PlayerDibs rotate={"-180deg"} style={{position: 'absolute', top: 106, left: -276, right: 0, transform: 'rotate(135deg)'}} />
                <PlayerDibs rotate={"-180deg"} style={{position: 'absolute', top: 106, right: -276, transform: 'rotate(-135deg)'}} />
                <PlayerDibs rotate={"-180deg"} style={{position: 'absolute', bottom: 106, left: -276, right: 0, transform: 'rotate(45deg)'}} />
                <PlayerDibs rotate={"-180deg"} style={{position: 'absolute', bottom: 106, right: -276, transform: 'rotate(-45deg)'}} />

                <PlayerDibs rotate={"-180deg"} style={{position: 'absolute', top: 20, left: -90, right: 0, transform: 'rotate(-180deg)'}} />
                <PlayerDibs rotate={"-180deg"} style={{position: 'absolute', top: 20, left: 0, right: 0, margin: 'auto', transform: 'rotate(-180deg)'}} />
                <PlayerDibs rotate={"-180deg"} style={{position: 'absolute', top: 20, right: -90, transform: 'rotate(-180deg)'}} />

                <PlayerDibs style={{position: 'absolute', bottom: 20, left: -60, right: 0}} />
                <PlayerDibs style={{position: 'absolute', bottom: 20, left: 0, right: -60, margin: 'auto'}} />
                <PlayerDibs style={{position: 'absolute', bottom: 20, right: -120}} />

              </div>

              </div>

            </Table>
          </TableBorder>

          <img style={{position: 'absolute', top: 20, left: 420, backgroundColor: 'white', borderRadius: 100, border: '2px solid #2a89af'}} width={100} height={100} src={'jasmine.png'} />
          <img style={{position: 'absolute', top: 20, right: 0, left: 0, margin: 'auto', borderRadius: 100, border: '2px solid #feb937'}} width={100} height={100} src={'sultan.png'} />
          <img style={{position: 'absolute', top: 20, right: 420, borderRadius: 100, border: '2px solid #cc8207'}} width={100} height={100} src={'tiger.png'} />

          <img style={{position: 'absolute', top: 150, right: 120, backgroundColor: 'white', borderRadius: 100, border: '2px solid #71457b'}} width={100} height={100} src={'eva.png'} />
          <img style={{position: 'absolute', top: 150, left: 120, backgroundColor: 'white', borderRadius: 100, border: '2px solid #71457b'}} width={100} height={100} src={'walle.png'} />
          <img style={{position: 'absolute', bottom: 150, right: 120, backgroundColor: 'white', borderRadius: 100, border: '2px solid #71457b'}} width={100} height={100} src={'carpet.png'} />
          <img style={{position: 'absolute', bottom: 150, left: 120, backgroundColor: 'white', borderRadius: 100, border: '2px solid #71457b'}} width={100} height={100} src={'monkey.png'} />
          <img style={{position: 'absolute', bottom: 20, left: 420, backgroundColor: 'white', borderRadius: 100, border: '2px solid #ff2531'}} width={100} height={100} src={'yago.png'} />
          <img style={{position: 'absolute', bottom: 20, right: 0, left: 0, margin: 'auto', borderRadius: 100, border: '2px solid #dd446c'}} width={100} height={100} src={'aladdin.png'} />
          <img style={{position: 'absolute', bottom: 20, right: 420, borderRadius: 100, border: '2px solid #51bbeb'}} width={100} height={100} src={'jinn.png'} />
        </div>
      </RoomContainer>
    </LayoutUser>)
}
