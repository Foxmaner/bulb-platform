import { Request, Response } from "express";
import { UserModel } from "../../models";
import commonWords from "../../../words.json";

export default class WordcloudController {
  static async delete(req: any, res: Response) {
    const userID = req.session.passport.user;
    const respUser = await UserModel.get(userID);
    const user = respUser.body.user;
    const id = req.params.id;

    if (respUser.statusCode != 200) {
      return res.status(401).json(respUser.body);
    }
  }

  static async create(req: any, res: Response) {
    const userID = req.session.passport.user;
    const respUser = await UserModel.get(userID);
    const user = respUser.body.user;
    const meetingId = req.params.meetingId;

    if (respUser.statusCode != 200) {
      return res.status(401).json(respUser.body);
    }

    const resp = await user.getMeeting(meetingId);
    const meeting = resp.body.meeting;


    if (process.env.DEBUG == "true") {
      console.log(resp.body);
    }

    if (resp.statusCode != 200) {
      return res.status(400).json(resp.body);
    }

    let text = "";

    const sections = meeting.sections;

    sections.forEach((section, index) => {
      let paragraphs = section.contains;
      paragraphs.forEach((paragraph, index) => {
        text += paragraph.body;
        text += " ";
      });
    });

    //should be rewritten. Å/Ä/Ö words dosnt get filterd and the word is returned without the Å/Ä/Ö
    //also no wheight has been implementetd. could use type WordcloudWort?
    const ContentString = text;

    const commonWordsSet = new Set(
      commonWords.map((word) => word.toLowerCase())
    );
    const words = ContentString.match(/\b[\wåäöÅÄÖ'-]+\b/g) || [];
    const filteredWords = words.filter(
      (word: string) => !commonWordsSet.has(word.toLowerCase())
    );
    const wordsLeft = filteredWords.join(" ");


    const cnt = wordsLeft.toLowerCase().match(/\w+/g);  // Convert text to lower case and split into words
    const wordCount = {};

    if (!cnt) return res.status(200).json({ words: wordCount });

    cnt!.forEach(word => {
        if (wordCount[word]) {
            wordCount[word] += 1;  // Increment count if word exists
        } else {
            wordCount[word] = 1;  // Initialize count if word does not exist
        }
    });

    return res.status(200).json({ words: wordCount });
  }

  static edit(req: Request, res: Response) {}
}
