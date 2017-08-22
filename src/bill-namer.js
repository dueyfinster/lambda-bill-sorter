const log = require('winston');
log.level = process.env.LOG_LEVEL;
import moment from 'moment';

/**
* Given text from a bill, it searches for accounts that match, and 
* returns information representing the bill
*/
export default class BillNamer {
  constructor(text, config) {
    this.text = text;
    this.config = config;
    log.debug(`Init bills ${JSON.stringify(this.config)}`);
  }

  match_account() {
    for (let i in this.config) {
      const accObj = this.config[i];
      log.debug(`Checking account ${JSON.stringify(accObj.bill_type)}`);
      if (this.text.includes(accObj.acc_no)) {
        log.debug(`Account matched for: ${JSON.stringify(accObj.bill_type)}`);
        return accObj;
      }
    }
    throw new Error('No account matched in supplied text!');
  }

  retrieve_bill_date(accObj) {
    const matches = this.text.match(accObj.regex);
    if (matches.length >= accObj.date_num) {
      const rawDate = matches[accObj.date_num];
      log.debug(`Raw date for account ${accObj.bill_type} is: ${rawDate}`);
      const date = new moment(rawDate, accObj.date_format).toDate();
      const formatted_date = moment(date).format('YY-MM');
      log.debug(`Date for account ${accObj.bill_type} is: ${formatted_date}`);
      return formatted_date;
    } else {
      log.debug(`No Date for account ${accObj.bill_type} matched!`);
      throw new Error('No date matched in bill');
    }
  }

  async run() {
    const accObj = this.match_account();
    const billDate = this.retrieve_bill_date(accObj);
    const billFullName = billDate + ' ' + accObj.bill_type + '.pdf';
    const billPath = accObj.category + '/' + billFullName;

    return {name: billFullName, path: billPath};
  }
}
