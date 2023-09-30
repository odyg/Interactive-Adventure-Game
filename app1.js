class Character {
  constructor(name, health, attackPower) {
    this.name = name;
    this.health = health;
    this.attackPower = attackPower;
    this.inventory = []; // inventory (array)
  }

  attack(target) {
    target.takeDamage(this.attackPower); // Call the target's takeDamage method
  }

  takeDamage(amount) {
    this.health -= amount; // Deduct the 'amount' from the character's health
  }

  pickUpItem(item) {
    this.inventory.push(item); // Add the item to the character's inventory
  }

  viewInventory() {
    this.inventory.forEach((element) => {
      console.log(element);
    });
  }
}

class Item {
  constructor(name, type, value) {
    this.name = name;
    this.type = type;
    this.value = value;
  }
}

// Create characters and items based on user choice
let playerCharacter;
let item;
let choice = "1";
switch (choice) {
  case "1":
    playerCharacter = new Character("Barbarian", 120, 80);
    item = new Item("Big Axe", "Weapon", 40);
    break;
  case "2":
    playerCharacter = new Character("Hero", 90, 65);
    item = new Item("Sword", "Weapon", 28);
    break;
  case "3":
    playerCharacter = new Character("Necromancer", 70, 50);
    item = new Item("Staff", "Healing", 17);
    break;
  default:
    console.log("Invalid choice");
    break;
}

// Add the chosen item to the character's inventory
if (playerCharacter && item) {
  playerCharacter.pickUpItem(item);
}

// Example usage
console.log(playerCharacter);
playerCharacter.attack(someEnemy); // You need to define 'someEnemy' or target
playerCharacter.viewInventory();
