addLayer("p", {
    name: "plus", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "+", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffffff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "plus", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent() {
		let exp = new Decimal(0.9)
		return exp
	},
	base() {
		let base = 10
		return base
	},
    eff() {
        let eff = (player.p.points.add(1).log10().add(1)).pow(2)
        return eff
    },
    effectDescription() {
    return `Base Points Gain ${format(layers.p.eff())}`
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
            description: "x2 point gain.",
            cost() { return new Decimal(1) },
            unlocked() { return true },
		},
        12: {
			title: "2",
            description: "point boost itself(boost point gain not base btw).",
            cost() { return new Decimal(2) },
		    effect() {
			base = 3
			let eff = Decimal.log(player.points.add(1), base).add(1)
        	return eff
    },
			effectDisplay() {
			return format(upgradeEffect(this.layer, this.id))+"x"
			},

			tooltip() {
			return "(log<sub>3</sub>(points+1))"
			},
            unlocked() { return hasUpgrade('p', 11) },
		},
	},
    buyables: {
	},
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for stardust", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
})
