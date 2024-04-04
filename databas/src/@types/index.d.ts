declare module "index" {

    type Meeting = {
        name: string,
        progress?: number,
        completed?: boolean,
        owner: ObjectId,
        date: Date,
        mainDocumentSections?: [Section],
        summaryDocumentSections?: [Section, Integer],
        meetingHistory?: [MeetingHistory],
        members?: [Member]
    }

    type User = {
        oAuthID: string,
        oAuthProvider: "google" | "github",
        name: string,
        accesLevel: Integer,
        companyID: ObjectId,
        accessibleMeetings: [ObjectId]
        token: string
    }

    type Company = {
        name: string
    }

    type WordCloudWord = {
        word: string,
        weight: number
    }

    type Section = {
        id: Integer,
        title: string,
        contains: (Paragraph | Question | Image)[],
        sectionHistory: []
    }
    
    type SectionHistory = {
        userID: ObjectId,
        date: Date,
        contentIndex: number,
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
        textIndex: number,
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
        xCoord: number,
        yCoord: number,
        size: number,
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
    
    type MemberAccessLevel = "reviewer" | "editor" | "owner" | "admin" 
    type Member = {
        userID: ObjectId,
        expiryDate: Date | never,
        accessLevel: MemberAccessLevel
    }
}