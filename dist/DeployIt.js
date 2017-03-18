"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rsync = require("rsync");
class DeployIt {
    constructor(config) {
        this.config = config;
    }
    rsync(cfg) {
        const config = cfg || this.config.rsync || {};
        let exclude = ['node_modules'];
        let destination = `${this.config.ssh.userName}@${this.config.ssh.hostName}:${this.config.targetDir}`;
        if (config) {
            if (config.exclude) {
                exclude = exclude.concat(Array.isArray(config.exclude) ? config.exclude : [config.exclude]);
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
                    reject();
                }
                else {
                    resolve(cmd);
                }
            });
        });
    }
}
exports.DeployIt = DeployIt;
