// import axios from 'axios'
import Post from '../models/Post.js'

 const homePosts = async (req,res) =>
{
    const page = req.params.page;
    const perPage = 6 ;
    const skip = (page - 1) * perPage;
    try {
        const count  = await  Post.find({}).countDocuments();
        const posts = await Post.find({}).skip(skip).limit(perPage).sort({updatedAt:-1});
        return res.status(200).json({posts,count,perPage});
    } catch (error) {
        return res.status(500).json({error})
    }
}

export default homePosts;

