// const express = require('express');
import express from 'express'

const app = express();
const port = 4000;

app.get('/kits', (req, res) => {
    res.send('Hello world')
});

app.listen(port, () => {
    console.log('working')
})
