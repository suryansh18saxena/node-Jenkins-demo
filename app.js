const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || 'Node Jenkins App';

app.get('/', (req, res) => {
    res.send(`${APP_NAME} is running successfully!`);
});

app.get('/health', (req, res) => {
    res.json({
        status: 'UP',
        application: APP_NAME
    });
});

app.listen(PORT, () => {
    console.log(`${APP_NAME} running on port ${PORT}`);
});

