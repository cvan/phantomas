/**
 * SPOF (Single Point of Failure) detection module
 *
 * @see http://www.stevesouders.com/blog/2010/06/01/frontend-spof/
 * @see https://github.com/pmeenan/spof-o-matic
 */
exports.version = '0.1';

exports.module = function(phantomas) {
	function spofCheck(html) {
		var spofRegex = /<script [^>]*src[ =htps:"']+\/\/([^\/ "]+)\/[^>]+>/gi,
			matches = html.match(spofRegex),
			res = [];

		if (matches) {
			matches.forEach(function(match) {
				console.log(JSON.stringify(match));
			});
		}

		return res;
	}

	// fetch HTML using curl
	// requires:
	// - *nix system
	// - PhantomJS 1.9+
	// - curl
	// @see https://github.com/ariya/phantomjs/commit/f52044cd31
	var execFile;

	try {
		execFile = require("child_process").execFile;
	}
	catch(e) {
		return;
	}

	phantomas.log("Fetching <" + phantomas.url + "> using curl to perform SPOF analysis...");
	phantomas.setMetric('spof');

	execFile("curl", ['--location' /* follow redirects */, phantomas.url], null, function(err, stdout, stderr) {
		if (err === null) {
			phantomas.log("Page HTML received");

			// perform SPOF analysis
			var spofs = spofCheck(stdout);
		}
	});

	// Determining the top-level-domain for a given host is way too complex to do right
	// (you need a full list of them basically)
	// We are going to simplify it and assume anything that is .co.xx will have 3 parts
	// and everything else will have 2
	// @see https://github.com/pmeenan/spof-o-matic/blob/master/src/background.js
	function GetTLD(host){
		var tld = host;
		var noSecondaries = /\.(gov|ac|mil|net|org|co)\.\w\w$/i;
		if (host.match(noSecondaries)) {
			var threePart = /[\w]+\.[\w]+\.[\w]+$/i;
			tld = host.match(threePart).toString();
		} else {
			var twoPart = /[\w]+\.[\w]+$/i;
			tld = host.match(twoPart).toString();
		}
		return tld;
	};

	// list of in-home domains
	var myDomains = {};
};
