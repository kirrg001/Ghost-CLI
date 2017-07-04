'use strict';

const fs = require('fs-extra');
const url = require('url');
const path = require('path');
const execa = require('execa');
const template = require('lodash/template');

const Promise = require('bluebird');

const cli = require('../../lib');

class MySQLExtension extends cli.Extension {
    setup(cmd, argv) {
	// ghost setup --local, skip
	if (argv.local) {
	    return;
	}

	cmd.addStage('mysql', this.setupMySQL.bind(this));
    }
    
    setupMySQL(argv, ctx, task) {
	if (!this.isSupported()) {
	    // @TODO: switch to sqlite as default?raise issue?
	    throw new Error('MySQL must be installed. See https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-16-04');
	}

	
    }
    
    isSupported() {
	try {
	    execa.shellSync('dpkg -l | grep mysql', {stdio: 'ignore'});
	    return true;
	} catch (e) {
	    return false;
	}
    }
}

module.exports = MySQLExtension;
    
