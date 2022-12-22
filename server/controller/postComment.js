import Comment from "../models/Comment.js"

const postComment = async (req , res) => {
  try {
    const {postId,comment,userName}=req.body;
    const response = await Comment.create({postId,comment,userName})
    if(response)
        return res.status(200).json({msg:"Your comment Succesfully Post"});

  } catch (error) {
    return res.status(500).json({error});
  }
}

export default postComment