import express from 'express'
import cors from 'cors'
import data from './assets/KITS_SHIPPING_DATA.json' assert {type: 'json'}

// index each kit by its label ID
const indexedKits = {};
data.forEach((kit) => {
    indexedKits[kit.label_id] = kit;
});

const app = express();
const port = 4000;

app.use(cors());

app.get('/kits/:labelId', (req, res) => {
    const labelId = req.params['labelId'];
    const kit = indexedKits[labelId];
    // res.setHeader('Access-Control-Allow-Origin', true);
    
    if (kit === undefined) {
        res.status(404).json({error: `Could not find kit with label ${labelId}`});
    } else {
        res.status(200).json(kit);
    }
    
});

app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
})
