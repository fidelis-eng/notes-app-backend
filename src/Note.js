class Note {
    constructor(id, title, createdAt, updatedAt, tags, body){
        this.id = id,
        this.title = title,
        this.createdAt = createdAt,
        this.updatedAt = updatedAt,
        this.tags = tags,
        this.body = body
    }
}

module.exports = Note