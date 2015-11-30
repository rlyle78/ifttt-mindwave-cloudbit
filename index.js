var Cylon = require('cylon');
var Barcli = require("barcli");
var attentionGraph = new Barcli({
  label: "attention Graph",
  range: [0, 100],
});

var apiKey = '<Your IFTTT API Key>';
var IFTTTMaker = require('iftttmaker')(apiKey);
var trigger_on = 'MindControlTrigger_On';
var trigger_off = 'MindControlTrigger_Off';

Cylon.robot({
  connections: {
    neurosky: { adaptor: 'neurosky', port: '/dev/cu.MindWaveMobile-DevA' }
  },

  devices: {
    headset: { driver: 'neurosky' }
  },

  work: function(my) {
    my.headset.on('attention', function(data) {
      //Logger.info("attention:" + data);
      if (data < 100)
      {
        attentionGraph.update(data);
        if (data > 50)
        {
            IFTTTMaker.send(trigger_on, function (error) {
              if (error) {
                console.log('The request could not be sent:', error);
              } else {
                console.log('Request was sent');
              }
            });
        } else
        {
            IFTTTMaker.send(trigger_off, function (error) {
              if (error) {
                console.log('The request could not be sent:', error);
              } else {
                console.log('Request was sent');
              }
            });
        }
      }
    });

    /*my.headset.on('meditation', function(data) {
      Logger.info("meditation:" + data);
    });*/
    
  }
}).start();
