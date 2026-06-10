addLayer("ea", {
    name: "easy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Ea", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#76F447",
    requires: new Decimal(2000), // Can be a function that takes requirement increases into account
    resource: "easy point", // Name of prestige currency
    baseResource: "effortless point", // Name of resource prestige is based on
    baseAmount() {return player.e.points}, // Get the current amount of baseResource
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
		if (hasUpgrade('ea', 13)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
		let exp = new Decimal(1)
        return exp
    },
    milestones: {
        0: {
            requirementDescription: "50 easy point",
            effectDescription: "gain 100% EF per second.",
            done() { return player.ea.points.gte(50) }
        },
	},
    upgrades: {
        11: {
			title: "1",
            description: "x5 skill gain.",
            cost() { return new Decimal(1) },
            unlocked() { return true },
		},
        12: {
			title: "2",
            description: "2e use a better formula.",
            cost() { return new Decimal(2) },
            unlocked() { return hasUpgrade('ea', 11) },
		},
        13: {
			title: "3",
            description: "x10 skill, x3 EF, x2 EA gain.",
            cost() { return new Decimal(2) },
            unlocked() { return hasUpgrade('ea', 12) },
		},
        14: {
			title: "4",
            description: "Easy point boost skill gain.",
            cost() { return new Decimal(500) },
		    effect() {
			exp = 0.5
			let eff = player[this.layer].points.add(1).pow(exp)
        	return eff
    		},
			effectDisplay() {
			return format(upgradeEffect(this.layer, this.id))+"x"
			},
			tooltip() {
			return "addition points^"+exp
			},
            unlocked() { return hasUpgrade("ea", 13) },
		},
	},
    buyables: {
	},
	branches:['e'],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for easy", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.e.total.gte(500) || player.ea.total.gte(1)},
})
