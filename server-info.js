/** @param {NS} ns */
export async function main(ns) {

    const cyan = "\u001b[36m";
    const green = "\u001b[32m";
    const red = "\u001b[31m";
    const reset = "\u001b[0m";

    var target
    if (ns.args.length > 0) {
        target = ns.args[0];
    } else {
        ns.tprint('Requires a target. Exiting.');
        ns.exit();
    }

    ns.tprint(green + 'Target: ' + cyan + target);
    ns.tprint(green + 'Root access: ' + cyan + ns.hasRootAccess(target));
    ns.tprint(green + 'Hack() execution time: ' + cyan + ns.getHackTime(target));
    ns.tprint(green + 'Grow() execution time: ' + cyan + ns.getGrowTime(target));
    ns.tprint(green + 'Weaken() execution time: ' + cyan + ns.getWeakenTime(target));
    ns.tprint(green + 'Server growth rate: ' + cyan + ns.getServerGrowth(target));
    ns.tprint(green + 'Minimum security level: ' + cyan + ns.getServerMinSecurityLevel(target));
    ns.tprint(green + 'Current security level: ' + cyan + ns.getServerSecurityLevel(target));
    ns.tprint(green + 'Maximum server money: ' + cyan + ns.getServerMaxMoney(target));
    ns.tprint(green + 'Current server money: ' + cyan + ns.getServerMoneyAvailable(target));
    ns.tprint(green + 'Chance to hack: ' + cyan + ns.hackAnalyzeChance(target));
    //ns.tprint('' + ns.);
}