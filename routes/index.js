const { response } = require('express');
const express = require('express');
const invoiceGenerator = require('../service/invoicesGenerator');
const data = require('../test/fixtures/sample-request.json');



const router = express.Router();

/*
*retrieve a triggered file in test folder from the url
*print data to pdf and download it
*/
router.post('/test/fixtures/', (req, res, next) =>{
    const filename = req.body;
    const stream = res.writeHead(200, {
        'Content-Type':'application/pdf',
        'Content-Disposition': 'attachment;filename=invoice.pdf'
    });
    
    invoiceGenerator.invoiceGenerator(
       filename, 
        (chunk) => stream.write(chunk),
        () => stream.end()
    );

});


/*
*path load data from the file when triggered 
*print data to pdf and downloaded it
*/
router.get('/',(req, res, next) =>{
    const stream = res.writeHead(200, {
        'Content-Type':'application/pdf',
        'Content-Disposition': 'attachment;filename=invoice.pdf'
    });

    invoiceGenerator.invoiceGenerator(
        data,
        (chunk) => stream.write(chunk),
        () => stream.end()
    );

});


module.exports = router;