const yahooFinance = require('yahoo-finance')

exports.single = (symbol, callback) => {
    let date = new Date()
    date.setFullYear(date.getFullYear() - 1)

    yahooFinance.historical({
        symbol: symbol,
        from: date,
        period: 'd',
    }).then((result) => {
        callback(result)
    })
}


exports.multiple = (symbols, callback) => {
    let date = new Date()
    date.setFullYear(date.getFullYear() - 1)

    yahooFinance.historical({
        symbols: symbols,
        from: date,
        period: 'd',
    }).then((result) => {
        callback(result)
    })
}
