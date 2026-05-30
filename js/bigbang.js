addLayer("b", {
    name: "bigbang", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🌌💥", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4c3e8c",
	nodeStyle() {
		const style = {};
		if (options.emojisEnabled) {
			style.color = "white";
		}

		style.background = "#4c3e8c";
		style.width = "500px";
		style.height = "125px";
		style["font-size"] = "50px";
		return style;
	},
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "bigbang", // Name of prestige currency
    baseResource: "atoms", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	base: new Decimal(1e100).pow(1/9),
	exponent() {
		let exp = new Decimal(1.5)
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
        let eff = player.points.add(1).pow(0.9)
	    if(hasMilestone("b", 1)) eff = player.points.add(1).pow(0.95)
	    if(hasUpgrade("s", 21)) eff = player.points.add(1).pow(0.975)
		let sc = new Decimal(0.25)
	    if(hasUpgrade("s", 21)) sc = sc.add(0.1)
		eff = softcap(eff, new Decimal("1e10"), sc)
        return eff
    },
    milestones: {
        0: {
            requirementDescription: "the first bigbang",
            effectDescription: "start gaining atoms.",
            done() { return player.b.points.gte(1) }
        },
        1: {
            requirementDescription: "the second bigbang",
            effectDescription: "unlock stardust, stronger inflation.",
            done() { return player.b.points.gte(2) }
        },
	},
    upgrades: {
	},
    branches: ["s"],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for bigbang", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
})
