import blockchain from "./blockchain.js";
export class Contract {
    contract;
    blockchain;
    name;
    constructor(name, contract) {
        this.name = name;
        this.contract = contract;
        this.blockchain = blockchain();
    }
    get client() {
        return this.blockchain.client;
    }
    get account() {
        return this.blockchain.account;
    }
    get publicClient() {
        return this.blockchain.publicClient;
    }
    writeContract = async (functionName, args) => {
        console.debug(`...Writing contract ${this.name}.${functionName} ${args}`);
        const { request, result } = await this.publicClient.simulateContract({
            address: this.contract.address,
            abi: this.contract.abi,
            // @ts-expect-error
            functionName,
            // @ts-expect-error
            args,
            account: this.account,
        });
        const hash = await this.client.writeContract(request);
        await this.publicClient.waitForTransactionReceipt({ hash });
        console.debug(`...Done : ${hash} ${result}`);
        return { hash, result };
    };
}
