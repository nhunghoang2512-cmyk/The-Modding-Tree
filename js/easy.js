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
		let exp = new Decimal(0.1)
		return exp
	},
    passiveGeneration() {
		if (hasMilestone('m', 2)) return 1
        return 0
    },
    gainMult() {
		let mult = new Decimal(1)
		if (hasUpgrade('ea', 13)) mult = mult.times(2)
		if (hasMilestone("m", 1)) mult = mult.times(3)
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
        1: {
            requirementDescription: "100 easy point",
            effectDescription: "unlock a new layer.",
            done() { return player.ea.points.gte(100) }
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
            cost() { return new Decimal(10) },
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
        11: {
            title: "Easy Buyable 1",
            unlocked() { return hasMilestone("m", 2) },
            cost(x) {
                exp = 5
				if (hasChallenge('m', 11)) exp = 4
				amtdiv = 1
				if (hasChallenge('m', 11)) amtdiv = 1.5
				amt = x.div(amtdiv)
                return new Decimal(25000).mul(Decimal.pow(exp, Decimal.pow(amt, 1.1)))
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) +
           		" easy point<br>Bought: " +
           		format(getBuyableAmount(this.layer, this.id)) +
           		"<br>Effect: Boost effortless and skill gain by x" +
           		format(buyableEffect(this.layer, this.id))
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                base1 = new Decimal(2)
				base1 = base1.times(buyableEffect('ea', 12))
                base2 = x
                expo = new Decimal(1.005)
                eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
		},
        12: {
            title: "Easy Buyable 2",
            unlocked() { return hasChallenge("m", 12) },
            cost(x) {
                exp = 5
				amtdiv = 1
				amt = x.div(amtdiv)
                return new Decimal(25000).mul(Decimal.pow(exp, Decimal.pow(amt, 4)))
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) +
           		" easy point<br>Bought: " +
           		format(getBuyableAmount(this.layer, this.id)) +
           		"<br>Effect: Boost EAB1's base by x" +
           		format(buyableEffect(this.layer, this.id))
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                base1 = new Decimal(1.2)
                base2 = x
                expo = new Decimal(1.005)
                eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
		},
	},
	branches:['e'],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for easy", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.e.total.gte(500) || player.ea.total.gte(1) || player.m.total.gte(1) || player.ea.unlocked},
})
