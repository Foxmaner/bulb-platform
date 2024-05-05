

declare module "index" {
    type User = {
        _id: number;
        name: string;
        role: string;
        team: string;
        status: string;
        age: string;
        avatar: string;
        email: string;
    }

    type Company = {
        companyID: ObjectId,
        name: string
    }

    type Meeting = {
        _id: string,
        name: string,
        team: string,
        status: string,
        date: string,
        sections: Section[],
        summerySections?: Section,
        members?: Member[]
    }

    type Template = {
        _id: string,
        name: string,
        team: string,
        status: string,
        date: string,
        sections?: Section[]
    }

    type Text = {
        comments: Comment[],
        history: [],
        text: string
    }

    type Section = {
        _id: string,
        title: string,
        contains: paragraph[]
    }

    type Paragraph = {
        _id: string,
        title?: Text,
        body: Text,
        useTitle?: boolean
    }




    type Template = {
        name: string,
        date: Date,
        mainDocumentSections?: [Section],
        summaryDocumentSections?: [Section, Integer]
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

    type Member = {
        userID: ObjectId,
        expiryDate: Date | never,
        accessLevel: Integer
    }


}


