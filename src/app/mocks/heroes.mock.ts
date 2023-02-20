import { Character } from "../models/character.model";
import { Condition } from "../models/condition.enum";

export const HEROES_MOCK: Character[] = [
    {
        "attack": 10,
        "alliance": "Harpers",
        "img": "ben_abbot.png",
        "id": "5JLUM1zMmTHTkNuXk2jH",
        "defense": 5,
        "points": 2,
        "health": 6,
        "name": "Ben",
        "status": {
            "id": "5JLUM1zMmTHTkNuXk2jH",
            "stance": "Deffensive",
            "wounds": 0,
            "condition": Condition.Ok
        }
    },
    {
        "name": "Bror",
        "points": 2,
        "defense": 4,
        "id": "XFrCztw0JTdJWFpQMR3q",
        "attack": 9,
        "health": 5,
        "alliance": "Zhentarim",
        "img": "bror.png",
        "status": {
            "id": "XFrCztw0JTdJWFpQMR3q",
            "stance": "Deffensive",
            "wounds": 0,
            "condition": Condition.Ok
        }
    },
    {
        "points": 1,
        "defense": 3,
        "name": "Aziz",
        "alliance": "Lord's alliance",
        "attack": 11,
        "health": 4,
        "id": "eBDPnK5xTbze17LPW6gn",
        "img": "aziz.png",
        "status": {
            "stance": "Offensive",
            "wounds": 0,
            "condition": Condition.Ok,
            "id": "eBDPnK5xTbze17LPW6gn"
        }
    }
]