import Post from "../models/Post.js"

const fetchPost = async (req , res) => {
  try {
    const _id = req.params.id;
    const post = await Post.findByIdAndRemove({_id});
    return res.status(200).json({post ,msg:"Your post has been deleted."});

  } catch (error) {
    return res.status(500).json({error});
  }
}

export default fetchPost