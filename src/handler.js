/*  eslint linebreak-style: ["error", "windows"]  */

const { nanoid } = require('nanoid');
const Note = require('./Note');
const notes = require('./notes');

// add_note
const addNote = (request, h) => {
  let isSuccess = false;
  const { title, tags, body } = request.payload;

  const id = `notes-${nanoid()}`;
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  notes.push(new Note(id, title, createdAt, updatedAt, tags, body));

  if (notes[notes.length - 1].id === id) {
    isSuccess = true;
  }

  if (isSuccess !== false) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    response.type('application/json');
    response.header('X-Custom', 'some-value');
    return response;
  }
  const response = h.response(
    {
      status: 'fail',
      message: 'Catatan gagal ditambahkan',
    },
  );

  response.statusCode = 500;
  response.type('application/json');
  response.header('X-Custom', 'some-value');

  return response;
};

// show all notes
const showAllNotes = (request, h) => {
  const searchNotes = [];
  for (let i = 0; i < notes.length; i += 1) {
    searchNotes.push({
      id: notes[i].id,
      title: notes[i].title,
      body: notes[i].body,
    });
  }

  const response = h.response(
    {
      status: 'success',
      data: {
        notes: searchNotes,
      },
    },
  );

  response.statusCode = 200;
  response.type('application/json');
  response.header('x-custom', 'some-value');

  return response;
};

// show note
const showNote = (request, h) => {
  const { id } = request.params;

  let isExist = false;
  let searchNote = null;

  for (let i = 0; i < notes.length; i += 1) {
    if (id === notes[i].id) {
      searchNote = notes[i];
      isExist = true;
    }
  }

  if (isExist) {
    const response = h.response(
      {
        status: 'success',
        data: {
          note: searchNote,
        },
      },
    );
    response.statusCode = 200;
    response.type('application/json');
    response.header('x-custom', 'some-value');

    return response;
  }
  const response = h.response(
    {
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    },
  );
  response.statusCode = 404;
  response.type('application/json');
  response.header('x-custom', 'some-value');

  return response;
};

// update_note
const updateNote = (request, h) => {
  const { title, tags, body } = request.payload;
  const { id } = request.params;

  let isExist = false;
  let note = null;

  for (let i = 0; i < notes.length; i += 1) {
    if (id === notes[i].id) {
      note = notes[i];
      isExist = true;
    }
  }
  if (isExist) {
    if (title != null) {
      note.title = title;
    }
    if (tags != null) {
      note.tags = tags;
    }
    if (body != null) {
      note.body = body;
    }
    note.updatedAt = new Date().toISOString();

    const response = h.response(
      {
        status: 'success',
        message: 'Catatan berhasil diperbaharui',
      },
    );

    response.statusCode = 200;
    response.type('application/json');
    response.header('X-Custom', 'some-value');

    return response;
  }
  const response = h.response(
    {
      status: 'fail',
      message: 'Gagal memperbarui catatan. Id catatan tidak ditemukan',
    },
  );

  response.statusCode = 404;
  response.type('application/json');
  response.header('X-Custom', 'some-value');

  return response;
};

// delete_note
const deleteNote = (request, h) => {
  const { id } = request.params;

  let idxDeleteNote = 0;
  let isExist = false;

  for (let i = 0; i < notes.length; i += 1) {
    if (id === notes[i].id) {
      isExist = true;
      idxDeleteNote = i;
      break;
    }
  }

  if (isExist) {
    notes.splice(idxDeleteNote, 1);

    const response = h.response(
      {
        status: 'success',
        message: 'Catatan berhasil dihapus',
      },
    );

    response.statusCode = 200;
    response.type('application/json');
    response.header('X-Custom', 'some-value');

    return response;
  }
  const response = h.response(
    {
      status: 'fail',
      message: 'Catatan gagal dihapus. Id catatan tidak ditemukan',
    },
  );
  response.statusCode = 404;
  response.type('application/json');
  response.header('X-Custom', 'some-value');

  return response;
};

module.exports = {
  addNote,
  showAllNotes,
  showNote,
  updateNote,
  deleteNote,
};
