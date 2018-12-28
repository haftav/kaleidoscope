import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App';
import fs from 'fs';
import path from 'path';

export default (req, res, next) => {
    const filepath = path.resolve(__dirname, '..', 'build', 'index.html');
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            console.error('There was an error:', err);
            return res.status(404).end();
        }
        const html = ReactDOMServer.renderToString(<App />);
        return res.send(
            data.replace(
                '<div id="root"></div>',
                `<div id="root">${html}</div>`
            )
        )
    })
}