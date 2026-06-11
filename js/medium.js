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
	},
    upgrades: {
	},
    buyables: {
	},
    challenges: {
    	11: {
        	name: "Medium Challenge 1",
        	challengeDescription: "^0.3 skill gain.",
        	goalDescription: "Reach points.",
        	rewardDescription: "all buyable cost got nerfed.",
        	canComplete: function() {return player.points.gte("1e215")},
        	unlocked(){return hasMilestone("m",3)}
		},
    },
	branches:['e'],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for medium", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasMilestone("ea", 1) || player.m.total.gte(1) || player.m.unlocked},
})
