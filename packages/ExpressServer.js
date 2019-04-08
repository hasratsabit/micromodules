const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

class ExpressServer {
    constructor() {
        this.app = express();
    }

    async start(options = {}) {
        try {
            this.app.use(bodyParser.json());
            this.app.use(bodyParser.urlencoded({extended: false}));
            this.app.use(cors());
            const port = options.httpPort || 3000;
            this.app.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
        } catch (error) {
            
        }
    }
}

class ExpressSingleton {
    static getInstance() {
        if(!ExpressSingleton.instance) ExpressSingleton.instance = new ExpressServer();
        return ExpressSingleton.instance;
    }
}

module.exports = ExpressSingleton;