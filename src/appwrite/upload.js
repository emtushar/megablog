import conf from "../conf/conf.js";
import { Client, Storage } from "appwrite";

export class UploadService {
  client = new Client();
  storage;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.storage = new Storage(this.client);
  }
  async uploadImage(file) {
    try {
      await this.storage.createFile(conf.appwriteBucketId, file);
    } catch (error) {
      throw error;
    }
  }
}

const uploadService = new UploadService();

export default uploadService;
