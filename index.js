// Library imports
var express    = require('express')
var app        = express()
var bodyParser = require('body-parser')
var Web3 = require('web3')
var tokenIssue = require('./tokenIssue')

// Config imports
var config = require('./config')

// Web3 setup
var web3 = new Web3(config.rpc_address) //Genache for now make configurable
const gasPayingAccount = web3.eth.accounts.privateKeyToAccount(config.private_key)

// Express extentions
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var router = express.Router()

router.get('/', function(req, res) {
    res.json({ message: 'Welcome' })
})

router.get('/token/issue', function(req, res) {
    console.log(tokenIssue.computeSignature(1, 1, 1, web3))
    res.json({ message: 'token issued' })
})

// Base route 
app.use('/api', router)

app.listen(config.port)

console.log('Server is running on port: %i', config.port)
console.log('Server Node Version: %s', process.version)
console.log('Server Web3 version: %s', web3.version)
console.log('Server account address is: %s', gasPayingAccount.address)
console.log('http://localhost:%i/api', config.port)