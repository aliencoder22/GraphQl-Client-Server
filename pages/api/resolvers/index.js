import data from "./data";

const resolvers = {
  Query: {
    getNotes: () => data,
    getNote(parent, args, context, info) {
      const note = data.find((el) => el.id == args.id);
      if (note === undefined)
        throw new Error(`Note with ${args.id} doesn't exist`);
      return note;
    },
  },
  Mutation: {
    addNote(parent, args, context, info) {
      let note = {
        id: data.length,
        title: args.title,
        content: args.content,
        author: args.author,
      };
      data.push(note);
      return note;
    },
  },
};
export default resolvers;
