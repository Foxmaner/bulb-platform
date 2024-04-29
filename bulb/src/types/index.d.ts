declare module "index"{
    type Meeting = {
        name: string,
        progress?: number,
        completed?: boolean,
        date: string,
        sections?: [Section],
        summerySections?: [Section, Integer],
        history?: [MeetingHistory],
        members?: [Member]
    }

}
