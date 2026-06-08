addLayer("e", {
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0)
        }
    },
    color: "#00CE00",
    resource: "effortless point",
    row: 0,
    layerShown() { return true },
})
