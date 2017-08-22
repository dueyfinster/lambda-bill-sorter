import chai from 'chai';
import BillNamer from './../src/bill-namer';
const assert = chai.assert;
import config from './../conf/sample-config';
import index from '../index';

describe('Bills#run with valid data', () => {
  const instance = new BillNamer(
    'Water Bill account 90238378262 From 01/01/2015 to 31/03/2015',
    config['bills']
  );

  it('should correctly return name of bill', async () => {
    const response = await instance.run();
    assert.isNotNull(response.text, 'BillNamer text returned is null');
    assert.include(
      response.name,
      'Water',
      'BillsNamer does not contain the correct text'
    );
  });
});

describe('Bills#run with valid data', () => {
  const event = {
    text: 'Water Bill account 90238378262 From 01/01/2015 to 31/03/2015'
  };
  let context = {};
  let callback = function() {};

  it('should correctly return name of bill', async () => {
    index.handler(event, context, callback);
    console.log(context);
    // assert.isNotNull(response.text, 'BillNamer text returned is null');
    // assert.include(
    //   response.name,
    //   'Water',
    //   'BillsNamer does not contain the correct text'
    // );
  });
});
