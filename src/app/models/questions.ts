import { Option } from './option.model';

export const QUESTIONS: Option[][] = [
    [
      {name: 'Meditation' , description: 'Close your eyes. Concentrate. Search in your inner thougts.', longDesc: 'You were a blue mage. You decide to seek guidance in meditation. You burn some incense, sit on the floor, close your eyes, and focus your will on the questions that lie in wait for you.'},
      {name: 'Praying' , description: 'Ask the Gods for guide, for help.', longDesc: 'You were a white mage. You draw on divine inspiration. You light some candles around you and kneel, beseeching the gods to enlighten you with their wisdom.'},
      {name: 'Reading', description: 'Search in old arcane books for answers.', longDesc: 'You were a red mage. You search through the dusty tomes of arcane knowledge that had belonged to another Mage years ago, trying to decipher answers among runes, glyphs and inscriptions, in lenghty texts and intelligible annotations.'},
      {name: 'Sacrifice', description: 'Any knowledge demands a prize. In blood .', longDesc: "You were a black mage. You don't have time for contemplation, so with a heavy heart, you claim your old neighbor's poor cat. You spill his blood with an accurate cut, and with it you draw a pentacle on the ground, while demanding answers from the dark beings in the shadows." }, 
    ],
    [
      {name: 'Attack', shortDesc: 'attack'},
      {name: 'Defend', shortDesc: 'defense'},
      {name: 'Evacuate', shortDesc: 'evacuation'},      
    ],
    [
      {name: "Lord's alliance"},
      {name: "Emerald Enclave"},
      {name: "Harpers"},
      {name: "Order of the Gauntlet"},
      {name: "Zhentarim"},
    ],
    [
      {name: "Lord's alliance"},
      {name: "Emerald Enclave"},
      {name: "Harpers"},
      {name: "Order of the Gauntlet"},
      {name: "Zhentarim"},
    ],
    [
      {name: "Trade district"},
      {name: "The Slums"},
      {name: "Noble district"},
      {name: "Temple district"},
    ]
  ];