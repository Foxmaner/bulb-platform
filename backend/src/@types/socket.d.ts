declare module "socket" {
    interface ISection {
        meetingId: string
    }
    
    interface IParagraph {
        meetingId: string,
        sectionId: string,
    }
    
    interface IParagraphEdit {
        meetingId: string,
        sectionId: string,
        parahraphId: string,
        patches: string,
    }
}