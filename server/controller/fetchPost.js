import Post from "../models/Post.js"

const fetchPost = async (req , res) => {
  try {
    const id = req.params.id;
    const post = await Post.findOne({_id:id});
    return res.status(200).json({post});

  } catch (error) {
    return res.status(500).json({error});
  }
}

export default fetchPost