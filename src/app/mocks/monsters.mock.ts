import { Character } from "../models/character.model";
import { Condition } from "../models/condition.enum";

export const MONSTERS_MOCK: Character[] = [
    {
        "defense": 5,
        "attack": 14,
        "health": 7,
        "name": "Grumlock",
        "img": "grumlock.png",
        "id": "7U6gI9APTNvXC1dp56D8",
        "status": {
            "condition": Condition.Ok,
            "stance": "Offensive",
            "wounds": 0,
            "id": "7U6gI9APTNvXC1dp56D8"
        }
    },
    {
        "img": "berspin.png",
        "name": "Berspin",
        "attack": 12,
        "defense": 2,
        "health": 4,
        "id": "K8LFoxpgsDnJaIjjUtI6",
        "status": {
            "condition": Condition.Ok,
            "wounds": 0,
            "id": "K8LFoxpgsDnJaIjjUtI6",
            "stance": "Offensive"
        }
    },
    {
        "img": "berspin2.png",
        "defense": 2,
        "attack": 12,
        "health": 4,
        "name": "Berspin",
        "id": "V59LyP0oNI9JUt6jwT1t",
        "status": {
            "condition": Condition.Ok,
            "stance": "Offensive",
            "id": "V59LyP0oNI9JUt6jwT1t",
            "wounds": 0,
        }
    },
    {
        "img": "leshy.png",
        "defense": 5,
        "health": 6,
        "name": "Leshy",
        "attack": 15,
        "id": "jw1pLnpHAIldQSPKdUyi",
        "status": {
            "id": "jw1pLnpHAIldQSPKdUyi",
            "wounds": 0,
            "condition": Condition.Ok,
            "stance": "Offensive"
        }
    }
];