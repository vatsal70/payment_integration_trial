const express = require('express');
const Razorpay = require('razorpay');




// KEYID: rzp_test_ccZHUHneZJwKNv
//KEY SECRET: HaZqPFlsN1zgJsWlCx3AnACu



let app = express()

const razorpay = new Razorpay({
    key_id: 'rzp_test_ccZHUHneZJwKNv',
    key_secret: 'HaZqPFlsN1zgJsWlCx3AnACu'
})


app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))

app.use(express.static('public'));
app.use('/images', express.static('images'));

app.get('/', (req, res) => {
    res.render('razorpay.ejs')
})


app.post('/order', (req, res) => {
    let options = {
        amount: 50000,
        currency: "INR",
        receipt: "receipt#1"
      };

      razorpay.orders.create(options, function (err, order){
        //   console.log(order)
          res.json(order)
      })
})


app.post('/is-order-complete', (req, res) => {
    razorpay.payments.fetch (req.body.razorpay_payment_id).then((paymentDocument) => {
        // console.log(paymentDocument.captured)
        if(paymentDocument.captured == true){
            res.send("Payment successfull.")
        }
        else{
            res.send("Payment unsuccessfull.")
        }
    })
})

app.listen(5000)