import conf from "../conf/conf";
import { Client, TablesDB,Storage,Query, ID} from "appwrite";

export class Service{
    client = new Client();
    tablesDB;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.tablesDB = new TablesDB(this.client)
        this.bucket = new Storage(this.client)
    }

    async getPost(slug){
        try{
           return await this.tablesDB.getRow(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug
            )
        }catch(err){
            console.log("Appwrite Service :: getPost() ::", err)
        }
    }

    async getPosts(queries = [Query.equal("stutus","active")]){
        try{
           return await this.tablesDB.listRows(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                queries
            )
        }catch(err){
            console.log("Appwrite Service :: getPosts() ::", err)
        }
    }

    async createPost({title, slug, content, featuredImage,status,userID}){
        try{
            return await this.tablesDB.createRow(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                ID.unique(),
                {
                    title, content, featuredImage, status, userId:userID
                }
            )
        }catch(err){
             console.log("Appwrite Service :: createPost() ::", err)
        }
    }

    async updatePost(slug, {title, content, featuredImage,status}){
        try{
            return await this.tablesDB.updateRow(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug,
                { title, content,featuredImage,status }
            )
        }catch(err){
             console.log("Appwrite Service :: updatePost() ::", err)
        }

    }

     async deletePost(slug){
        try{
            await this.tablesDB.deleteRow(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug
            )
        }catch(err){
             console.log("Appwrite Service :: deletePost() ::", err)
        }

    }


    //Storage Service

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }catch(err){
             console.log("Appwrite Service :: uploadFile() ::", err)
        }
    }

    async deleteFile(fileId){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique()
            )
        }catch(err){
             console.log("Appwrite Service :: deleteFile() ::", err)
        }
    }

    async getFilePreview(fileID) {
        try {
            // Returns a URL string directly usable in img src
            return this.bucket.getFileView(conf.appwriteBucketId, fileID);
        } catch(err) {
            console.log("Appwrite Service :: getFilePreview() ::", err);
            return null;
        }
    }

}
const appWriteService = new Service();
export default appWriteService





