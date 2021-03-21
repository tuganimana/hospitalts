import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Users} from "../entity/User";
const bcrypt =require('bcrypt')

export class UserController {

    private userRepository = getRepository(Users);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
     
        
        const checkone= await this.userRepository.createQueryBuilder("user")
        .where("user.email= :email", { email:request.body.email })
        .getOne();
   console.log(request.body.password)
    if(checkone===undefined ){
        bcrypt.hash(request.body.password.toString(), 10,async(error:any,hash:any)=>{
                        if(error){
                          
                            response.status(500).json({
                                message:'password error',
                                errors:error
                            })
                        }else{
                

                          var insertUser = await this.userRepository
                           .save({
                               fullname:request.body.fullname,
                               email:request.body.email,
                               password:hash,
                               category:request.body.category
                           })
                           .then((res:any)=>{
                            res.json({
                                message:"successful",
                                data:res
                            })
                           
                           })
                          
                          

                        }   

                })
                        
    }else{
  response.status(203).json({
      message:'User already exists'
  })
       
    }
}

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

}