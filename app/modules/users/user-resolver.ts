export const userResolver = {
  Query: {
    user: async (_, { id }, { dataSources }) => {
      const res = await dataSources.userData.getUserById(id);
      return res;
    },
    jwt: async (_, { email, password }, { dataSources }) => {
      const res = await dataSources.userData.login(email, password);
      return res;
    },
  },
  Mutation: {
    register: async (_, { user }, { dataSources }) => {
      const newUser = { ...user };
      return dataSources.userData.register(newUser);
    },
  },
};
