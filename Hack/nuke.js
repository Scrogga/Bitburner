/** @param {NS} ns */
export async function main(ns) {

    var target = 'n00dles';
    if (ns.args.length > 0) {
        target = ns.args[0];
    }

    let openPorts = 0;
    if (ns.fileExists("BruteSSH.exe")) {
        ns.brutessh(target);
        openPorts++;
    }
    if (ns.fileExists("FTPCrack.exe")) {
        ns.ftpcrack(target);
        openPorts++;
    }
    if (ns.fileExists("RelaySMTP.exe")) {
        ns.relaysmtp(target);
        openPorts++;
    }
    if (ns.fileExists("HTTPWorm.exe")) {
        ns.httpworm(target);
        openPorts++;
    }
    if (ns.fileExists("SQLInject.exe")) {
        ns.sqlinject(target);
        openPorts++;
    }
    if (ns.getServerNumPortsRequired(target) <= openPorts) {
        ns.nuke(target);
    }
}