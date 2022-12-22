import Post from "../models/Post.js"
import Comment from '../models/Comment.js'

const details = async (req , res) => {
  try {
    const id = req.params.id;
    const post = await Post.findOne({_id:id});
    const comment = await Comment.find({postId:id}).sort({updatedAt:-1,});
    return res.status(200).json({post,comment});
  } catch (error) {
    return res.status(500).json({error});
  }
}

export default details