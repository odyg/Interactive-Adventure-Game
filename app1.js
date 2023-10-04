const readline = require("readline");
const _ = require("lodash"); // Import lodash
const { Console } = require("console");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Character {
  constructor(name, health, attackPower, heldItem) {
    this.name = name;
    this.health = health;
    this.attackPower = attackPower;
    this.heldItem = heldItem;
    this.inventory = []; // inventory (array)
  }
  takeDamage(amount) {
    this.health -= amount;
  }

  pickUpItem(item) {
    this.inventory.push(item);
  }

  viewInventory() {
    inventory.forEach((element) => {
      console.log(element);
    });
  }
}

class item {
  constructor(name, type, value) {
    this.name = name;
    this.type = type;
    this.value = value;
  }
}

let playerCharacter;
let defaultItem;

let choice = 3;

switch (choice) {
  case 1:
    defaultItem = new item("bigAxe", "weapon", 40);
    playerCharacter = new Character("Barbarian", 120, 80, defaultItem);
    break;
  case 2:
    defaultItem = new item("Sword", "weapon", 28);
    playerCharacter = new Character("Hero", 90, 65, defaultItem);
    break;
  case 3:
    defaultItem = new item("Staff", "healing", 17);
    playerCharacter = new Character("Mage", 70, 50, defaultItem);
    break;
}

console.log("You've chosen to be a " + playerCharacter.name);
console.log("Your weapon of choice is a " + playerCharacter.heldItem.name);

var availableItems = [
  { name: "Ninja Star", type: "weapon", value: 15, itemNum: 1 },
  { name: "Mace", type: "weapon", value: 45, itemNum: 2 },
  { name: "Spiked Whip", type: "weapon", value: 35, itemNum: 3 },
];

let location1 = {
  location: "Cave",
  desc: "Wet and dark. Be careful not to slip or trip.",
  enemy: "Goblin",
};

enterLocation(location1);

function enterLocation(location1) {
  console.log("You are now entering the " + location1.location);
  console.log(
    "A few hours into your quest you encountered a " + location1.enemy
  );
  fightEnemy(location1.enemy);
}

function RandomIntFight() {
  return Math.floor(Math.random() * (101 - 1)) + 1;
}

function RandomIntItems() {
  return Math.floor(Math.random() * (4 - 1)) + 1;
}

function fightEnemy(enemy) {
  rl.question("Do you want to fight this enemy (Y/N): ", (choice) => {
    let ans = choice.toUpperCase();
    if (ans === "Y") {
      if (RandomIntFight() > 25) {
        let RandomItems = RandomIntItems();
        let item = _.find(availableItems, function (item) {
          return item.itemNum == RandomItems;
        });
        console.log("You won and slayed that " + enemy);
        console.log("Weapon gained: " + item.name);
        playerCharacter.pickUpItem(item);
      } else {
        console.log("You did not survive that fight against the " + enemy);
        playagain();
      }
    } else {
      if (RandomIntFight() > 25) {
        console.log(
          "You were not able to run away from the " + enemy + " and died."
        );
        playagain();
      } else {
        console.log("You got away from the " + enemy + ".");
      }
    }
  });
}

function playagain() {
  rl.question("Would you like to play again?: (Y/N)", (choice) => {
    let ans = choice.toUpperCase();
    if (ans === "Y") {
      enterLocation(location1);
    } else {
      console.log("Thanks for playing.");
    }
  });
}
