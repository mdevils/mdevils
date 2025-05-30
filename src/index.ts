import { Octokit } from "@octokit/rest";
import NpmApi from 'npm-api';
import NpmDownloadStats from 'download-stats';
import {promisify} from 'node:util';

const getNpmPackageDownloadCount = promisify(NpmDownloadStats.get.lastMonth);

function isPackageRelevant(packageName: string): boolean {
    if (packageName.startsWith('@')) {
        return false; // Skip scoped packages
    }
    if (packageName.match(/enb(?:-|$)/)) {
        return false; // Skip ENB related packages
    }
    return true;
}

(async function run() {
    const npmApi = new NpmApi();
    const maintainer =  npmApi.maintainer('mdevils');
    const packages = (await maintainer.repos()).filter(isPackageRelevant);

    const packagesWithDownloads = await Promise.all(packages.map(async (pkgName) => {
        const count = (await getNpmPackageDownloadCount(pkgName)).downloads;
        return {name: pkgName, downloads: count};
    }));

    packagesWithDownloads.sort((a, b) => b.downloads - a.downloads);

    console.table(packagesWithDownloads);

})().catch((error) => {
    console.error("An error occurred:", error);
    process.exit(1);
});
