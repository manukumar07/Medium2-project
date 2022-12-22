import Post from "../models/Post.js"

const  fetchPosts = async(req,res) => {
    const id = req.params.id;
    const page = req.params.page;
    const perPage = 4;
    const skip = (page -1) * perPage;
    try {
        const count = await Post.find({userId:id}).countDocuments();
        const data = await Post.find({userId:id})
        .skip(skip)
        .limit(perPage)
        .sort({updateAt:-1});
        return res.status(200).json({data , count , perPage})
    } catch (error) {
        return res.status(500).json({error});
    }
  
}

export default fetchPosts