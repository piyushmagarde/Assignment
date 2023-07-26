const app = require('./App');
const env = require('dotenv').config();
const port = process.env.PORT || 3000;
const sequelize = require('./DB/db');

// Start the server and handle database connectivity
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to MySQL using Sequelize!');
        await sequelize.sync({
            force: false
        }); // Sync the models with the database and run migrations
        console.log('Models synced with the database!');

        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error connecting to MySQL:', error.message);
    }
})();