"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const monsterTypes_1 = require("./models/monsterTypes");
const monster1 = {
    firstName: "Zorg",
    age: 500,
    type: monsterTypes_1.MonsterType.Undead,
    moreInfo: "Terrifies entire galaxies"
};
console.log(monster1);
const monster2 = {
    firstName: "Blobbo",
    age: 3,
    type: monsterTypes_1.MonsterType.Blob,
    moreInfo: "absorb everything in sight"
};
console.log(monster2);
const monster3 = {
    firstName: "Alice",
    lastName: "Smith",
    age: 28,
    type: monsterTypes_1.MonsterType.Human,
    moreInfo: "Monster Research"
};
console.log(monster3);
const monster4 = {
    firstName: "Vlad",
    age: 1000,
    type: monsterTypes_1.MonsterType.Undead,
    moreInfo: "Shape shifter: bats, rats, and cats",
    powerLevel: 100
};
console.log(monster3);
const monsters = [monster1, monster2, monster3, monster4];
console.log(monsters);
