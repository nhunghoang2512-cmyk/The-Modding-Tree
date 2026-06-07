let modInfo = {
	name: "The ??? Tree",
	author: "nobody",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
let base = new Decimal(layers.a.eff()) //addition
base = base.times(layers.m.eff()) //multiplication
if (hasUpgrade("m", 13)) base = base.times(100)
base = base.pow(layers.e.eff()) //exponentiation
let gain = base
if (hasUpgrade("a", 12)) gain = gain.times(upgradeEffect("a", 12))
if (hasUpgrade("a", 14)) gain = gain.times(5)
if (hasUpgrade("a", 21)) gain = gain.times(upgradeEffect("a", 21))
if (hasUpgrade("a", 23)) gain = gain.pow(1.25)
if (hasUpgrade("a", 24)) gain = gain.times(100)
if (hasMilestone("m", 0)) gain = gain.times(5)
if (hasUpgrade("a", 31)) gain = gain.times(3)
if (hasMilestone("m", 2)) gain = gain.times(10)
if (hasUpgrade("a", 42)) gain = gain.pow(1.1)
if (hasUpgrade("m", 12)) gain = gain.times(upgradeEffect("m", 12))
if (hasMilestone('e', 1)) gain = gain.times(10000)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
