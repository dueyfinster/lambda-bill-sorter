const log = require('winston');
log.level = process.env.LOG_LEVEL;
import BillNamer from './src/bill-namer';
import bills_config from './config';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST',
  'Access-Control-Allow-Headers': 'Content-Type'
};

exports.handler = async (event, context, callback) => {
  try {
    log.debug(`Event is: ${JSON.stringify(event)}`);

    const bi = new BillNamer(event.text, bills_config['bills']);
    const res = await bi.run();
    log.debug(`Bill Response is: ${JSON.stringify(res)}`);

    return context.succeed({
      statusCode: 200,
      body: res,
      headers: headers
    });
  } catch (e) {
    log.error(`Application ERROR: ${e.stack}`);
    return context.fail({
      statusCode: 500,
      body: `Application Error: ${e}`,
      headers
    });
  }
};
