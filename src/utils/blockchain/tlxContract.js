import { withCache } from "../cache.js";
import { ERC20Contract } from "./erc20Contract.js";
export class TlxContract extends ERC20Contract {
    constructor(name, contract) {
        super(name, contract);
    }
    async mint(args) {
        return this.writeContract("mint", args).then(this.parseBigintResult.bind(this));
    }
    async redeem(args) {
        return this.writeContract("redeem", args).then(this.parseBigintResult.bind(this));
    }
    async parseBigintResult({ hash, result }) {
        return {
            hash,
            result: await this.toNumber(result),
        };
    }
    async getValueinSUSD(susdContract) {
        const [balance, exchangeRate] = await Promise.all([
            this.getBalanceBigint(),
            this.getExchangeRate(),
        ]);
        const susdValue = (await this.toNumber(balance)) * exchangeRate;
        return susdValue;
    }
    getExchangeRate() {
        return withCache({
            ttlMs: 60 * 1000,
            key: `exchangeRate_${this.contract.address}`,
            func: async () => {
                const exchangeRate = this.toNumber(await this.contract.read.exchangeRate());
                return exchangeRate;
            },
        });
    }
}
