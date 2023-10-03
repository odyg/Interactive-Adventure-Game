const readline = require("readline");
const _ = require("lodash"); // Import lodash

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let availableItems = [
  { name: "ninjaStar", type: "weapon", value: 15, itemNum: "1" },
  { name: "Mace", type: "weapon", value: 45, itemNum: "2" },
  { name: "Spiked Whip", type: "weapon", value: 35, itemNum: "3" },
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

function getItems(RandomItems) {
  return availableItems.find((items) => items.itemNum === RandomItems);
}

function fightEnemy(enemy) {
  rl.question("Do you want to fight this enemy (Y/N): ", (choice) => {
    let ans = choice.toUpperCase();
    if (ans === "Y") {
      if (RandomIntFight() > 25) {
        let RandomItems = RandomIntItems();
        let item = getItems(RandomItems);
        console.log("You won and slayed that " + enemy);
        console.log(item);
        playerCharacter.pickUpItem(item);
      } else {
        console.log("You did not survive that fight against the " + enemy);
        playagain();
      }
    } else {
      if (RandomIntFight() > 25) {
        console.log(
          "You were not able to run away from " + enemy + " and died."
        );
        playagain();
      } else {
        console.log("You got away from the " + enemy + ".");
      }
    }
  });
}
