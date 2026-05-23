addLayer("a", {
    name: "addition", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "+", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "addition points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() {
    	let mult = new Decimal(1)
		if (hasUpgrade('a', 13)) mult = mult.times(upgradeEffect('a', 13))
		if (hasUpgrade('a', 14)) mult = mult.times(5)
		if (hasUpgrade('a', 22)) mult = mult.times(upgradeEffect('a', 22))
		if (hasUpgrade('a', 24)) mult = mult.times(10)
		if (hasMilestone('m', 0)) mult = mult.times(2)
		if (hasUpgrade('a', 31)) mult = mult.times(3)
		if (hasMilestone('m', 2)) mult = mult.times(5)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    eff() {
        let eff = player.a.points.add(1).log10().add(1)
	    if(hasUpgrade("a",11)) eff = eff.pow(2)
		eff = softcap(eff, new Decimal("10"), 0.25)
        return eff
    },
    effectDescription() {
    return `Base Points Gain ${format(layers.a.eff())}${
        layers.a.eff().gte(10) ? " (softcapped)" : ""
    }`
},
    upgrades: {
        11: {
			title: "1",
            description: "square point gain.",
            cost() { return new Decimal(5) },
            unlocked() { return true },
		},
        12: {
			title: "2",
            description: "addition point boost point gain.",
            cost() { return new Decimal(15) },
		    effect() {
			exp = 0.5
	   		if(hasUpgrade("a",32)) exp = 0.6
        	return player[this.layer].points.add(1).pow(exp)
    },
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            tooltip() {
                return "Formula: addition points^" + exp
            },
            unlocked() { return hasUpgrade("a", 11) },
		},
        13: {
			title: "3",
            description: "point boost addition point.",
            cost() { return new Decimal(50) },
		    effect() {
			exp = 0.15
        	return player.points.add(1).pow(exp)
    },
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            tooltip() {
                return "Formula: points^" + exp
            },
            unlocked() { return hasUpgrade("a", 12) },
		},
        14: {
			title: "4",
            description: "Boost points and addition point by 5x.",
            cost() { return new Decimal(100) },
            unlocked() { return hasUpgrade('a', 13) },
		},
        21: {
			title: "5",
            description: "point boost itself.",
            cost() { return new Decimal(2500) },
		    effect() {
			exp = 0.25
        	return player.points.add(1).pow(exp)
    },
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            tooltip() {
                return "Formula: points^" + exp
            },
            unlocked() { return hasUpgrade('a', 14) },
		},
        22: {
			title: "6",
            description: "addition point boost itself.",
            cost() { return new Decimal(5000) },
		    effect() {
			exp = 0.25
        	return player[this.layer].points.add(1).pow(exp)
    },
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            tooltip() {
                return "Formula: addition points^" + exp
            },
            unlocked() { return hasUpgrade('a', 21) },
		},
        23: {
			title: "7",
            description: "^1.25 point.",
            cost() { return new Decimal(250000) },
            unlocked() { return hasUpgrade('a', 22) },
		},
        24: {
			title: "8",
            description: "boost point by 100x, addition point by 10x and unlock a new layer.",
            cost() { return new Decimal(1e7) },
            unlocked() { return hasUpgrade('a', 23) },
		},
        31: {
			title: "9",
            description: "boost point and addition point by 3x.",
            cost() { return new Decimal(2.5e12) },
            unlocked() { return hasMilestone('m', 1) && hasUpgrade('a', 24) },
		},
        32: {
			title: "10",
            description: "2 use a better formula.",
            cost() { return new Decimal(1e14) },
            unlocked() { return hasUpgrade('a', 31) },
		},
	},
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for addition points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})

addLayer("m", {
    name: "multiplication", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "x", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FF0000",
    requires: new Decimal(1e18), // Can be a function that takes requirement increases into account
    resource: "multiplication points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.01, // Prestige currency exponent
    gainMult() {
    	let mult = new Decimal(1)
		if (hasUpgrade('m', 11)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    eff() {
        let eff = player.m.points.add(1).pow(0.3)
		if (hasUpgrade('m', 11)) eff = eff.pow(3)
        return eff
    },
    effectDescription() {
    return `Boost Base Points Gain by ${format(layers.m.eff())}${
        layers.m.eff().gte(1e1000) ? " (softcapped)" : ""
    }`
},
    milestones:{
        0: {
            requirementDescription: "1 multiplication point",
            effectDescription: "x5 point, x2 addition point gain.",
            done() { return player.m.points.gte(1) }
        },
        1: {
            requirementDescription: "3 multiplication point",
            effectDescription: "unlock new upgrades.",
            unlocked() { return hasMilestone('m', 0) },
            done() { return player.m.points.gte(3) }
        },
        2: {
            requirementDescription: "10 multiplication point",
            effectDescription: "square this layer effect, x5 addition point, point.",
            unlocked() 	{return hasMilestone('m', 2) },
            done() { return player.m.points.gte(10) }
        },
	},
    upgrades: {
        11: {
			title: "1",
            description: "cube this layer effect, x2 mp.",
            cost() { return new Decimal(5) },
            unlocked() { return hasMilestone('m', 1) },
		},
	},
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for multiplication points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){
	{return hasUpgrade("a",24) || player.m.unlocked}
     },
})



