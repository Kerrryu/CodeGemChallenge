class Feedback {
    constructor(id, feedback, tags, moods, source, createdAt) {
        this.feedback = feedback;
        this.tags = tags;
        this.moods = moods;
        this.id = id;
        this.source = source;
        this.createdAt = createdAt;
    }
}

module.exports = Feedback;