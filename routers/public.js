const path = require('path');
const fs = require('fs');
const express = require('express');

function renderPage(_, res) {
  try {
    const indexHtmlPath = path.join(__dirname, '../client/build/index.html');
    console.log(indexHtmlPath);
    const indexTemp = fs.readFileSync(indexHtmlPath, 'utf8');
    res.setHeader('Cache-Control', 'no-cache');
    res.send(indexTemp);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
}

module.exports = (app) => {
  app.use(
    '/static',
    express.static(path.join(__dirname, '../client/build/static'), {
      maxAge: '1y',
    })
  );
  // eslint-disable-next-line no-unused-vars
  app.get('*', (req, res, next) => {
    return renderPage(req, res);
  });
};
