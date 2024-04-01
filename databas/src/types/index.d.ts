declare module "validators" {

    type Integer = {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} is not an integer value"
        }
    }
}

declare module "index" {

    interface WordCloudWord {
        word: string,
        weight: Number
    }
    
    interface Section {
        id: Integer,
        title: string,
        contains: [Paragraph, Question, Image],
        sectionHistory: []
    }
    
    interface SectionHistory {
        userID: ObjectId,
        date: Date,
        contentIndex: Number,
        added: boolean
    }
    
    interface Paragraph {
        id: Integer,
        paragraphHistory: [ParagraphHistory],
        comments: [Comment]
    }
    
    interface ParagraphHistory {
        userID: ObjectId,
        date: Date,
        textIndex: Number,
        added: boolean,
        text: string
    }
    
    interface Comment {
        userID: ObjectId,
        date: Date,
        index: Integer,
        text: string
    }
    
    interface Question {
        id: Integer,
        responses: [Answer],
        questionText: Paragraph,
        summaryText: Paragraph,
        questionHistory: [QuestionHistory]
    }
    
    interface QuestionHistory {
        userID: ObjectId,
        date: Date,
        answerIndex: Integer,
        added: boolean
    }
    
    interface Answer {
        xCoord: Number,
        yCoord: Number,
        size: Number,
        text: Paragraph,
        image: Image
    }
    
    interface Image {
        id: Integer,
        url: string
    }
    
    interface MeetingHistory {
        userID: ObjectId,
        date: Date,
        sectionID: Integer,
        added: boolean
    }
    
    interface Member {
        userID: ObjectId,
        expiryDate: Date,
        accessLevel: Integer
    }
    
    
}