const readline = require("readline");
const _ = require("lodash"); // Import lodash

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Character
// name
// health
// attackPower
// inventory (array)

class Character {
  constructor(name, health, attackPower, heldItem) {
    this.name = name;
    this.health = health;
    this.attackPower = attackPower;
    this.heldItem = heldItem;
    this.inventory = []; // inventory (array)
  }

  attack(target) {
    target.takeDamage(this.attackPower);
    const weapon = _.find(this.inventory, ["type", "weapon"]); // Assuming you have lodash imported
    if (weapon) {
      this.attackPower += weapon.value;
      return true;
    }
    return false;
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

let choice = "3";

switch (choice) {
  case "1":
    defaultItem = new item("bigAxe", "weapon", 40);
    playerCharacter = new Character("Barbarian", 120, 80, defaultItem);
    break;
  case "2":
    defaultItem = new item("Sword", "weapon", 28);
    playerCharacter = new Character("Hero", 90, 65, defaultItem);
    break;
  case "3":
    defaultItem = new item("Staff", "healing", 17);
    playerCharacter = new Character("Mage", 70, 50, defaultItem);
    break;
}

let listOfEnemys = [
  { name: "Goblin", health: 250, attackPower: 25, enemy: "1" },
  { name: "wildBoar", health: 350, attackPower: 30, enemy: "2" },
  { name: "Golem", health: 400, attackPower: 35, enemy: "3" },
];

let listOfLocations = [
  {
    location: "Cave",
    desc: "Wet and dark. Be careful not to slip or trip.",
    enemy: (listOfEnemys.name = "Goblin"),
  },
  {
    location: "Forest",
    desc: "Over-grown grass and bushes. This forest is covered in old trees. Watch out for those wild boars.",
    enemy: (listOfEnemys.name = "wildBoar"),
  },
  {
    location: "Rocky Plains",
    desc: "In the vast plains, golems take on a different form. They appear as living earth, with bodies made of fertile soil and grass.",
    enemy: (listOfEnemys.name = "Golem"),
  },
];

let availableItems = [
  { name: "ninjaStar", type: "weapon", value: 15, itemNum: "1" },
  { name: "Mace", type: "weapon", value: 45, itemNum: "2" },
  { name: "Spiked Whip", type: "weapon", value: 35, itemNum: "3" },
];

// function changeItems(itemNum) {
//   viewInventory();
//   defaultItem = selecledItem;
// }
let location1 = {
  location: "Cave",
  desc: "Wet and dark. Be careful not to slip or trip.",
  enemy: (listOfEnemys.name = "Goblin"),
};

enterLocation(location1);

function enterLocation(location1) {
  console.log("You are now entering the " + location1.name);
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
    if (choice === "Y") {
      if (RandomIntFight() > 25) {
        let RandomItems = RandomIntItems();
        let item = getItems(RandomItems);
        console.log("You won and slayed that " + enemy);
        console.log("You've gain an item from your fight: " + item);
        playerCharacter.pickUpItem(item);
      } else {
        console.log("You did not survived that fight againt " + enemy);
        playagain();
      }
    } else {
      if (RandomIntFight() > 25) {
        console.log(
          "You were not able to run away from " + enemy + " and died."
        );
        playagain();
      } else {
        console.log("You got away from the " + enemy + " .");
      }
    }
  });
}

function moveLocation(location2) {
  rl.question(
    "Would you like to leave the " +
      location2 +
      " and move to the new area? (Y/N)",
    (choice) => {
      if (choice === "Y") {
        enterLocation(location2);
      } else {
        console.log("let's wander some more.");
      }
    }
  );
}

function changeItem() {
  viewInventory();

  rl.question("Please enter the item you want to use: ", (itemNum) => {
    const selectedItem = inventory.find((item) => item.itemNum === itemNum);

    if (selectedItem && selectedItem.type === "weapon") {
      playerCharacter.pickUpItem(playerCharacter.heldItem);
      // Update the defaultItem to the newly selected item
      heldItem = selectedItem;

      console.log(`You have equipped ${heldItem.name}.`);
    } else {
      console.log("Invalid item selection or item is not a weapon.");
    }
    rl.close(); // Close the interface to allow the script to exit
  });
  // Find the selected item from availableItems based on itemNum
  const selectedItem = inventory.find((item) => item.itemNum === itemNum);

  // If the selected item is found and it's of type "weapon," update the character's inventory
  if (selectedItem && selectedItem.type === "weapon") {
    playerCharacter.pickUpItem(selectedItem);

    // Update the defaultItem to the newly selected item
    defaultItem = selectedItem;

    console.log(`You have equipped ${selectedItem.name}.`);
  } else {
    console.log("Invalid item selection or item is not a weapon.");
  }
}

console.log(playerCharacter);
console.log(listOfEnemys);

// Methods:
// attack(target)
// takeDamage(amount)
// pickUpItem(item)
// viewInventory()

// b. Item
// name
// type (weapon, healing, quest, etc.)
// value (e.g., attack power, healing power, etc.)

class location {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.character = []; // characters (array)
    this.items = []; // items (array)
    this.connectedLocations = []; // connectedLocations (array)
  }

  enterLocation() {
    return 0;
  }

  searchLocation() {
    return 0;
  }

  move(newLocation) {
    return 0;
  }
}
// c. Location
// name
// description
// characters (array)
// items (array)
// connectedLocations (array)

// Methods:
// enterLocation()
// searchLocation()
// move(newLocation)

rl.question("Please enter something: ", (answer) => {
  console.log(`You entered: ${answer}`);
  rl.close(); // Close the interface to allow the script to exit
});
