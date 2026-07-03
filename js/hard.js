addLayer("h", {
    name: "hard", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#FE7C00",
	tabFormat: {
    	"Main": {
        	content: [
            	"main-display",
            	"prestige-button",
            	"resource-display",
            	"blank",
            	"milestones",
        	],
    	},
    	"ToKTS": {
        	content: [
            	["upgrade-tree", [[11], [21]]],
        	],
    	},
	},
    requires: new Decimal(500), // Can be a function that takes requirement increases into account
    resource: "hard point", // Name of prestige currency
    baseResource: "medium point", // Name of resource prestige is based on
    baseAmount() {return player.m.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent() {
		let exp = new Decimal(0.01)
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
    eff() {
		let pow = 3
		if (hasUpgrade('h', 21)) pow = 4
        let eff = player.h.points.add(2).pow(pow)
        return eff
    },
    effectDescription() {
    	return `boosting skill, ef by ${format(layers.h.eff())}`
	},
    milestones: {
	},
    upgrades: {
        11: {
			title: "f1",
            description: "gain 100,000% EF per second, keep EF upgrades on reset, autobuy EFB1, 2.",
            cost() { return new Decimal(1) },
            unlocked() { return true },
		},
        21: {
			title: "f2",
            description: "EFB1, 2 no longer cost, buff Hard's effect.",
            cost() { return new Decimal(5) },
      		branches: [11],
            unlocked() { return hasUpgrade('h', 11) },
		},
	},
    buyables: {
	},
    challenges: {
    },
	branches:['ea', 'm'],
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "h", description: "H: Reset for hard", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasMilestone("m", 5) || player.h.total.gte(1) || player.h.unlocked},
})
