/** @param {NS} ns */
export async function main(ns) {
    //var serverList = ns.scan("home")
    var serverList = [
        'avmnite-02h',
        'catalyst',
        'computek',
        'crush-fitness',
        'CSEC',
        'foodnstuff',
        'harakiri-sushi',
        'hong-fang-tea',
        'I.I.I.I',
        'iron-gym',
        'joesguns',
        'johnson-ortho',
        'max-hardware',
        'nectar-net',
        'neo-net',
        'netlink',
        'n00dles',
        'omega-net',
        'phantasy',
        'rothman-uni',
        'sigma-cosmetics',
        'silver-helix',
        'summit-uni',
        'syscore',
        'the-hub',
        'zb-institute',
        'zer0'
    ]

    const cyan = "\u001b[36m";
    const green = "\u001b[32m";
    const red = "\u001b[31m";
    const reset = "\u001b[0m";

    var target = 'n00dles';
    if (ns.args.length > 0) {
        target = ns.args[0];
    }

    for (var i = 0; i < serverList.length; ++i) {
        var server = serverList[i];
        let openPorts = 0;
        if (!ns.hasRootAccess(server)) {
            ns.tprint('Dont have root access on ' + server + '. Attempting to hack')
            if (ns.fileExists("BruteSSH.exe")) {
                ns.brutessh(server);
                openPorts++;
            }
            if (ns.fileExists("FTPCrack.exe")) {
                ns.ftpcrack(server);
                openPorts++;
            }
            if (ns.fileExists("RelaySMTP.exe")) {
                ns.relaysmtp(server);
                openPorts++;
            }
            if (ns.fileExists("HTTPWorm.exe")) {
                ns.httpworm(server);
                openPorts++;
            }
            if (ns.fileExists("SQLInject.exe")) {
                ns.sqlinject(server);
                openPorts++;
            }
            if (ns.getServerNumPortsRequired(server) <= openPorts) {
                ns.nuke(server);
                ns.tprint(cyan + 'Nuked ' + server + ' successfully')
            } else {
                ns.tprint(red + 'Couldnt nuke ' + server + ', skipping')
            }
        }
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
                ns.tprint(red + server + 'Server doesnt have enough ram to hack from, skipping');
            }
        }
    }
}