addLayer("e", {
    name: "effortless", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#00CE00",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "effortless point", // Name of prestige currency
    baseResource: "skill", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent() {
		let exp = new Decimal(0.5)
		return exp
	},
    passiveGeneration() {
		if (hasUpgrades('h', 11)) return 1000
		if (hasMilestone('ea', 0)) return 1
        return 0
    },
	automate() {
    	if (hasMilestone('m', 0) || hasUpgrades('h', 11)) {
        	layers.e.buyables[11].buyMax()
    	}
    	if (hasChallenge('m', 12) || hasUpgrades('h', 11)) {
        	layers.e.buyables[12].buyMax()
    	}
	},
    gainMult() {
		let mult = new Decimal(1)
		if (hasUpgrade("e", 14)) mult = mult.times(2)
		if (hasUpgrade("ea", 13)) mult = mult.times(3)
		if (hasMilestone("m", 1)) mult = mult.times(10)
		mult = mult.times(buyableEffect('ea', 11))
		mult = mult.times(layers.h.eff())
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
            description: "x5 skill gain.",
            cost() { return new Decimal(1) },
            unlocked() { return true },
		},
        12: {
			title: "2",
            description: "Effortless point boost skill gain.",
            cost() { return new Decimal(5) },
		    effect() {
			exp = 0.5
			if (hasUpgrade('ea', 12)) exp = 0.6
			let eff = player[this.layer].points.add(1).pow(exp)
        	return eff
    		},
			effectDisplay() {
			return format(upgradeEffect(this.layer, this.id))+"x"
			},
			tooltip() {
			return "effortless points^"+exp
			},
            unlocked() { return hasUpgrade("e", 11) },
		},
        13: {
			title: "3",
            description: "Unlock a buyable.",
            cost() { return new Decimal(100) },
            unlocked() { return hasUpgrade("e", 12) },
		},
        14: {
			title: "4",
            description: "x2 skill and EF gain.",
            cost() { return new Decimal(200) },
            unlocked() { return hasUpgrade("e", 13) },
		},
	},
    buyables: {
        11: {
            title: "Effortless Buyable 1",
            unlocked() { return hasUpgrade("e", 13) },
            cost(x) {
                exp = 5
				if (inChallenge('m', 12)) exp = 15
				if (hasChallenge('m', 11)) exp = 4
				amtdiv = 1
				if (hasChallenge('m', 11)) amtdiv = 1.5
				if (inChallenge('m', 12)) amtdiv = 0.5
				amt = x.div(amtdiv)
                return new Decimal(50).mul(Decimal.pow(exp, Decimal.pow(amt, 1.05)))
            },
			buyMax() {
    			while (this.canAfford()) {
        			this.buy()
    			}
			},
			display() {
    			return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) +
           			" effortless point<br>Bought: " +
           			format(getBuyableAmount(this.layer, this.id)) +
           			"<br>Effect: Boost skill gain by x" +
           			format(buyableEffect(this.layer, this.id)) +
           			(buyableEffect(this.layer, this.id).gte("1e100")
               			? " (supercapped)"
               			: buyableEffect(this.layer, this.id).gte("1e25")
	               		? " (softcapped)"
               			: "")
			},
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
				if (hasMilestone('m', 1)) cost = new Decimal(0)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                base1 = new Decimal(2)
				base1 = base1.times(buyableEffect('e', 12))
                base2 = x
                expo = new Decimal(1.005)
                eff = base1.pow(Decimal.pow(base2, expo))
				eff = softcap(eff, new Decimal("1e25"), 0.5)
				eff = softcap(eff, new Decimal("1e100"), 0.25)
                return eff
            },
		},
        12: {
            title: "Effortless Buyable 2",
            unlocked() { return hasMilestone("m", 0) },
            cost(x) {
                exp = 5
				if (hasChallenge('m', 11)) exp = 4
				if (inChallenge('m', 12)) exp = 15
				amtdiv = 1
				if (hasChallenge('m', 11)) amtdiv = 1.5
				if (inChallenge('m', 12)) amtdiv = 0.5
				amt = x.div(amtdiv)
                return new Decimal(1e10).mul(Decimal.pow(exp, Decimal.pow(amt, 3)))
            },
			buyMax() {
    			while (this.canAfford()) {
        			this.buy()
    			}
			},
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) +
           		" effortless point<br>Bought: " +
           		format(getBuyableAmount(this.layer, this.id)) +
           		"<br>Effect: Boost EFB1's base by x" +
           		format(buyableEffect(this.layer, this.id)) +
           		(buyableEffect(this.layer, this.id).gte(5) ? " (softcapped)" : "")
			},
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
				if (hasMilestone('m', 1)) cost = new Decimal(0)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                base1 = new Decimal(1.2)
                base2 = x
                expo = new Decimal(1.005)
                eff = base1.pow(Decimal.pow(base2, expo))
				eff = softcap(eff, new Decimal("5"), 0.5)
                return eff
            },
		},
	},
    row: 0, // Row the layer is in on the tree (0 is the first row)
  doReset(resettingLayer) {
    let keep = [];
    if (hasMilestone("m", 4) && resettingLayer == "ea", "m") keep.push("upgrades");
    if (layers[resettingLayer].row > this.row) layerDataReset("e", keep);
  },
    hotkeys: [
        {key: "e", description: "E: Reset for effortless", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
})
