export interface Monster{
    firstName: string; //every monster needs a name
    lastName?: string; //means it is optional
    age: number; // every monster has an age
    type: MonsterType; //choose a type
    moreInfo: string; // fun fact about the monster
}

export interface SuperMonster extends Monster {
    powerLevel: number;
}

export enum MonsterType {
    Human ="Human",
    Blob = "Blob",
    Undead = "Undead"
}
