import conf from "../conf/conf.js";
import { Client, Databases, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
  }
  async createBlog({ title, content, slug, featuredImage, userId, status }) {
    try {
      const createdBlog = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
      return createdBlog;
    } catch (error) {
      throw error;
    }
  }
  async updateBlog(slug, { title, content, featuredImage, status }) {
    try {
      const updatedBlog = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
      return updatedBlog;
    } catch (error) {
      throw error;
    }
  }
  async deleteBlog(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }

  async getBlog(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }

  async getAllBlogs(queries = [Query.equal("status", "true")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      throw error;
    }
  }
}

const service = new Service();

export default service;
