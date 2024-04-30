import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const createdUser = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (createdUser) {
        // call login method
        return this.login({ email, password });
      } else {
        return createdUser;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      await account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await account.get();
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;