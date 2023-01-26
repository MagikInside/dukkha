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
        "name": "Ben",
        "status": {
            "id": "5JLUM1zMmTHTkNuXk2jH",
            "stance": "Deffensive",
            "results": [],
            "condition": Condition.Ok
        }
    },
    {
        "name": "Bror",
        "points": 2,
        "defense": 4,
        "id": "XFrCztw0JTdJWFpQMR3q",
        "attack": 9,
        "alliance": "Zhentarim",
        "img": "bror.png",
        "status": {
            "id": "XFrCztw0JTdJWFpQMR3q",
            "stance": "Deffensive",
            "results": [],
            "condition": Condition.Ok
        }
    },
    {
        "points": 1,
        "defense": 3,
        "name": "Aziz",
        "alliance": "Lord's alliance",
        "attack": 11,
        "id": "eBDPnK5xTbze17LPW6gn",
        "img": "aziz.png",
        "status": {
            "stance": "Offensive",
            "results": [],
            "condition": Condition.Ok,
            "id": "eBDPnK5xTbze17LPW6gn"
        }
    }
]