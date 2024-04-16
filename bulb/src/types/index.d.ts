declare module "index" {
    //Här skrivs olika typer

    interface Example { }

    type Meeting = {
        _id: string,
        sections: Section[]
    }

    type Section = {
        _id: string,
        title: string,
        paragraphs?: paragraph[]
    }

    type Paragraph = {
        title?: string;
        text: string;
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


