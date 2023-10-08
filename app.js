var availableItems = [
  { name: "Ninja Star", type: "weapon", value: 15, itemNum: 1 },
  { name: "Mace", type: "weapon", value: 45, itemNum: 2 },
  { name: "Spiked Whip", type: "weapon", value: 35, itemNum: 3 },
];

function enterLocation(location) {
  console.log("You are now entering the " + location.location);
  console.log(
    "A few hours into your quest you encountered a " + location.enemy
  );
  fightEnemy(location.enemy);
}

function playGame() {
  pickChar();
}

// enterLocation(location1);

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

function pickLocation(num) {
  let location = _.find(locations, function (item) {
    return item.locationNum == num;
  });

  return location;
}

var location = pickLocation(currentLocationIndex);
