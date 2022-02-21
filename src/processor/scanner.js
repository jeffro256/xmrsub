// Base class payment scanners
class PaymentScanner {
	constructor() {
		this.running = false;
		this.receive = (x) => console.error("PaymentScanner receive CB not set"); // NO-OP
		this.progress = (x) => console.error("PaymentScanner progress CB not set"); // NO-OP
	}

	// Return string ticker for currency (e.g. 'XMR')
	getCurrency() {
		throw new Error('operation not implemented');
	}

	/* 
	Return arbitray JSONify-able object that can be parsed later by
	any instance thru setState(). Should store information about state
	of scanning. It does not need to store information about individual
	payments. For example, a scanner may store a private viewkey as well
	as the height of the last scanned block.
	Will not be called 
	*/
	getState() {
		throw new Error('operation not implemented');
	}

	/*
	Use state object from previous calls to getState() to set the state
	of this scanner. 
	*/
	setState(state) {
		throw new Error('operation not implemented');
	}

	/*
	Non-blocking call to start scanning. stop() and start() may be called
	multiples times in the same instance. Scanner is expected to pick up
	where it left off when start() is called.
	*/
	async start() {
		if (this.running) {
			throw new Error("scanner can not start: already running");
		}

		this.running = true;
	}

	/*
	Non-blocking call to stop scanning. stop() and start() may be called
	multiples times in the same instance.
	*/
	async stop() {
		if (!this.running) {
			throw new Error("scanner can not stop: not currently running");
		}

		this.running = false;
	}

	/*
	Return whether scanner is running. Should be set to true when start()
	is first called and to false when stop() finishes.
	*/
	isRunning() {
		return this.running;
	}

	/*
	Set the callback to send received payments to. cb is an asynchronous
	callback function which takes a single argument: a payment object. It
	will resolve on success, reject on failure. You can assume that this
	will be called at least once before the first call to start().
	*/
	onReceive(cb) {
		this.receive = cb;
	}

	/*
	OPTIONAL: Set the callback to update sync progress with. cb is an
	asynchronous callback function which takes two arguments: 
	*/
	onProgress(cb) {
		this.progress = cb;
	}
}

module.exports.PaymentScanner = PaymentScanner;