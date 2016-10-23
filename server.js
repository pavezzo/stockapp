const express = require('express')
const app = express()

const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const routes = require('./app/routes/index.js')
const stock = require('./app/controllers/stockHandler.js')
const mongoose = require('mongoose')
const symbols = require('./app/controllers/saveSymbols.js')


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/stockapp')

routes(app)

server.listen(process.env.PORT || 8000)


io.on('connection', (socket) => {
    symbols.view((symbols) => {
        if (symbols.length > 0) {
            stock.multiple(symbols, (seriesData) => {
                if (io.sockets.connected[socket.id]) {
                    io.sockets.connected[socket.id].emit('newUser', seriesData, symbols);
                }
            })
        } else {
            io.sockets.connected[socket.id].emit('newUser', null, symbols);
        }
    })

    socket.on('update', (symbol) => {
        stock.single(symbol, (stockData) => {
            if (stockData[0]) {
                symbols.save(symbol);
                io.emit('update', stockData)
            }
        })
    })

    socket.on('delete', (symbol) => {
        symbols.delete(symbol)
        io.emit('delete', symbol)
    })
})
