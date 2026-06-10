addLayer("m", {
    name: "medium", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#FFFF00",
    requires: new Decimal(1e10), // Can be a function that takes requirement increases into account
    resource: "medium point", // Name of prestige currency
    baseResource: "effortless point", // Name of resource prestige is based on
    baseAmount() {return player.e.points}, // Get the current amount of baseResource
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
    eff() {
		let pow = 1.5
        let eff = player.m.points.add(1).pow(pow)
        return eff
    },
    effectDescription() {
    	return `Base Points Gain ${format(layers.m.eff())}`
	},
    milestones: {
	},
    upgrades: {
	},
    buyables: {
	},
	branches:['e'],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for medium", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasMilestone("ea", 1) || player.m.total.gte(1) || player.m.unlocked},
})
