import {Monster, MonsterType, SuperMonster} from "./models/monsterTypes";


const monster1: Monster = {
    firstName: "Zorg",
    age: 500,
    type: MonsterType.Undead,
    moreInfo: "Terrifies entire galaxies"
};

console.log(monster1);

const monster2: Monster = {
    firstName: "Blobbo",
    age: 3,
    type: MonsterType.Blob,
    moreInfo: "absorb everything in sight"
};

console.log(monster2);

const monster3: Monster = {
    firstName: "Alice",
    lastName: "Smith",
    age: 28,
    type: MonsterType.Human,
    moreInfo: "Monster Research"
};

console.log(monster3);

const monster4: SuperMonster = {
    firstName: "Vlad",
    age: 1000,
    type: MonsterType.Undead,
    moreInfo: "Shape shifter: bats, rats, and cats",
    powerLevel: 100
};

console.log(monster3);

const monsters: Monster[] = [monster1, monster2, monster3, monster4];
console.log(monsters);