import fs from "fs";

type Note = {
  id: number;
  title: string;
  author: string;
  content: string;
};

let raw = fs.readFileSync("pages/api/resolvers/db.json", "utf-8");
let data: Note[] = JSON.parse(raw);

const resolvers = {
  Query: {
    getNotes: () => data,
    getNote(parent, args: Pick<Note, "id">, context, info) {
      const note = data.find((el) => el.id == args.id);
      if (note === undefined)
        throw new Error(`Note with ${args.id} doesn't exist`);
      return note;
    },
  },
  Mutation: {
    addNote(parent, args: Omit<Note, "id">, context, info) {
      let note = {
        id: data.length,
        title: args.title,
        content: args.content,
        author: args.author,
      };
      data = [note].concat(data);
      fs.writeFileSync("pages/api/resolvers/db.json", JSON.stringify(data));
      return note;
    },
  },
};
export default resolvers;
