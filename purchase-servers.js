/** @param {NS} ns */
export async function main(ns) {
    const ram = 8;
    let i = 0;

    const red = "\u001b[31m";
    const cyan = "\u001b[36m";

    var target = 'joesguns';
    if (ns.args.length > 0) {
        target = ns.args[0];
    }

    while (i < ns.getPurchasedServerLimit()) {
        if (ns.getServerMoneyAvailable('home') > ns.getPurchasedServerCost(ram)) {
            let hostname = ns.purchaseServer('pserv-' + i + '-' + ram + 'GB', ram);
            ns.tprint('Server has low ram, defaulting to less efficient hack script on ' + hostname);
            ns.tprint('Initialising on ' + hostname);
            ns.scp('/Hack/init.js', hostname);
            ns.exec('/Hack/init.js', hostname, 1, target);
            await ns.sleep(100)
            let ramAvailable = ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname);
            let ramPerThread = ns.getScriptRam('/Hack/hack-old.js');
            let threads = Math.floor(ramAvailable / ramPerThread);
            ns.scp('/Hack/hack-old.js', hostname);
            ns.exec('/Hack/hack-old.js', hostname, threads, target);
            i++;
        }
        await ns.sleep(1000);
    }
}