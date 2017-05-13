var express = require('express');
var app = express();
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.post('/echo', function(req, res){
    console.dir(req.body);
	
	var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.date ? req.body.result.parameters.date : "Seems like some problem. Speak again."
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'webhook-echo-sample'
    });
	
});


var server = app.listen(8081, function () {
    console.log('Server is running..');
});
