// Get references to various HTML elements
const textElement = document.getElementById("typed-text");
const cursorElement = document.getElementById("cursor");
const showButton = document.getElementById("showButton");
const endGameText = document.getElementById("endGame");
const dropDown = document.getElementById("dropdownbtn");

// Initialize variables
let currentIndex = 0;
var tryAgain = 0;

// An array containing introductory text
var introText = [
  "The world stretches out before you, a vast tapestry of ancient lands and untold mysteries. In this realm, where legends and myths intertwine, a tale of great significance is about to unfold—the legend of the Lost Relic.",
  "Embark on an epic journey in a world steeped in legend and mystery. As the sun sets, destiny calls. \n",
];
var introTextCount = 0;

// Function to type the introductory text
function typeText() {
  var textToType = introText[introTextCount];
  textElement.innerHTML = textToType;

  if (introTextCount + 1 == introText.length) {
    cursorElement.innerHTML =
      "<p><b>Who are you in this story?</b></p>" +
      "<p><b>Barbarian (1), Hero (2) or Mage (3)</b></p>";
    showButton.style.display = "none";
    choice1.style.display = "inline-block";
    choice2.style.display = "inline-block";
    choice3.style.display = "inline-block";
  } else {
    showButton.style.display = "inline-block";
  }
}

// Start the introductory text animation
typeText();

// Function to move to the next text
function nextText() {
  textElement.innerHTML = "";
  introTextCount++;
  currentIndex = 0;
  typeText();
}

// Function to handle user's choice of character
function PickChoice(userChoice) {
  var choice = userChoice;
  pickChar(choice);
}

// Define the Character class
class Character {
  constructor(name, health, attackPower, heldItem) {
    this.name = name;
    this.health = health;
    this.attackPower = attackPower;
    this.heldItem = heldItem;
    this.inventory = []; // inventory (array)
  }

  // Function to decrease character's health
  takeDamage(amount) {
    this.health -= amount;
  }

  // Function to pick up an item and add it to the inventory
  pickUpItem(item) {
    this.inventory.push(item);
  }

  // Function to view the character's inventory
  viewInventory() {
    this.inventory.forEach((element) => {
      console.log(element);
    });
  }
}

// Define the item class
class item {
  constructor(name, type, value) {
    this.name = name;
    this.type = type;
    this.value = value;
  }
}

// Initialize variables for character and default item
var playerCharacter;
let defaultItem;
var currentLocationIndex = 1;

