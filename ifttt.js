//var config = require('nconf');
var apiKey = '<Your API Key>';
//var apiKey = config.util.getEnv('NODE_ENV')
//var apiKey = config.get('NODE_ENV');
console.log(apiKey);  
var IFTTTMaker = require('iftttmaker')(apiKey);
 
var action = 'MindControlTrigger';
 
IFTTTMaker.send(action, function (error) {
  if (error) {
    console.log('The request could not be sent:', error);
  } else {
    console.log('Request was sent');
  }
});
