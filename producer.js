const kafka = require('kafka-node');
const kafka_topic = 'sample';
try {
  const Producer = kafka.Producer;
  const client = new kafka.KafkaClient({kafkaHost: '127.0.0.1:9092'});
  const producer = new Producer(client);

console.log("Producer Initialised..");



  producer.on('ready', function() { 
      let num = 0;
      setInterval(() => {
        let payloads = [
            {
              topic: 'sample',
              messages: num
            }
          ];
          producer.send(payloads, (err, data) => {
            if (err) {
              console.log('[kafka-producer -> '+kafka_topic+']: broker update failed');
            } else {
              console.log(data);
              console.log('[kafka-producer -> '+kafka_topic+']: broker update success');
            }
          });
          num++;
      }, 2000);

  });

  producer.on('error', function(err) {
    console.log(err);
    console.log('[kafka-producer -> '+kafka_topic+']: connection errored');
    throw err;
  });
}
catch(e) {
  console.log(e);
}
