/** @param {NS} ns **/
export async function main(ns) {
    var desiredNodes = 8;
    var desiredLevel = 80;
    var desiredRAM = 4;
    var desiredCores = 1;

    while (ns.hacknet.numNodes() < desiredNodes) {
        if (ns.hacknet.getPurchaseNodeCost() < myMoney()) {
            ns.hacknet.purchaseNode(ns.hacknet.numNodes() + 1)
            await ns.sleep(1);
        }
        await ns.sleep(1);
    }

    for (var i = 0; i < desiredNodes; i++) {
        while (ns.hacknet.getNodeStats(i).level < desiredLevel) {
            var cost = ns.hacknet.getLevelUpgradeCost(i, 1);
            while (myMoney() < cost) {
                await ns.sleep(1);
            }
            ns.hacknet.upgradeLevel(i, 1);
            await ns.sleep(1);
        }
    } await ns.sleep(1);

    for (var i = 0; i < desiredNodes; i++) {
        while (ns.hacknet.getNodeStats(i).ram < desiredRAM) {
            var cost = ns.hacknet.getRamUpgradeCost(i, 1);
            while (myMoney() < cost) {
                await ns.sleep(1);
            }
            ns.hacknet.upgradeRam(i, 1);
            await ns.sleep(1);
        }
    } await ns.sleep(1);

    for (var i = 0; i < desiredNodes; i++) {
        while (ns.hacknet.getNodeStats(i).cores < desiredCores) {
            var cost = ns.hacknet.getCoreUpgradeCost(i, 1);
            while (myMoney() < cost) {
                await ns.sleep(1);
            }
            ns.hacknet.upgradeCore(i, 1);
            await ns.sleep(1);
        }
    } await ns.sleep(1);

    function myMoney() {
        return ns.getServerMoneyAvailable("home");
    }
}