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
		let exp = new Decimal(0.01)
		return exp
	},
    passiveGeneration() {
        return 0
    },
    gainMult() {
		let mult = new Decimal(1)
		if (hasMilestone('m', 1)) mult = mult.times(2)
		if (hasUpgrade('m', 11)) mult = mult.times(upgradeEffect("m", 11))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
		let exp = new Decimal(1)
		if (hasMilestone('m', 7)) exp = exp.times(1.25)
        return exp
    },
    eff() {
		let pow = 1.5
        let eff = player.m.points.add(1).pow(pow)
        return eff
    },
    effectDescription() {
    	return `boosting skill by ${format(layers.m.eff())}`
	},
    milestones: {
        0: {
            requirementDescription: "1 medium point",
            effectDescription: "unlock a new buyable and autobuy the first one.",
            done() { return player.m.points.gte(1) }
        },
        1: {
            requirementDescription: "10 medium point",
            effectDescription: "EF buyable no longer cost, x100 skill, x10 EF, x3 EA, x2 M gain.",
            done() { return player.m.points.gte(10) }
        },
        2: {
            requirementDescription: "15 medium point",
            effectDescription: "gain 100% EA per second, unlock a buyable.",
            done() { return player.m.points.gte(15) }
        },
        3: {
            requirementDescription: "25 medium point",
            effectDescription: "unlock a challenge.",
            done() { return player.m.points.gte(25) }
        },
        4: {
            requirementDescription: "100 medium point",
            effectDescription: "unlock another challenge, keep EF upgrades on reset.",
            done() { return player.m.points.gte(100) }
        },
        5: {
            requirementDescription: "500 medium point",
            effectDescription: "unlock a new layer.",
            done() { return player.m.points.gte(500) }
        },
        6: {
            requirementDescription: "5000 medium point",
            effectDescription: "autobuy EAB1, 2, ^1.05 points.",
            done() { return player.m.points.gte(5000) }
        },
        7: {
            requirementDescription: "25000 medium point",
            effectDescription: "^1.25 EA, M.",
            done() { return player.m.points.gte(25000) }
        },
        8: {
            requirementDescription: "500000 medium point",
            effectDescription: "unlock another challenges.",
            done() { return player.m.points.gte(500000) }
        },
	},
    upgrades: {
        11: {
			title: "1",
            description: "medium point boost itself.",
            cost() { return new Decimal(500) },
		    effect() {
			exp = 0.25
			let eff = player[this.layer].points.add(1).pow(exp)
        	return eff
    		},
			effectDisplay() {
			return format(upgradeEffect(this.layer, this.id))+"x"
			},
			tooltip() {
			return "medium points^"+exp
			},
            unlocked() { return hasUpgrade("h", 21) },
		},
	},
    buyables: {
	},
    challenges: {
    	11: {
        	name: "Medium Challenge 1",
        	challengeDescription: "^0.3 skill gain.",
        	goalDescription: "Reach 1e7 points.",
        	rewardDescription: "all buyable cost got nerfed.",
        	canComplete: function() {return player.points.gte("1e7")},
        	unlocked(){return hasMilestone("m",3)}
		},
    	12: {
        	name: "Medium Challenge 2",
        	challengeDescription: "buyable cost scales significantly faster.",
        	goalDescription: "Reach 1e28 points.",
        	rewardDescription: "unlock a new buyable, autobuy EFB2.",
        	canComplete: function() {return player.points.gte("1e28")},
        	unlocked(){return hasMilestone("m",4)}
		},
    	21: {
        	name: "Medium Challenge 2",
        	challengeDescription: "^0.8 point, ^0.6 EF.",
        	goalDescription: "Reach EF points.",
        	rewardDescription: "buff 1 eff.",
        	canComplete: function() {return player.e.points.gte("1e123")},
        	unlocked(){return hasMilestone("m",8)}
		},
    },
	branches:['e'],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for medium", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasMilestone("ea", 1) || player.m.total.gte(1) || player.m.unlocked},
})
