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
            this.tablesDB.getRow(
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
           return await this.tablesDB.listRows(conf.appwriteDatabaseId,
                conf.appwriteDatabaseId,
                queries
            )
        }catch(err){

        }
    }

    async createPost({title, slug, content, featuredImage,status,userID}){
        try{
            return await this.tablesDB.createRow(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug,
                {
                    title, content, featuredImage, status, userID
                }
            )
        }catch(err){
            console.log(err);
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
            console.log(err)
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
            console.log(err)
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
            console.log(err)
        }
    }

    async deleteFile(fileId){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique()
            )
        }catch(err){
            console.log(err)
        }
    }

    getFilePreview(fileID){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileID
        )
    }
}





