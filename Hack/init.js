/** @param {NS} ns */
export async function main(ns) {

    var target = 'n00dles';
    if (ns.args.length > 0) {
        target = ns.args[0];
    }

    ns.rm('moneyThresh.txt')
    ns.rm('securityThresh.txt')

    const moneyThresh = ns.getServerMaxMoney(target) * 0.75;
    const securityThresh = ns.getServerMinSecurityLevel(target) + 5;

    ns.write('moneyThresh.txt', moneyThresh);
    ns.write('securityThresh.txt', securityThresh)
}