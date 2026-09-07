import generateResponse from "../config/openRouter.js"
import extractJson from "../utils/extractJson.js"
export const getCurrentUser = async(req,res)=>{
    try{
        if(!req.user){
            return res.json({user:null})
        }
        return res.json(req.user)
    }catch(error){
        return res.status(500).json({message: `get current user error ${error}`})

    }
}

// export const generatedemo = async (req, res) => {
//     try {
//         const result = await generateResponse("hello");

//         const data = await extractJson(result);

//         return res.status(200).json(data);
//     } catch (error) {
//         console.log(error);

//         return res.status(500).json({
//             message: error.message
//         });
//     }
// };