// Function to select a character based on user choice
function pickChar(choice) {
  switch (choice) {
    case 1:
      defaultItem = new item("Big Axe", "weapon", 40);
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
  cursorElement.innerHTML = "";
  textElement.innerHTML = "";
  textElement.innerHTML =
    "<b>You've chosen to be a <strong>" +
    playerCharacter.name +
    "</strong></b>";
  cursorElement.innerHTML =
    "<b>Your weapon of choice is a <strong>" +
    playerCharacter.heldItem.name +
    "</strong></b>";
  choice1.style.display = "none";
  choice2.style.display = "none";
  choice3.style.display = "none";
  continuebtn.style.display = "inline-block";
}

// Define different game locations
var area1 = {
  location: "Cave",
  desc: "Wet and dark. Be careful not to slip or trip.",
  enemy: "Goblin",
  locationNum: 1,
};

var area2 = {
  location: "Forest",
  desc: "Over-grown grass and bushes. This forest is covered in old trees. Watch out for those wild boars.",
  enemy: "Wild Boar",
  locationNum: 2,
};

var area3 = {
  location: "Rocky Plains",
  desc: "In the vast plains, golems take on a different form. They appear as living earth, with bodies made of fertile soil and grass.",
  enemy: "Golem",
  locationNum: 3,
};

// Define available items in the game
var availableItems = [
  { name: "Ninja Star", type: "weapon", value: 15, itemNum: 1 },
  { name: "Mace", type: "weapon", value: 45, itemNum: 2 },
  { name: "Spiked Whip", type: "weapon", value: 35, itemNum: 3 },
];

// Function to enter a game location
function enterLocation(location) {
  playAgain.style.display = "none";
  exit.style.display = "none";
  continuebtn.style.display = "none";
  continueplay.style.display = "none";
  cursorElement.innerHTML = "";
  textElement.innerHTML = "";
  console.log(location);
  textElement.innerHTML = "You are now entering the " + location.location;
  cursorElement.innerHTML =
    "A few hours into your quest you encountered a " + location.enemy + "<br/>";
  cursorElement.innerHTML += "Do you want to fight this enemy?";
  fightButton.style.display = "inline-block";
  runButton.style.display = "inline-block";
  document.getElementById("fightButton").addEventListener("click", function () {
    handleFightChoice(location);
  });

  document.getElementById("runButton").addEventListener("click", function () {
    handleRunChoice(location);
  });
}

// Function to generate a random integer for fighting outcomes
function RandomIntFight() {
  return Math.floor(Math.random() * (101 - 1)) + 1;
}

// Function to generate a random integer for item outcomes
function RandomIntItems() {
  return Math.floor(Math.random() * (4 - 1)) + 1;
}

// Function to handle the user's choice to fight an enemy
function handleFightChoice(location) {
  playAgain.style.display = "none";
  exit.style.display = "none";
  fightButton.style.display = "none";
  runButton.style.display = "none";
  if (RandomIntFight() > 40) {
    let RandomItems = RandomIntItems();
    let item = _.find(availableItems, function (item) {
      return item.itemNum === RandomItems;
    });
    cursorElement.innerHTML = "";
    textElement.innerHTML = "";
    textElement.innerHTML = "You won and slayed that " + location.enemy;
    cursorElement.innerHTML = "Weapon gained: " + item.name;
    if (!playerCharacter.inventory.includes(item)) {
      // If it doesn't exist, push it
      playerCharacter.pickUpItem(item);
    } else {
      // Item already exists, handle it as needed (e.g., show a message)
      console.log("Item already exists in the array");
    }
    // playerCharacter.pickUpItem(item);
    console.log(playerCharacter.inventory);
    if (location.locationNum == 3) {
      cursorElement.innerHTML = "";
      textElement.innerHTML = "";
      continueplay.style.display = "none";
      exit.style.display = "none";
      endGameText.innerHTML =
        "Congratulations! You've defeated the " +
        location.enemy +
        " and retrieved the Lost Relic.";
      exit.style.display = "inline-block";
    } else {
      continueplay.style.display = "inline-block";

      document
        .getElementById("continueplay")
        .addEventListener("click", function () {
          continueplay.style.display = "none";
          nextLocation(location);
        });
    }
  } else {
    textElement.innerHTML =
      "You did not survive that fight against the " + location.enemy;
    tryAgain++;
    if (tryAgain == 4) {
      cursorElement.innerHTML =
        "You died " + tryAgain + " times. You'll have to start over again.";
      setTimeout(function () {}, 2500);
    } else {
      cursorElement.innerHTML = "";
      playAgain.style.display = "inline-block";
      exit.style.display = "inline-block";
      continueplay.style.display = "none";

      document
        .getElementById("playAgain")
        .addEventListener("click", function () {
          playagain(location);
        });
    }
  }
}

// Function to handle the user's choice to run away from an enemy
function handleRunChoice(location) {
  fightButton.style.display = "none";
  runButton.style.display = "none";
  playAgain.style.display = "none";
  exit.style.display = "none";

  if (RandomIntFight() > 40) {
    textElement.innerHTML = "";
    cursorElement.innerHTML = "";
    textElement.innerHTML =
      "You were not able to run away from the " + location.enemy + " and died.";
    tryAgain++;
    if (tryAgain == 4) {
      cursorElement.innerHTML =
        "You died " + tryAgain + " times. You'll have to start over again.";
      setTimeout(function () {}, 2500);
    } else {
      playAgain.style.display = "inline-block";
      exit.style.display = "inline-block";
      continueplay.style.display = "none";

      document
        .getElementById("playAgain")
        .addEventListener("click", function () {
          playagain(location);
        });
    }
  } else {
    textElement.innerHTML = "You got away from the " + location.enemy + ".";
    cursorElement.innerHTML = "";
    continueplay.style.display = "inline-block";
    document
      .getElementById("continueplay")
      .addEventListener("click", function () {
        continueplay.style.display = "none";
        nextLocation(location);
      });
  }
}

// Event listener for exiting the game
document.getElementById("exit").addEventListener("click", function () {
  exitGame();
});

// Function to restart the game after a defeat
function playagain(location) {
  enterLocation(location);
}

// Function to exit the game
function exitGame() {
  playAgain.style.display = "none";
  exit.style.display = "none";
  textElement.innerHTML = "Thanks for playing.";
}

// Function to move to the next location in the game
function nextLocation(location) {
  textElement.innerHTML = "";
  cursorElement.innerHTML = "";
  textElement.innerHTML = "You are now walking to the next location.";
  setTimeout(function () {
    if (location.locationNum == 1) {
      enterLocation(area2);
    } else if (location.locationNum == 2) {
      enterLocation(area3);
    }
  }, 2500);
}

// Function to toggle the display of the character's inventory
function toggleDisplay() {
  var inventoryList = document.getElementById("inventoryList");
  if (inventoryList.style.display === "none") {
    inventoryList.style.display = "block";
    displayInventory();
  } else {
    inventoryList.style.display = "none";
  }
}

// Function to display the character's inventory
function displayInventory() {
  inventoryList.innerHTML = "<h4>Inventory:</h4>";

  playerCharacter.inventory.forEach((item) => {
    const itemElement = document.createElement("p");
    itemElement.innerHTML = item.name;
    inventoryList.appendChild(itemElement);
  });
}
