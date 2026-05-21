addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    eff() {
        let eff = player.p.points.add(1).log10().mul(0.1).add(1)
        if(hasMilestone("a",28)) eff = eff.mul(player.a.milestones.length / 25)
        eff = eff.pow(buyableEffect("p",12))
        if(hasUpgrade("p",33)) eff = eff.pow(upgradeEffect("p",33))
        if(inChallenge("p",11) && !hasMilestone("a", 18)) eff = eff.div(10)
        if(hasMilestone("a",9)) eff = eff.pow(0.5).div(hasUpgrade("f",14) ? 1 : 2)
        if(inChallenge("p",11) && hasMilestone("a", 18)) eff = new Decimal(1)
        return eff
    },
    effectDescription() { return `Base Points Gain ${format(layers.p.eff())}` },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
