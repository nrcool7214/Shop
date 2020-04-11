const myMiddleware = (req, res, next) => {
    // console.log(req.originalUrl);
    // console.log(req.method);
    // console.log(req.body);

    // if (req.method === 'POST') {
    //     res.send('Response from middleware')
    // } else {
    //     next()
    // }

    next()
}

module.exports = myMiddleware