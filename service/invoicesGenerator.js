const PDFGenerator = require("pdfkit");
const request = require("request");


/*
*this read the json file and generate a pdf
*/
function invoiceGenerator(data,dataCallback, endCallback){
    const nameProduct_x = 25;
    const sku_x = 200;
    const vendorName_x = 100;
    const quantity_x = 400;
    const price_x = 200;
    const table_y = 335;

    const doc = new PDFGenerator({size: 'A4'});
    doc.on('data', dataCallback);
    doc.on('end', endCallback);
    

    doc.image("./docs/beeanco.png", 150, 25, {width: 150, align: "center"});
    doc.fillColor("#000")
        .fontSize(16)
        .text("INVOICE", 25, 200, {align: "left", bold:true})
        .fontSize(10)
        .text(`Order: ${data.order.id}`, {align: "left"})
        .text(`First Name: ${data.order.buyer.firstName}`, {align: "left"})
        .text(`Last Name: ${data.order.buyer.lastName }`, {align: "left"});

    doc.fillColor("#000")
        .fontSize(16)
        .text("SHIPPING ADDRESS", 350, 200, {align: "right", bold:true})
        .fontSize(10)
        .text(`Name: ${data.order.shippingAddress.name}`, {align: "right"})
        .text(`Address: ${data.order.shippingAddress.address1}`, {align: "right"})
        .text(`Zip Code: ${data.order.shippingAddress.zip }`, {align: "right"})
        .text(`City: ${data.order.shippingAddress.city}`, {align:"right"});

    doc.fillColor("#000")
        .fontSize(14)
        .text("Name of Product", nameProduct_x, table_y,{align: "left", bold:true});
    doc.fillColor("#000")
        .fontSize(14)
        .text("Sku", sku_x, table_y,{bold: true});
    doc.fillColor("#000")
        .fontSize(14)
        .text("Vendor Name", vendorName_x, table_y,{align: "center", bold: true});
    doc.fillColor("#000")
        .fontSize(14)
        .text("Quantity", quantity_x, table_y, {bold: true});
    doc.fillColor("#000")
        .fontSize(14)
        .text("Price", price_x, table_y,{align: "right",bold: true});

    //trasver the items in json file and write it as a table
    let items = data.order.items;
    for(let idx = 0; idx < items.length; idx++){
        let coord_y = table_y + 25 + (idx * 25);
        doc.fillColor("#000")
            .fontSize(10)
            .text(`${data.order.items[idx].product.name}`, nameProduct_x, coord_y,{align: "left"})
            .text(`${data.order.items[idx].product.sku}`, sku_x, coord_y,)
            .text(`${data.order.items[idx].product.vendor.name}`, vendorName_x, coord_y,{align: "center"})
            .text(`${data.order.items[idx].quantity}`, quantity_x, coord_y)
            .text(`${data.order.items[idx].price}`, price_x, coord_y,{align: "right"})
    }


    doc.end();


}


module.exports = {invoiceGenerator};