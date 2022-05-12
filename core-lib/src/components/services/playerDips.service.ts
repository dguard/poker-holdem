import {
  dipAmountTypes,
  DIP_AMOUNT_500,
  DIP_AMOUNT_5000,
  DIP_AMOUNT_100,
  DIP_AMOUNT_1000,
  PlayerListDip,
  PlayerDictDip
} from "@core-lib/components/models/dipsAmount";
import {
  AvailablePlayerNames,
  PLAYER_ALADDIN,
  PLAYER_CARPET,
  PLAYER_JASMINE, PLAYER_SULTAN,
  PLAYER_WALLE,
  PLAYER_YAGO,
  PLAYER_TIGER, PLAYER_EVE, PLAYER_ABU
} from "../models/players";

class PlayerDipsService {

  async findPlayerDipsMap(): Promise<{ [k in AvailablePlayerNames]: PlayerDictDip }> {
    return {
      /* PLAYER_JINNU */
      [PLAYER_ALADDIN]: {
        [DIP_AMOUNT_100]: { count: 20 },
        [DIP_AMOUNT_500]: {count: 10},
        [DIP_AMOUNT_1000]: {count: 5},
        [DIP_AMOUNT_5000]: {count: 1}
      },
      [PLAYER_YAGO]: {
        [DIP_AMOUNT_100]: { count: 20 },
        [DIP_AMOUNT_500]: {count: 10},
        [DIP_AMOUNT_1000]: {count: 5},
        [DIP_AMOUNT_5000]: {count: 1}
      },
      [PLAYER_CARPET]: {
        [DIP_AMOUNT_100]: { count: 20 },
        [DIP_AMOUNT_500]: {count: 10},
        [DIP_AMOUNT_1000]: {count: 5},
        [DIP_AMOUNT_5000]: {count: 1}
      },
      [PLAYER_WALLE]: {
        [DIP_AMOUNT_100]: { count: 20 },
        [DIP_AMOUNT_500]: {count: 10},
        [DIP_AMOUNT_1000]: {count: 5},
        [DIP_AMOUNT_5000]: {count: 1}
      },
      [PLAYER_JASMINE]: {
        [DIP_AMOUNT_100]: { count: 20 },
        [DIP_AMOUNT_500]: {count: 10},
        [DIP_AMOUNT_1000]: {count: 5},
        [DIP_AMOUNT_5000]: {count: 1}
      },
      [PLAYER_SULTAN]: {
        [DIP_AMOUNT_100]: { count: 20 },
        [DIP_AMOUNT_500]: {count: 10},
        [DIP_AMOUNT_1000]: {count: 5},
        [DIP_AMOUNT_5000]: {count: 1}
      },
      [PLAYER_TIGER]: {
        [DIP_AMOUNT_100]: { count: 20 },
        [DIP_AMOUNT_500]: {count: 10},
        [DIP_AMOUNT_1000]: {count: 5},
        [DIP_AMOUNT_5000]: {count: 1}
      },
      [PLAYER_EVE]: {
        [DIP_AMOUNT_100]: { count: 20 },
        [DIP_AMOUNT_500]: {count: 10},
        [DIP_AMOUNT_1000]: {count: 5},
        [DIP_AMOUNT_5000]: {count: 1}
      },
      [PLAYER_ABU]: {
        [DIP_AMOUNT_100]: { count: 20 },
        [DIP_AMOUNT_500]: {count: 10},
        [DIP_AMOUNT_1000]: {count: 5},
        [DIP_AMOUNT_5000]: {count: 1}
      }
    }
  }

}

export const playerDipsService = new PlayerDipsService()