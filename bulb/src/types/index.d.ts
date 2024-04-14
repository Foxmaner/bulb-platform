declare module "index"{
    //Här skrivs olika typer

    interface Example{}

    type section = {
        _id: string,
        paragraphs?: paragraph[]
        questions? : question[]
    }

    type paragraph = {
        title?: string;
    }
    type question = {
        title?: string
        answer?: string
    }
}


