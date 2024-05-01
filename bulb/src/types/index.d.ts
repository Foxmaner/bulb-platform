declare module "index"{
    //Här skrivs olika typer

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
        _id: number,
        name: string,
        team: string,
        status: string,
        date: string,
        mainDocumentSections?: [Section],
        summaryDocumentSections?: [Section, Integer],
        members?: [Member]
    }
    
    type Template = {
        _id: number,
        name: string,
        team: string,
        status: string,
        date: string,
        mainDocumentSections?: [Section]
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
}


