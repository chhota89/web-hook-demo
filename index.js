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


var server = app.listen(process.env.PORT || 3000, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


const ActionsSdkApp = require('actions-on-google').ActionsSdkApp;

exports.sayNumber = (request, response) => {
  const app = new ActionsSdkApp({request, response});

  function mainIntent (app) {
    console.log('mainIntent');
    let inputPrompt = app.buildInputPrompt(true, '<speak>Hi! <break time="1"/> ' +
      'I can read out an ordinal like ' +
      '<say-as interpret-as="ordinal">123</say-as>. Say a number.</speak>',
      ['I didn\'t hear a number', 'If you\'re still there, what\'s the number?', 'What is the number?']);
    app.ask(inputPrompt);
  }

  function rawInput (app) {
    console.log('rawInput');
    if (app.getRawInput() === 'bye') {
      app.tell('Goodbye!');
    } else {
      let inputPrompt = app.buildInputPrompt(true, '<speak>You said, <say-as interpret-as="ordinal">'
        + app.getRawInput() + '</say-as></speak>',
        ['I didn\'t hear a number', 'If you\'re still there, what\'s the number?', 'What is the number?']);
      app.ask(inputPrompt);
    }
  }

  let actionMap = new Map();
  actionMap.set(app.StandardIntents.MAIN, mainIntent);
  actionMap.set(app.StandardIntents.TEXT, rawInput);

  app.handleRequest(actionMap);
};
