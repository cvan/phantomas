/**
 * SPOF (Single Point of Failure) detection module
 *
 * @see http://www.stevesouders.com/blog/2010/06/01/frontend-spof/
 * @see https://github.com/pmeenan/spof-o-matic
 */
exports.version = '0.1';

exports.module = function(phantomas) {
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
/**
	phantomas.on('init', function() {
		console.log(phantomas.getPageContent());
	});

	phantomas.on('loadFinished', function() {
		console.log(phantomas.getPageContent());
	});
**/
};
