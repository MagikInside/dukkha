import { Answers } from "./answers.model";
import { RoundInfo } from "./round-info.model";
import { Status } from "./status.model";
import { User } from "./user.model";

export interface State {
    user?: User;
    step: number;
    answers: Answers;
    scrollUp: boolean;
    selectedHeroesStatus: Status[];
    monstersStatus: Status[];
    availablePoints: number;
    roundInfo: RoundInfo,
    fightVictory: boolean | null;
}