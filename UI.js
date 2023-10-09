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
  "Or will you embrace the arcane arts as the Mage, capable of harnessing healing magic and wielding a mystical staff that hums with ancient power?",
];
var introTextCount = 0;
function typeText() {
  var textToType = introText[introTextCount];
  console.log(textToType);
  if (currentIndex < textToType.length) {
    textElement.textContent += textToType.charAt(currentIndex);
    currentIndex++;
    setTimeout(typeText, 20); // Adjust typing speed (milliseconds)
  } else {
    // Text typing animation is complete, show the button
    showButton.style.display = "inline-block";
  }
}

typeText(); // Start the typing animation

function nextText() {
  textElement.textContent = "";
  introTextCount++;
  currentIndex = 0;
  typeText();
}
