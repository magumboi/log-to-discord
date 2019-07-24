const logfile = process.env.LOGFILE;
const request = require('request-promise-native');
const Tail = require('tail').Tail;
const webhook = require("webhook-discord");
const Hook = new webhook.Webhook("WEBHOOK URL");
let logp = new Tail(logfile,{follow: true});

postToDiscord = async function(message){
  if(message.length>=2000)
  {
    while(message.length>=2000)
    {
        Hook.info("maincra log",message.substring(0,2000));
        message = message.substring(2000);
    }
  }
  else
  {
      Hook.info("maincra log",message);
  }
};
logp.on('exit', (code, signal) => {
    console.log('LOGS EXIT');
});

logp.on('line',postToDiscord);
logp.on("error",postToDiscord);
