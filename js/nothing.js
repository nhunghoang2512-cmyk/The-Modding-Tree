addLayer("n", {
    name: "nothing", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "N", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "white",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "nothing", // Name of prestige currency
    baseResource: "planck length", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent() {
		let exp = new Decimal(0.25)
		return exp
	},
    passiveGeneration() {
        return 0
    },
    gainMult() {
		let mult = new Decimal(1)
		if (hasUpgrade("n", 14)) mult = mult.times(upgradeEffect('n', 14))
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
            description: "x2 pl gain.",
            cost() { return new Decimal(1) },
            unlocked() { return true },
		},
        12: {
			title: "2",
            description: "nothing boost pl gain.",
            cost() { return new Decimal(3) },
		    effect() {
				exp = 0.5
				let eff = player[this.layer].points.add(1).pow(exp)
        		return eff
    		},
			effectDisplay() {
			return format(upgradeEffect(this.layer, this.id))+"x"
			},
			tooltip() {
			return "nothing ^ "+ exp
			},
            unlocked() { return hasUpgrade('n', 11) },
		},
        13: {
			title: "3",
            description: "x5 pl gain.",
            cost() { return new Decimal(10) },
            unlocked() { return hasUpgrade('n', 12) },
		},
        14: {
			title: "4",
            description: "pl boost nothing gain.",
            cost() { return new Decimal(75) },
		    effect() {
				exp = 0.15
				let eff = player.points.add(1).pow(exp)
        		return eff
    		},
			effectDisplay() {
			return format(upgradeEffect(this.layer, this.id))+"x"
			},
			tooltip() {
			return "pl ^ "+ exp
			},
            unlocked() { return hasUpgrade('n', 13) },
		},
        21: {
			title: "5",
            description: "pl boost itself.",
            cost() { return new Decimal(150) },
		    effect() {
				exp = 0.25
				let eff = player.points.add(1).pow(exp)
        		return eff
    		},
			effectDisplay() {
			return format(upgradeEffect(this.layer, this.id))+"x"
			},
			tooltip() {
			return "pl ^ "+ exp
			},
            unlocked() { return hasUpgrade('n', 14) },
		},
	},
    buyables: {
	},
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "n", description: "N: Reset for nothing", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
})
