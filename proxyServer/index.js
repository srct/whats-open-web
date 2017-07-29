const express = require('express')
const proxy = require('http-proxy-middleware')
const app = express()

app.use('/api', proxy('/api',{target: 'https://whatsopen.dhaynes.xyz', changeOrigin: true}));

app.listen(3001)
