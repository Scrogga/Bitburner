/** @param {NS} ns */
export async function main(ns) {
    const ram = 32;
    let i = 0;

    if (ns.getPurchasedServers().length > 0){
        i = ns.getPurchasedServers().length
    }

    while (i < ns.getPurchasedServerLimit()) {
        if (ns.getServerMoneyAvailable('home') > ns.getPurchasedServerCost(ram)) {
            let hostname = ns.purchaseServer('pserv-' + i + '-' + ram + 'GB', ram);
            ns.tprint('Purchase ' + hostname + ' with ' + ram + 'GB of ram')
            i++;
        }
        await ns.sleep(1000);
    }
}