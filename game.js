const readline = require("readline");
const _ = require("lodash"); // Import lodash
const { Console } = require("console");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// game.js

// Define your game logic here

document.addEventListener("DOMContentLoaded", function () {
  // Add event listeners to buttons and update the game display
  const startButton = document.getElementById("start-button");
  const fightButton = document.getElementById("fight-button");
  const runButton = document.getElementById("run-button");
  const inventoryButton = document.getElementById("inventory-button");
  const gameDisplay = document.getElementById("game-display");

  startButton.addEventListener("click", () => {
    // Start the game, initialize character, and display the initial game state
    gameDisplay.innerHTML = "Welcome to the game!";

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
    var currentLocationIndex = 1;
    playGame();

    function pickChar() {
      console.log("There are 3 characters to choose from.");
      console.log("Barbarian (1), Hero (2) or Mage (3)");
      rl.question("Please choose a character (1, 2, or 3): ", (pick) => {
        var choice = parseInt(pick);

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
          default:
            console.log("Invalid choice.");
            break;
        }

        console.log("You've chosen to be a " + playerCharacter.name);
        console.log(
          "Your weapon of choice is a " + playerCharacter.heldItem.name
        );

        enterLocation(location); // Close the interface to exit the script
      });
    }
  });

  fightButton.addEventListener("click", () => {
    // Handle the fight logic and update the game display
  });

  runButton.addEventListener("click", () => {
    // Handle the run logic and update the game display
  });

  inventoryButton.addEventListener("click", () => {
    // Display the player's inventory
  });
});
