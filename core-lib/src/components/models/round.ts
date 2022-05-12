import { AvailablePlayerNames } from "@core-lib/components/models/players";
import { PlayerDictDip, PlayerListDip } from "@core-lib/components/models/dipsAmount";

export const ROUND_PREFLOP = 'ROUND_PREFLOP',
  ROUND_FLOP = 'ROUND_FLOP',
  ROUND_TURN = 'ROUND_TURN',
  ROUND_RIVER = 'ROUND_RIVER'
export const availableRounds = { [ROUND_PREFLOP]: {}, [ROUND_FLOP]: {}, [ROUND_TURN]: {}, [ROUND_RIVER]: {}}

export type RoundDeposit = {
  [ROUND_PREFLOP]?: {
    [k in AvailablePlayerNames]?: PlayerDictDip
  },
  [ROUND_FLOP]?: {
    [k in AvailablePlayerNames]?: PlayerDictDip
  },
  [ROUND_TURN]?: {
    [k in AvailablePlayerNames]?: PlayerDictDip
  },
  [ROUND_RIVER]?: {
    [k in AvailablePlayerNames]?: PlayerDictDip
  }
}
