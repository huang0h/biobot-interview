import express from 'express'
import cors from 'cors'
import data from './assets/KITS_SHIPPING_DATA.json' assert {type: 'json'}

// index each kit by its label ID to speed up searching for an individual kit
const indexedKits = {};
data.forEach((kit) => {
  indexedKits[kit.label_id] = kit;
});

const app = express();
const port = 4000;

// set cors so the frontend can make API calls
app.use(cors());

/* 
Route to search for a kit with the specified label

Params:
  - labelId: the label to search for
 
Returns: 
  - 200: if a kit could be found, with its data as the body
    Response body: {kit: {id: number, label_id: string, shipping_tracking_code: string}}
  - 404: if a kit could not be found
 */
app.get('/kits/search/:labelId', (req, res) => {
  const labelId = req.params['labelId'];
  const kit = indexedKits[labelId];

  if (kit === undefined) {
    res.status(404).send(`Could not find kit with label ${labelId}`);
  } else {
    res.status(200).json({kit});
  }
});

/*
Route to retrieve all known kit labels to use as autofill options

Params:
  - None
Returns:
  - 200: all known kit labels
    Response body: {labels: string[]}
*/
app.get('/kits/labels', (req, res) => {
  res.status(200).json({labels: Object.keys(indexedKits)});
})

app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
})
