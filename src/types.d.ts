declare module 'download-stats' {
    interface DownloadStats {
        get: {
            lastMonth: (packageName: string, cb: (err: Error | null, result: {
                downloads: number;
                package: string;
                start: string;
                end: string;
            }) => void) => void;
        };
    }
    const downloadStats: DownloadStats;
    export = downloadStats;
}

declare module 'npm-api' {
    class NpmApi {
        maintainer(username: string): Maintainer;
        repo(packageName: string): Repo;
    }

    interface Maintainer {
        repos(): Promise<string[]>;
    }

    interface Repo {
        name: string;
        package(): Promise<PackageInfo>;
    }

    interface PackageInfo {
        name: string;
        description: string;
        version: string;
    }

    export = NpmApi;
}
