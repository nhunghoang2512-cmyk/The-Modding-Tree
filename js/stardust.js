addLayer("s", {
    name: "stardust", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "✨", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#a6a377",
    requires: new Decimal(1e12), // Can be a function that takes requirement increases into account
    resource: "stardust", // Name of prestige currency
    baseResource: "atoms", // Name of resource prestige is based on
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
		if (hasUpgrade("s", 14)) mult = mult.times(upgradeEffect("s", 14))
		if (hasMilestone("b", 2)) mult = mult.times(2)
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
            description: "x5 atoms.",
            cost() { return new Decimal(1) },
            unlocked() { return true },
		},
        12: {
			title: "2",
            description: "x25 atoms.",
            cost() { return new Decimal(5) },
            unlocked() { return hasUpgrade("s", 11) },
		},
        13: {
			title: "3",
            description: "stardust boost atoms gain.",
            cost() { return new Decimal(50) },
		    effect() {
			exp = 0.5
        	return player[this.layer].points.add(1).pow(exp)
    },
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            tooltip() {
                return "Formula: SD ^" + exp
            },
            unlocked() { return hasUpgrade("s", 12) },
		},
        14: {
			title: "4",
            description: "atoms boost stardust gain.",
            cost() { return new Decimal(200) },
		    effect() {
			exp = 0.1
        	return player.points.add(1).pow(exp)
    },
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            tooltip() {
                return "Formula: Atoms ^" + exp
            },
            unlocked() { return hasUpgrade("s", 13) },
		},
        15: {
			title: "5",
            description: "x10 atoms per bigbang.",
            cost() { return new Decimal(30000) },
		    effect() {
			exp = new Decimal(10)
        	return exp.pow(player.b.points)
    },
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() { return hasUpgrade("s", 14) },
		},
        21: {
			title: "6",
            description: "stronger inflation.",
            cost() { return new Decimal(3e7) },
            unlocked() { return hasUpgrade("s", 15) },
		},
        22: {
			title: "7",
            description: "^1.1 atoms.",
            cost() { return new Decimal(5e9) },
            unlocked() { return hasUpgrade("s", 21) },
		},
	},
    buyables: {
    	11: {
    		title: "Buyable 1",
     		cost(x) {
				let base = new Decimal(5)
				let exp = new Decimal(x)
				let cost = new Decimal(1e10)
				let mult = base.pow(exp)
				cost = cost.times(mult)
				return cost},//x is the amount of buyables you have
        	canAfford() { return player.s.points.gte(this.cost())},
        	buy() {
           		player.s.points = player.s.points.sub(this.cost())
           		setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        	},
        	display() {return `Bought: ${format(getBuyableAmount(this.layer, this.id))}\nCost: ${format(this.cost())}\nEffect: ${format(this.effect())}x atoms gain`},
        	unlocked(){return hasMilestone("b", 2)},
        	effect(x) {
        		let base = new Decimal(2)
				let eff = base.pow(x)
        		return eff} //x is the amount of buyables you have
    	},
	},
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for stardust", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasMilestone('b', 1)},
})
