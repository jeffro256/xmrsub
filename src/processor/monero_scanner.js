'use strict';

const monero = require('monero-javascript');

const { PaymentScanner } = require('./scanner.js');

class MoneroScanner extends PaymentScanner {
	constructor() {
		super();

		this.unpoppedHeight = 0; // the minimum height of all unpopped txs
		this.confirmationsNeeded = 10;
		this.wallet = null;
	}

	getCurrency() {
		return 'XMR';
	}

	async getState() {
		return {
			height: this.height
		}
	}

	async setState(state) {

	}

	async start() {
		await super.start();

		this.wallet = await monero.createWalletFull({
			primaryAddress: '59qy4xG4e52Lpwifve1vUY9PB4SqPJq1Y1Mwv4XFKhpFcvv4GPTj99h66aK4YskS9BWY5DAft3CayERhQnRYhckECSLi3eH',
			privateViewKey,
			networkType: process.env.MONERO_NETWORK_TYPE,
			restoreHeight: 1014000,
			server: {uri: "http://localhost:38081"},
			password: 'throwaway8888',
		});

		const self = this;
		await this.wallet.addListener(new class extends monero.MoneroWalletListener {
			onOutputReceived(output) {
				self.onOutputReceived(output);
			}
		});

		await this.wallet.sync(new class extends monero.MoneroWalletListener {
			onSyncProgress(height, startHeight, endHeight, percentDone, message) {
				if (height % 100 == 0) {
					console.log(height);
				}
			}
		});

		await this.wallet.startSyncing(1000);
	}

	async stop() {
		await super.stop();
		await this.wallet.close();
	}

	getConfirmationsNeeded() {
		return this.confirmationsNeeded;
	}

	setConfirmationsNeeded(n) {
		this.confirmationsNeeded = n;
	}

	async onOutputReceived(output) {

	}
}

async function main() {
	require('dotenv').config();
	console.log(process.env.MONERO_NETWORK_TYPE);
	const privviewkey = process.env.MONERO_PRIVATE_VIEWKEY;
	const scanner = new MoneroScanner();

	await scanner.onReceive(console.log);
	await scanner.start(privviewkey, undefined);
	await scanner.stop();
}


main().then(() => console.log("done"));