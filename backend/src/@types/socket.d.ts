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
        patches: any,
    }

    interface ICursor{
        xPos: string,
        yPos: string,
    }
}