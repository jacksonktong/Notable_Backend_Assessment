const express = require('express');
const app = express();
const PORT = 3000;
const router = require('./routes/apiRouter.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

//404 Error 
app.use('*', (req, res) => {
  res.status(404).send('Not found')
})

//Global Error Handler
app.use((err, req, res, next)=> {
  console.log('Global Error Message:', err);
  res.status(500).send('Server Error');
})

app.listen(PORT, () => {
  console.log(`> Ready on http://localhost:${PORT}`);
})