addLayer("tn", {
    name: "triangular number", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T<sub>n<sub>", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#ffff00",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "triangular number", // Name of prestige currency
    baseResource: "plus", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent() {
		let exp = new Decimal(0.5)
		return exp
	},
	base() {
		let base = 2
		return base
	},
    eff() {
        let eff = player.tn.points.times(player.tn.points.plus(1)).div(2)
        return eff
    },
    effectDescription() {
    return `x Points Gain ${format(layers.tn.eff())}`
},
    resetsNothing() {
      return true
    },
    onPrestige(gain) {
        layerDataReset("p")
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
	},
    buyables: {
	},
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){
      let visible = false
      if (player.p.points.gte(3) || player.tn.unlocked) visible = true
      return visible},
})
