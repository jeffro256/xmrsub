'use strict';

const { Client: PGClient } = require('pg');

function lowercaseifyKeys(obj, valuesToo) {
	var res = {};
	Object.keys(obj).forEach(function(k) {
		const newk = k.toLowerCase();
		const newv = (valuesToo && typeof obj[k] == 'string') ? obj[k].toLowerCase() : obj[k];
		res[newk] = newv;
	});
	return res;
}

class DBTable {
	constructor(name, structure, dbConn) {
		this.name = name;
		this.structure = lowercaseifyKeys(structure, true);
		this.dbConn = dbConn;
	}

	getName() {
		return this.name;
	}

	getStructure() {
		return this.structure;
	}

	getColumns(onlyNonNull) {
		return Object.keys(this.structure)
			.filter(c => !onlyNonNull || this.structure[c].includes('not null'));
	}

	async create(force) {
		const coltypestr = this.getColumns().map(c => c + ' ' + this.structure[c]).join(',');
		const forcestr = force ? '' : 'IF NOT EXISTS';
		const query = `CREATE TABLE ${forcestr} ${this.getName()} (${coltypestr});`;
		await this.dbConn.query(query);
	}

	async select(condition, params, cols, limit) {
		const colsstr = cols ? `(${cols.join(',')})` : '*';
		const limitstr = limit ? `LIMIT ${limit}` : '';
		const query = `SELECT ${colsstr} FROM ${this.getName()} WHERE ${condition} ${limitstr};`
		console.log(query);
		return await this.dbConn.query(query, params);
	}

	async insert(rows) {
		// @TODO Improve efficiency: sends O(n) SQL queries 
		const cols = this.getColumns();
		rows.forEach(row => {
			const rowlc = lowercaseifyKeys(row);
			const insertcols = Object.keys(rowlc).filter(k => cols.includes(k));
			const insertdata = insertcols.map(c => rowlc[c]);
			const colsstr = insertcols.join(',');
			const paramsstr = DBTable.makeParamListStr(insertcols.length);
			const query = `INSERT INTO ${this.getName()} (${colsstr}) VALUES ${paramsstr};`
			this.dbConn.query(query, insertdata);
		});
	}

	async keyLookup(val, keycol) {
		const kc = keycol || 'id';
		const qres = await this.dbConn.query(
			`SELECT * FROM ${this.getName()} WHERE ${kc} = $1`,
			[val]
		);
		return qres.rows[0];
	}

	static makeParamListStr(len) {
		return '(' + Array.from(Array(len).keys()).map(x => '$' + (x + 1)).join(',') + ')';
	}
}

module.exports.DBTable = DBTable;