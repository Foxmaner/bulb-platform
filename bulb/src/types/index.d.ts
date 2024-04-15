declare module "index"{
    //Här skrivs olika typer

    interface Example{}

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
}


