addLayer("g", {
    name: "graviton", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "grey",
	tabFormat: [
    	"main-display",
    	"prestige-button",
    	"milestones",
    	"buyables",
    	"upgrades",
    	"challenges",
    	["raw-html", "<img src='https://raw.githubusercontent.com/nhunghoang2512-cmyk/The-Modding-Tree/mine/Screenshot%202026-05-31%20220428.png' width='200'>"],
	],		
    requires: new Decimal(1e9), // Can be a function that takes requirement increases into account
    resource: "graviton", // Name of prestige currency
    baseResource: "planck length", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent() {
		  let exp = new Decimal(0.1)
		  return exp
	},
    passiveGeneration() {
        return 0
    },
    gainMult() {
		  let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
		  let exp = new Decimal(1)
        return exp
    },
    milestones: {
	},
    upgrades: {
        11: {
			title: "1",
            description: "x6 pl gain.",
            cost() { return new Decimal(1) },
            unlocked() { return true },
		},
        12: {
			title: "2",
            description: "new upgrades😜.",
            cost() { return new Decimal(3) },
            unlocked() { return hasUpgrade('g', 11) },
		},
	},
    buyables: {
	},
	branches:'n',
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g", description: "G: Reset for graviton", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade('n', 24) || player.n.unlocked || player['n'].points.gte(1)},
})
