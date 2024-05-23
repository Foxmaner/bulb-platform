declare module "socket" {
    interface ISection {
        meetingId: string
    }
    
    interface IParagraph {
        meetingID: string,
        sectionID: string,
        paragraphID: string,
    }
    
    interface IParagraphEdit {
        meetingID: string,
        sectionID: string,
        paragraphID: string,
        change: any,
    }

    interface ICursor{
        meetingID: string,
        user: string,
        sectionID: string,
        paragraphID: string,
        xPos: string,
        yPos: string,
    }

    interface INote{
        meetingID: string,
        answerID: string,
        sectionID: string,
        paragraphID: string,
        xPos: string,
        yPos: string,
        text: string,
    }
}