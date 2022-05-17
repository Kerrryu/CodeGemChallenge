const DatabaseFactory = require("../providers/database");

class FeedbackRepository {
    constructor() {
        this.dbProvider = DatabaseFactory.getDatabaseProvider();
        this.tableName = "feedback";
    }

    saveFeedback({ source, feedback }) {
        return this.dbProvider.add(this.tableName, { feedback, source }).then(([id]) => id);
    }

    getFeedback() {
        return this.dbProvider.fetchFeedback();
    }
}

module.exports = FeedbackRepository;