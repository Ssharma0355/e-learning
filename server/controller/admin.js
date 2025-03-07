import { TryCatch } from "../middleware/TryCatch.js";
import { Courses } from "../models/courses.js";


export const createCourse = TryCatch(async(req,res)=>{
    const{title,description,price,duration,category,createdBy} =req.body
    const image = req.file
    await Courses.create({
      title,
      description,
      price,
      duration,
      category,
      createdBy,
      image: image?.path,
    });

    res.send(201).json({
        message:"Course create successfully"
    })

})

