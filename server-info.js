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
    
    var hackExecutionTime = (Math.floor((ns.getHackTime(target)/1000/60) << 0) + '.' + Math.floor((ns.getHackTime(target)/1000) % 1000) + 'm');
    var growExecutionTime = (Math.floor((ns.getGrowTime(target)/1000/60) << 0) + '.' + Math.floor((ns.getGrowTime(target)/1000) % 1000) + 'm');
    var weakenExecutionTime = (Math.floor((ns.getWeakenTime(target)/1000/60) << 0) + '.' + Math.floor((ns.getWeakenTime(target)/1000) % 1000) + 'm');
    var currentSecurityLevel = ns.getServerSecurityLevel(target);
    var currentServerMoney = ns.getServerMoneyAvailable(target);
    var hackChance = ns.hackAnalyzeChance(target) * 100;
    hackChance = hackChance.toFixed(2)
    

    ns.tprint(green + 'Target: ' + cyan + target);
    ns.tprint(green + 'Root access: ' + cyan + ns.hasRootAccess(target));
    ns.tprint(green + 'Hack() execution time: ' + cyan + hackExecutionTime);
    ns.tprint(green + 'Grow() execution time: ' + cyan + growExecutionTime);
    ns.tprint(green + 'Weaken() execution time: ' + cyan + weakenExecutionTime);
    ns.tprint(green + 'Server growth rate: ' + cyan + ns.getServerGrowth(target));
    ns.tprint(green + 'Minimum security level: ' + cyan + ns.getServerMinSecurityLevel(target));
    ns.tprint(green + 'Current security level: ' + cyan + currentSecurityLevel.toFixed(2));
    ns.tprint(green + 'Maximum server money: ' + cyan + ns.getServerMaxMoney(target));
    ns.tprint(green + 'Current server money: ' + cyan + currentServerMoney.toFixed(0));
    ns.tprint(green + 'Chance to hack: ' + cyan + hackChance + '%');
    //ns.tprint('' + ns.);
}