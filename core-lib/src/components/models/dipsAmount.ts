
export const DIP_AMOUNT_100 = 'DIP_AMOUNT_100'
export const DIP_AMOUNT_500 = 'DIP_AMOUNT_500'
export const DIP_AMOUNT_1000 = 'DIP_AMOUNT_1000'
export const DIP_AMOUNT_5000 = 'DIP_AMOUNT_5000'

export type dipAmountTypes = 'DIP_AMOUNT_100' | 'DIP_AMOUNT_500' | 'DIP_AMOUNT_1000' | 'DIP_AMOUNT_5000'

export type PlayerListDip = Array<{
  amount: dipAmountTypes
  count: number
}>

export type PlayerDictDip = {
  [k in dipAmountTypes]?: { count: number}
}

export const DIP_AMOUNT_NUMBERS = {
  [DIP_AMOUNT_100]: 100,
  [DIP_AMOUNT_500]: 500,
  [DIP_AMOUNT_1000]: 1000,
  [DIP_AMOUNT_5000]: 5000
}

export const DIP_AMOUNT_KEYS = [DIP_AMOUNT_100, DIP_AMOUNT_500, DIP_AMOUNT_1000, DIP_AMOUNT_5000]