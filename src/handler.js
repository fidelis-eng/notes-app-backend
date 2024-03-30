const Note = require('./Note');
const { nanoid } = require('nanoid');
const notes = require('./notes');
    
    //add_note
    const add_note =  (request, h) => {
        let isSuccess = false;
        const { title, tags, body } = request.payload;

        const id = `notes-${nanoid()}`
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt
        
        notes.push(new Note(id, title, createdAt, updatedAt, tags, body));

        if(notes[notes.length-1]["id"] === id){
            isSuccess = true
        }
            
        if(isSuccess != false) {
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
        else{
            const response = h.response(
            {
                status: "fail",
                message: "Catatan gagal ditambahkan",
            }
            );

            response.statusCode = 500;
            response.type('application/json');
            response.header('X-Custom', 'some-value');

            return response
        }

    }

    //show_note
    const show_notes_or_note = (request, h) => {
        const { id } = request.params
        
        if(id != null){
            let isExist = false
            let note = null

            for(let i=0 ; i < notes.length; i++){
                if (id == notes[i].id){
                    note = notes[i]
                    isExist = true
                }
            }

            if(isExist){
                const response = h.response(
                    {
                        status: "success",
                        data : {
                            note : note
                        } 
                    });
                    console.log(notes)
                    response.statusCode = 200;
                    response.type('application/json')
                    response.header('x-custom', 'some-value')

                    return response
            }
            else{
                const response = h.response(
                {
                    status: "fail",
                    message: "Catatan tidak ditemukan"
                }
                )
                response.statusCode = 404;
                response.type('application/json')
                response.header('x-custom', 'some-value')

                return response
            }
        }

        else{
            const response = h.response(
                {
                    status: "success",
                    data : {
                        notes : notes 
                    } 
                });

                response.statusCode = 200;
                response.type('application/json')
                response.header('x-custom', 'some-value')

                return response
        }
    }

    //update_note
    const update_note = (request, h) => {

        const { title, tags, body } = request.payload;
        const { id } = request.params;

        let isExist = false
        let note = null

        for(let i=0 ; i < notes.length; i++){
            if (id == notes[i].id){
                note = notes[i]
                isExist = true
            }
        }
        console.log(title,tags, body)
        if (isExist){
            if(title != null){
                note.title = title
            }
            if (tags != null){
                note.tags = tags
            }
            if (body != null){
                note.body = body
            }
            note.updatedAt = new Date().toISOString();

            const response = h.response(
            {
                status: "success",
                message: "Catatan berhasil diperbaharui"
            });

            response.statusCode = 200;
            response.type('application/json');
            response.header('X-Custom', 'some-value');

            return response
        }

        else {
            const response = h.response(
            {
                status: "fail",
                message: "Gagal memperbarui catatan. Id catatan tidak ditemukan"
            }
            );

            response.statusCode = 404;
            response.type('application/json');
            response.header('X-Custom', 'some-value');

            return response
        }
    }

    //delete_note
    const delete_note = (request, h) => {
        const {id} = request.params

        let isExist = false
        let note = null

        for(let i=0 ; i < notes.length; i++){
            if (id == notes[i].id){
                note = notes[i]
                isExist = true
            }
        }

        if (isExist){
            notes.splice(id, 1)

            const response = h.response(
            {
                status: "success",
                message: "Catatan berhasil dihapus"
            });

            response.statusCode = 200;
            response.type('application/json');
            response.header('X-Custom', 'some-value');
            
            return response
        }
        else {
            const response = h.response(
            {
                status: "fail",
                message: "Catatan gagal dihapus. Id catatan tidak ditemukan"
            });
            response.statusCode = 404;
            response.type('application/json');
            response.header('X-Custom', 'some-value');

            return response
        }
    }

module.exports = {add_note, show_notes_or_note, update_note, delete_note}
