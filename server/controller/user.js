const register = async (req,res)=>{
    try{
        res.send("Register API working fine");

    }
    catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
}
export default register
