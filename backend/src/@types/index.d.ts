declare module "index" {

    type Meeting = {
        name: string,
        progress?: number,
        completed?: boolean,
        scheduledStart?: Date,
        scheduledEnd?: Date,
        created: Date,
        sections?: [Section],
        summerySections?: [Section, Integer],
        history?: [MeetingHistory],
        members?: [Member],
        published?: boolean
        status?: Status
    }

    type Status = "inprogress" | "done" | "upcomming"

    type Template = {
        name: string,
        date: Date,
        sections?: [Section],
        summerySections?: [Section, Integer]
    }

    type User = {
        oAuthID: string,
        oAuthProvider: "google" | "github",
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
        weight: number
    }

    type Section = {
        title: string,
        contains: (Paragraph | Question | Image)[],
        history: []
    }
    
    type SectionHistory = {
        userID: ObjectId,
        date: Date,
        contentIndex: number,
        added: boolean
    }
    
    type Text = {
        text: string,
        history?: [ParagraphHistory],
        comments?: [Comment]
    }

    type Paragraph = {
        _id?: Integer,
        title: Text,
        body: Text
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
        size?: number,
        content: Paragraph,
        _id?: number,
        dateCreated?: Date,
        createdBy: String,
        image?: Image
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
        expiryDate: Date | never,
        role: String
    }
}

declare module "accessLevels" {
    type MemberAccessLevel = "reviewer" | "editor" | "owner";
    type UserAccessLevel = "generic" | "admin";
}
