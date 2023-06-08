/** @param {NS} ns */
export async function main(ns) {

    var target = 'n00dles';
    if (ns.args.length > 0) {
        target = ns.args[0];
    }

    const moneyThresh = ns.read('moneyThresh.txt');
    const securityThresh = ns.read('securityThresh.txt');

    while (true) {
        if (ns.getServerSecurityLevel(target) > securityThresh) {
            await ns.weaken(target);
        } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
            await ns.grow(target);
        } else {
            await ns.hack(target);
        }
    }
}