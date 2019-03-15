import StudentAndParentManager from "../../modules/StudentAndParentManager"

const Json2csvParser = require('json2csv').Parser;

 

const fields = ["studentId","id","date", "amount", "paymentMethodId" ]
StudentAndParentManager.getPayments().then(payments => {
    console.log(payments)
    const json2csvParser = new Json2csvParser({ fields });
const csv = json2csvParser.parse(payments)
console.log(csv)
return csv




}).then((csv) => window.open("data:text/csv;charset=utf-8," + escape(csv)))