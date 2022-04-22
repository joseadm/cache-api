/* eslint-disable import/first */
import dotenv from 'dotenv';

const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: '.env.default' });
}

import util from 'util';
import app from './app';
import SafeMongooseConnection from './lib/safe-mongoose-connection';

const PORT = process.env.PORT || 3000;

let debugCallback;
if (process.env.NODE_ENV === 'development') {
  debugCallback = (collectionName: string, method: string, query: any, doc: string): void => {
    const message = `${collectionName}.${method}(${util.inspect(query, { colors: true, depth: null })})`;
    console.log(message);
  };
}

const safeMongooseConnection = new SafeMongooseConnection({
  mongoUrl: process.env.MONGO_URL ?? '',
  debugCallback,
  onStartConnection: mongoUrl => console.log(`Connecting to MongoDB at ${mongoUrl}`),
  onConnectionError: (error, mongoUrl) =>   console.log(mongoUrl),
  onConnectionRetry: mongoUrl => console.log(`Retrying to MongoDB at ${mongoUrl}`)
});

const serve = () => app.listen(PORT, () => {
  console.log(`Express server started at http://localhost:${PORT}`);

  if (process.env.NODE_ENV === 'development') {
    // This route is only present in development mode
    console.log(`Swagger UI hosted at http://localhost:${PORT}/dev/api-docs`);
  }
});

if (process.env.MONGO_URL == null) {
    console.log('MONGO_URL not specified in environment', new Error('MONGO_URL not specified in environment'));
  process.exit(1);
} else {
  safeMongooseConnection.connect(mongoUrl => {
    console.log(`Connected to MongoDB at ${mongoUrl}`);
    serve();
  });
}

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
  console.log('\n'); /* eslint-disable-line */
  console.log('Closing the MongoDB connection');
  safeMongooseConnection.close(err => {
    if (err) {
      console.log(`Error shutting closing mongo connection do to ${err}`);
    } else {
      console.log('Mongo connection closed successfully');
    }
    process.exit(0);
  }, true);
});
