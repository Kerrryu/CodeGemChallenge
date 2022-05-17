const FeedbackRepository = require("../repositories/feedback");
const TagRepository = require("../repositories/tag");
const MoodRepository = require("../repositories/mood");
const FeedbackTransformer = require("../transformers/feedback");

class FeedbackService {
    constructor() {
        this.repository = new FeedbackRepository();
        this.moodRepository = new MoodRepository();
        this.tagRepository = new TagRepository();
    }

    saveFeedback(feedbackRequest) {
        let feedback = FeedbackTransformer.requestToModel(feedbackRequest);

        return this.repository.saveFeedback(feedback).then(id => {
            return Promise.all([this.moodRepository.saveMoods(feedback.moods.map(m => { 
                                    m.feedbackId = id;
                                    return m;
                                })),
                                this.tagRepository.saveTags(feedback.tags.map(f => { 
                                    f.feedbackId = id;
                                    return f; 
                                }))])
                    .then(results => ({ id }));
        });
    }

    getFeedback() {
        // let result = await this.repository.getFeedback().then(feedbacks => {
        //     return Promise.all(feedbacks.map(feedback => {
        //         return Promise.all([
        //             this.moodRepository.getMoodsByFeedbackId(feedback.id),
        //             this.tagRepository.getTagsByFeedbackId(feedback.id)
        //         ]).then(results => {
        //             console.log(results);
        //             feedback.moods = results[0];
        //             feedback.tags = results[1];
        //             return feedback;
        //         });
        //     }));
        // }).catch(err => {
        //     console.log(err);
        // });
        let result = this.repository.getFeedback().catch(err => { console.log(err); });
        return result;
    }

    getConsecutiveFeedback() {
        let count = 1;
        let lastDate = null;

        let feedbacks = this.repository.getFeedback().catch(err => { console.log(err); });
        // Compare feedback dates for consecutive count
        for (let i = 0; i < feedbacks.length; i++) {
            if (lastDate === null) {
                lastDate = feedbacks[i].createdat;
            } else {
                if (Date.parse(feedbacks[i].createdat) - Date.parse(lastDate) <= 86400000) {
                    count++;
                } else {
                    count = 1;
                }
                lastDate = feedbacks[i].createdat;
            }

            // When it's the last index we want to check the date with the current date to see if it's still keeping the streak
            if(i == feedbacks.length - 1) {
                let current_date = new Date();
                if(Date.parse(feedbacks[i].createdat) - Date.parse(current_date) <= 86400000) {
                    
                } else {
                    count = 1;
                }

                // Reset count if last feedback is on a weekend
                if(getWeekDay(Date.parse(feedbacks[i].createdat) == "SA" || getWeekDay(Date.parse(feedbacks[i].createdat) == "SU"))) {
                    count = 1;
                }
            }
        }

        return count;
    }

    getConsecutiveFeedbackTest() {
        let count = 1;
        let lastDate = null;

        let feedbacks = [
            {"id":1,"feedback":"test","source":"http://localhost:8080/","createdat":"2022-05-01T00:32:25.793Z","mood":"grin","feedback_id":1,"tag":"Mentorship"},
            {"id":2,"feedback":"test","source":"http://localhost:8080/","createdat":"2022-05-02T00:32:25.793Z","mood":"grin","feedback_id":1,"tag":"Mentorship"},
            {"id":3,"feedback":"test","source":"http://localhost:8080/","createdat":"2022-05-08T00:32:25.793Z","mood":"grin","feedback_id":1,"tag":"Mentorship"},
            {"id":4,"feedback":"test","source":"http://localhost:8080/","createdat":"2022-05-09T00:32:25.793Z","mood":"grin","feedback_id":1,"tag":"Mentorship"},
            {"id":5,"feedback":"test","source":"http://localhost:8080/","createdat":"2022-05-14T00:32:25.793Z","mood":"grin","feedback_id":1,"tag":"Mentorship"},
            {"id":6,"feedback":"test","source":"http://localhost:8080/","createdat":"2022-05-15T00:32:25.793Z","mood":"grin","feedback_id":1,"tag":"Mentorship"},
            {"id":7,"feedback":"test","source":"http://localhost:8080/","createdat":"2022-05-16T00:32:25.793Z","mood":"grin","feedback_id":1,"tag":"Mentorship"},
        ]
        
        // Compare feedback dates for consecutive count
        for (let i = 0; i < feedbacks.length; i++) {
            if (lastDate === null) {
                lastDate = feedbacks[i].createdat;
            } else {
                if (Date.parse(feedbacks[i].createdat) - Date.parse(lastDate) <= 86400000) {
                    count++;
                } else {
                    count = 1;
                }
                lastDate = feedbacks[i].createdat;
            }

            // When it's the last index we want to check the date with the current date to see if it's still keeping the streak
            if(i == feedbacks.length - 1) {
                let current_date = new Date();
                if(Date.parse(feedbacks[i].createdat) - Date.parse(current_date) <= 86400000) {
                    
                } else {
                    count = 1;
                }
            }

            // Reset count if last feedback is on a weekend
            if(getWeekDay(Date.parse(feedbacks[i].createdat) == "SA" || getWeekDay(Date.parse(feedbacks[i].createdat) == "SU"))) {
                count = 1;
            }
        }

        return count;
    }
}

module.exports = FeedbackService;