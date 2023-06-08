/** @param {NS} ns */
export async function main(ns) {
    let host = ns.getHostname()
    let ramAvailable = ns.getServerMaxRam(host) - ns.getServerUsedRam(host);
    var ramPerThread = 0;
    const moneyThresh = ns.read('moneyThresh.txt');
    const securityThresh = ns.read('securityThresh.txt');
    var target = 'n00dles';
    var sleepTime = 0;

    ns.tprint('Starting Watchdog on ' + ns.getHostname());

    if (ns.args.length > 0) {
        target = ns.args[0];
    }

    while (true) {
        if (ns.getServerSecurityLevel(target) > securityThresh) {
            let script = '/Hack/weaken.js'
            ramPerThread = ns.getScriptRam(script);
            let threads = Math.floor(ramAvailable / ramPerThread);
            //ns.tprint('Weakening ' + target);
            sleepTime = ns.getWeakenTime(target)
            ns.run(script, threads, target);
        } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
            let script = '/Hack/grow.js'
            ramPerThread = ns.getScriptRam(script);
            let threads = Math.floor(ramAvailable / ramPerThread);
            //ns.tprint('Growing ' + target);
            sleepTime = ns.getGrowTime(target)
            ns.run(script, threads, target);
        } else {
            let script = '/Hack/hack.js'
            ramPerThread = ns.getScriptRam(script);
            let threads = Math.floor(ramAvailable / ramPerThread);
            //ns.tprint('Hacking ' + target);
            sleepTime = ns.getHackTime(target)
            ns.run(script, threads, target);
        }
        await ns.sleep(sleepTime + 100);
    }
}