declare module "index"{
    //Här skrivs olika typer

    interface Example{}

    type Section = {
        _id: string,
        paragraphs?: paragraph[]
    }

    type Paragraph = {
        title?: string;
    }
}


