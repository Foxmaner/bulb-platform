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
        meetingId: string,
        sectionId: string,
        parahraphId: string,
        patches: string,
    }

    interface ICursor{
        xPos: string,
        yPos: string,
    }
}