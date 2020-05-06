const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const searchRouter = require('./routes/search');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());

// Handle static files
// app.use('/assets', express.static(path.resolve(__dirname, '../client')));

app.use('/api/search', searchRouter);
app.use('/api', authRouter);


// If we are in production mode, serve files here
// if (process.env.NODE_ENV === 'production') {
app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/main', (req, res) => {
    return res.status(200)
                .sendFile(path.join(__dirname, '../client/index.html'));
});

// }

// Default status of 404 sent if any non-handled route is entered
// app.use((req, res) => res.sendStatus(404));


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});



