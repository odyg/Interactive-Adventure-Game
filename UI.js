const textElement = document.getElementById("typed-text");
const cursorElement = document.getElementById("cursor");
const showButton = document.getElementById("showButton");
let currentIndex = 0;

var introText = [
  "The world stretches out before you, a vast tapestry of ancient lands and untold mysteries. In this realm, where legends and myths intertwine, a tale of great significance is about to unfold—the legend of the Lost Relic.",
  "You find yourself standing at the precipice of a grand adventure, one that will test your courage, wit, and determination. As the sun dips below the horizon, casting long shadows across the land, destiny beckons you forth.",
  "The air is thick with anticipation, and the very ground beneath your feet seems to tremble with the weight of the unknown. Your journey will lead you through a land of wonders and perils, where choices made and battles fought will shape your destiny.",
  "But who are you in this story? What path will you tread? The answers lie in your choice of character—a choice that will define your journey. Select your character wisely, for their abilities will be your greatest assets on this epic quest.",
  "Will you take up the mantle of the Barbarian, whose strength is unmatched, wielding a mighty axe that cleaves through adversity?",
  "Perhaps you'll become the Hero, a beacon of hope, skilled with a sharp sword and the unwavering resolve to protect the innocent?",
  "Or will you embrace the arcane arts as the Mage, capable of harnessing healing magic and wielding a mystical staff that hums with ancient power? \n",
];
var introTextCount = 0;
function typeText() {
  var textToType = introText[introTextCount];
  console.log(textToType);
  if (currentIndex < textToType.length) {
    textElement.innerHTML += textToType.charAt(currentIndex);
    currentIndex++;
    setTimeout(typeText, 20); // Adjust typing speed (milliseconds)
  } else if (introTextCount + 1 == introText.length) {
    // Text typing animation is complete, show the button
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

typeText(); // Start the typing animation

function nextText() {
  textElement.innerHTML = "";
  introTextCount++;
  currentIndex = 0;
  typeText();
}

function PickChoice(userChoice) {
  var choice = userChoice;
  pickChar(choice);
}

// Call the PickChoice function to set up the event listeners
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
  enterLocation(location); // Close the interface to exit the script
}

let locations = [
  {
    location: "Cave",
    desc: "Wet and dark. Be careful not to slip or trip.",
    enemy: "Goblin",
    locationNum: 1,
  },
  {
    location: "Forest",
    desc: "Over-grown grass and bushes. This forest is covered in old trees. Watch out for those wild boars.",
    enemy: "Wild Boar",
    locationNum: 2,
  },
  {
    location: "Rocky Plains",
    desc: "In the vast plains, golems take on a different form. They appear as living earth, with bodies made of fertile soil and grass.",
    enemy: "Golem",
    locationNum: 3,
  },
];

var availableItems = [
  { name: "Ninja Star", type: "weapon", value: 15, itemNum: 1 },
  { name: "Mace", type: "weapon", value: 45, itemNum: 2 },
  { name: "Spiked Whip", type: "weapon", value: 35, itemNum: 3 },
];

function enterLocation(location) {
  cursorElement.innerHTML = "";
  textElement.innerHTML = "";
  cursorElement.innerHTML = "You are now entering the " + location.location;
  textElement.innerHTML =
    "A few hours into your quest you encountered a " + location.enemy;
  //fightEnemy(location.enemy);
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

        if (currentLocationIndex === 3) {
          console.log(
            "Congratulations! You've saved the village from the Golem."
          );
          console.log("Thanks for playing.");
          rl.close();
        } else {
          console.log("Weapon gained: " + item.name);
          playerCharacter.pickUpItem(item);
          moveLocation();
        }
      } else {
        console.log("You did not survive that fight against the " + enemy);
        playagain();
      }
    } else {
      if (RandomIntFight() < 25) {
        console.log(
          "You were not able to run away from the " + enemy + " and died."
        );
        playagain();
      } else {
        console.log("You got away from the " + enemy + ".");
        if (currentLocationIndex === 3) {
          enterLocation(location);
        } else {
          moveLocation();
        }
      }
    }
  });
}
var tryAgain = 1;
function playagain() {
  rl.question("Would you like to play again?: (Y/N)", (choice1) => {
    let ans = choice1.toUpperCase();
    if (ans === "Y") {
      tryAgain++;
      if (tryAgain > 3) {
        currentLocationIndex = 1;
        location = pickLocation(currentLocationIndex);
        console.log(
          "You've died more than 3 times in this level. Best for you to start over at the " +
            location.location
        );
        enterLocation(location);
      } else {
        enterLocation(location);
      }
      currentLocationIndex = 0;
      enterLocation(location);
    } else {
      console.log("Thanks for playing.");
      rl.close();
    }
  });
}

function moveLocation() {
  rl.question("Would you like to go to the next level?: (Y/N)", (choice2) => {
    let ans = choice2.toUpperCase();
    if (ans === "Y") {
      // var nextlocation = pickLocation(currentLocationIndex + 1);
      currentLocationIndex++;
      location = pickLocation(currentLocationIndex);
      enterLocation(location);
      // enterLocation(location);
    } else {
      // currentLocationIndex = 0;
      enterLocation(location);
    }
  });
}

function pickLocation(num) {
  let location = _.find(locations, function (item) {
    return item.locationNum == num;
  });

  return location;
}

var location = pickLocation(currentLocationIndex);
