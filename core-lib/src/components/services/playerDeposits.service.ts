import { dipAmountTypes, PlayerDictDip } from "@core-lib/components/models/dipsAmount";
import {
  AvailablePlayerNames,
  PLAYER_ABU,
  PLAYER_ALADDIN,
  PLAYER_CARPET, PLAYER_EVE,
  PLAYER_JASMINE,
  PLAYER_SULTAN, PLAYER_TIGER,
  PLAYER_WALLE,
  PLAYER_YAGO
} from "../models/players";
import { ROUND_FLOP, ROUND_PREFLOP, ROUND_RIVER, ROUND_TURN, RoundDeposit } from "../models/round";

type PlayerListDeposit = Array<{
  amount: dipAmountTypes
  count: number
}>

class PlayerDepositsService {

  async findPlayerDepositsMap(): Promise<RoundDeposit> {
    return {
      [ROUND_PREFLOP]: {
        /* DILER_JINNY, */
        [PLAYER_ALADDIN]: {},
        [PLAYER_YAGO]: {},
        [PLAYER_CARPET]: {},
        [PLAYER_WALLE]: {},
        [PLAYER_JASMINE]: {},
        [PLAYER_SULTAN]: {},
        [PLAYER_TIGER]: {},
        [PLAYER_EVE]: {},
        [PLAYER_ABU]: {},
      },
      [ROUND_FLOP]: {
        /* DILER_JINNY, */
        [PLAYER_ALADDIN]: {},
        [PLAYER_YAGO]: {},
        [PLAYER_CARPET]: {},
        [PLAYER_WALLE]: {},
        [PLAYER_JASMINE]: {},
        [PLAYER_SULTAN]: {},
        [PLAYER_TIGER]: {},
        [PLAYER_EVE]: {},
        [PLAYER_ABU]: {},
      },
      [ROUND_TURN]: {
        /* DILER_JINNY, */
        [PLAYER_ALADDIN]: {},
        [PLAYER_YAGO]: {},
        [PLAYER_CARPET]: {},
        [PLAYER_WALLE]: {},
        [PLAYER_JASMINE]: {},
        [PLAYER_SULTAN]: {},
        [PLAYER_TIGER]: {},
        [PLAYER_EVE]: {},
        [PLAYER_ABU]: {},
      },
      [ROUND_RIVER]: {
        /* DILER_JINNY, */
        [PLAYER_ALADDIN]: {},
        [PLAYER_YAGO]: {},
        [PLAYER_CARPET]: {},
        [PLAYER_WALLE]: {},
        [PLAYER_JASMINE]: {},
        [PLAYER_SULTAN]: {},
        [PLAYER_TIGER]: {},
        [PLAYER_EVE]: {},
        [PLAYER_ABU]: {},
      }
    }
  }

}

export const playerDepositsService = new PlayerDepositsService()