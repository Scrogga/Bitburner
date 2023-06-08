/** @param {NS} ns */
export async function main(ns) {
    //var serverList = ns.scan("home")
    var serverList = ns.getPurchasedServers();

    const red = "\u001b[31m";
    const cyan = "\u001b[36m";

    var target = 'n00dles';
    if (ns.args.length > 0) {
        target = ns.args[0];
    }

    for (var i = 0; i < serverList.length; ++i) {
        var server = serverList[i];
        if (ns.hasRootAccess(server)) {
            ns.killall(server, true);
            if (ns.getServerMaxRam(server) > 8) {
                ns.scp('/Hack/init.js', server);
                ns.scp('/Hack/nuke.js', server);
                ns.scp('/Hack/watchdog.js', server);
                ns.scp('/Hack/weaken.js', server);
                ns.scp('/Hack/hack.js', server);
                ns.scp('/Hack/grow.js', server);
                ns.tprint('Initialising on ' + server);
                ns.exec('/Hack/init.js', server, 1, target);
                await ns.sleep(100)
                ns.tprint('Nuking ' + target + ' from ' + server);
                ns.exec('/Hack/nuke.js', server, 1, target)
                await ns.sleep(100)
                ns.tprint('Starting watchdog on ' + server);
                ns.exec('/Hack/watchdog.js', server, 1, target)
            } else if (ns.getServerMaxRam(server) > 2.2) {
                ns.tprint('Server has low ram, defaulting to less efficient hack script on ' + server);
                ns.tprint('Initialising on ' + server);
                ns.scp('/Hack/init.js', server);
                ns.exec('/Hack/init.js', server, 1, target);
                await ns.sleep(100)
                let script = '/Hack/hack-old.js'
                let ramAvailable = ns.getServerMaxRam(server) - ns.getServerUsedRam(server);
                let ramPerThread = ns.getScriptRam(script);
                let threads = Math.floor(ramAvailable / ramPerThread);
                ns.scp(script, server);
                ns.exec(script, server, threads, target);
            } else {
                ns.tprint(red + server + ' server doesnt have enough ram to hack from, skipping');
            }
        }
    }
}