declare module "index" {

    type User = {
        name: string,
        accesLevel: Integer,
        companyID: ObjectId,
        accessibleMeetings: [ObjectId]
    }

    type Company = {
        name: string
    }

    type WordCloudWord = {
        word: string,
        weight: Number
    }
    
    type Section = {
        id: Integer,
        title: string,
        contains: [Paragraph, Question, Image], // Add a comma here
        sectionHistory: []
    }
    
    type SectionHistory = {
        userID: ObjectId,
        date: Date,
        contentIndex: Number,
        added: boolean
    }
    
    type Paragraph = {
        id: Integer,
        paragraphHistory: [ParagraphHistory],
        comments: [Comment]
    }
    
    type ParagraphHistory = {
        userID: ObjectId,
        date: Date,
        textIndex: Number,
        added: boolean,
        text: string
    }
    
    type Comment = {
        userID: ObjectId,
        date: Date,
        index: Integer,
        text: string
    }
    
    type Question = {
        id: Integer,
        responses: [Answer],
        questionText: Paragraph,
        summaryText: Paragraph,
        questionHistory: [QuestionHistory]
    }
    
    type QuestionHistory = {
        userID: ObjectId,
        date: Date,
        answerIndex: Integer,
        added: boolean
    }
    
    type Answer = {
        xCoord: Number,
        yCoord: Number,
        size: Number,
        text: Paragraph,
        image: Image
    }
    
    type Image = {
        id: Integer,
        url: string
    }
    
    type MeetingHistory = {
        userID: ObjectId,
        date: Date,
        sectionID: Integer,
        added: boolean
    }
    
    type Member = {
        userID: ObjectId,
        expiryDate: Date,
        accessLevel: Integer
    }
}