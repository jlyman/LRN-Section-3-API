// Simple API server that our BeBriefed app can hit


var express = require('express');
var app     = express();

var port = process.env.PORT || 8080;

var lastUpTimes = {
	'web': new Date(),
	'db': new Date(),
	'mail': new Date()
}

function sendRandomResponse(service) {
	var isUp = Math.random() < 0.4 

	if (isUp) {
		lastUpTimes[service] = new Date()
	}

	return {
		status: isUp ? 'up' : 'down',
		lastUpTime: lastUpTimes[service]
	}
}

// Set up routing
var router = express.Router();

router.get('/status', function (req, res) {
	res.json({
		web: sendRandomResponse('web'),
		db: sendRandomResponse('db'),
		mail: sendRandomResponse('mail'),
	})
})

app.use('/', router);


// Start the server
app.listen(port);
console.log('Magic happens on port ' + port);