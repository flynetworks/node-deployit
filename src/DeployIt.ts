import Rsync = require('rsync');
// import {Client} from 'ssh2';

export interface IDeployItConfig {
    srcDir?: string;
    targetDir: string;
    ssh: {
        hostName: string;
        userName: string;
        password?: string;
        port?: number;
    },
    rsync?: IRsyncConfig,
}

export interface IRsyncConfig {
    exclude?: string|string[];
    shell?: 'ssh';
    flags?: string;
    destination?: string;
}

export class DeployIt {

    constructor(private config: IDeployItConfig) {
    }

    public rsync(cfg?: IRsyncConfig): Promise<string> {
        const config = cfg || this.config.rsync || {};

        let exclude: string[] = ['node_modules'];
        let destination = `${this.config.ssh.userName}@${this.config.ssh.hostName}:${this.config.targetDir}`;

        if (config) {
            if (config.exclude) {
                exclude = exclude.concat(
                    Array.isArray(config.exclude) ? config.exclude : [config.exclude]
                );
            }

            if (config.destination) {
                destination = config.destination;
            }
        }

        return new Promise((resolve, reject) => {
            new Rsync()
                .shell(config.shell || 'ssh')
                .flags(config.flags || 'az')
                .exclude(exclude)
                .source(this.config.srcDir || `${process.cwd()}/`)
                .destination(destination)
                .execute((err, _, cmd) => {
                    if (err) {
                        reject()
                    } else {
                        resolve(cmd);
                    }
                });
        });
    }
}