const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('@elastic/elasticsearch');
const cors = require('cors');

const app = express();
const port = 3001;

const esClient = new Client({ node: 'http://localhost:9200' });

app.use(cors());
app.use(bodyParser.json());

app.get('/api/data', async (req, res) => {
  try {
    const result = await esClient.search({
      index: 'sample_index',
      body: {
        query: {
          match_all: {},
        },
      },
    });

    console.log('Elasticsearch Response:', JSON.stringify(result, null, 2));

    const hits = result && result && result.hits && result.hits.hits
      ? result.hits.hits.map(hit => hit._source)
      : [];

    console.log('Hits:', hits);
    res.json(hits);
  } catch (error) {
    console.error('Error from Elasticsearch:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
