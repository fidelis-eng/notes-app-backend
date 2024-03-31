/*  eslint linebreak-style: ["error", "windows"]  */

const handler = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: handler.showNote,
  },
  {
    method: 'POST',
    path: '/notes',
    handler: handler.addNote,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: handler.showAllNotes,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: handler.deleteNote,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.updateNote,
  },
];

module.exports = routes;
