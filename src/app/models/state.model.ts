import { User } from "./user.model";

export interface State {
    user?: User;
    step: number;
}