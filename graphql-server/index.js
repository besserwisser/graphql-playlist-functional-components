const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(
   'mongodb+srv://oli:123@cluster0-7cipm.mongodb.net/test?retryWrites=true&w=majority',
   { useUnifiedTopology: true, useNewUrlParser: true }
);

mongoose.connection.once('open', () => {
   console.log('connected to db');
});

const port = 4000;
const app = express();

// allow cross origin requests
app.use(cors());

const graphqlOptions = {
   schema,
   graphiql: true
};

app.use('/graphql', graphqlHTTP(graphqlOptions));

app.listen(port, () =>
   console.log(`now listening on requests on port ${port}`)
);
