var sendVote = {
  pressButton: function(){
// correct
        var Gpio = require('onoff').Gpio,
        buttonNo = new Gpio(7, 'in', 'rising');
        buttonYes = new Gpio(0, 'in', 'rising');
        ledgreen = new Gpio(8, 'out');
        ledred = new Gpio(9, 'out');

          ledred.writeSync(0);
          ledgreen.writeSync(1);

          buttonNo.watch(function(err, value){
              ledgreen.writeSync(0);
              ledred.writeSync(1);
              buttonNo.unwatch();
              buttonYes.unwatch();
              sendVote.send(0);
              setTimeout(function() {
                  return sendVote.pressButton();
              }, 2000);
          });

          buttonYes.watch(function(err, value){
              ledgreen.writeSync(0);
              ledred.writeSync(1);
              buttonNo.unwatch();
              buttonYes.unwatch();
              sendVote.send(1);
              setTimeout(function() {
                  return sendVote.pressButton();
              }, 2000);
          });
  },

 send: function(value) {
        var mqtt = require('mqtt')
        var client  = mqtt.connect('tcp://iot.eclipse.org', 1883)
        client.on('connect', function() {
        client.publish('iot/data/iotmmsp1942378810trial/v1/fbfd00eb-9561-4a6d-91df-dc1177ea7167', '{"mode":"async","messageType":"55222a0080cacc74b5f0","messages":[{"Vote":"'+ value +'","ID_Project":"44000"}]}')
      });

                console.log('Vote ' + value + ' send');
},

 init: function() {
         sendVote.pressButton();
 }

}

sendVote.init();
