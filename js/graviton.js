addLayer("g", {
    name: "graviton", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#a6a377",
    requires: new Decimal(1e9), // Can be a function that takes requirement increases into account
    resource: "graviton", // Name of prestige currency
    baseResource: "planck length", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent() {
		let exp = new Decimal(0.5)
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
        0: {
            requirementDescription: "10 pl",
            effectDescription: "x1000 pl.",
            done() { return player.points.gte(10) }
        },
        1: {
            requirementDescription: "10,000 pl",
            effectDescription: "x1000 pl.",
            done() { return player.points.gte(10000) }
        },
        2: {
            requirementDescription: "10,000,000 pl",
            effectDescription: "x1000 pl.",
            done() { return player.points.gte(10e6) }
        },
	},
    upgrades: {
	},
    buyables: {
	},
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g", description: "G: Reset for graviton", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
})
