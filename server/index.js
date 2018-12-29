import express from 'express';
import path from 'path';


import serverRenderer from './renderer';

const PORT = 4040;

const app = express();
const router = express.Router();

router.use('^/$', serverRenderer);
router.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use(router);

app.listen(PORT, function(err) {
    if (err) {
        console.error('there was an error');
    } else {
        console.log(`Listening on port ${PORT}`)
    }
})