import { Request, Response } from "express";
import { DetailuserService } from "../../services/user/DetailuserService";

class DetailuserController {
    async handle(req: Request, res: Response){
        
        const user_id = req.user_id;
        
        const detailuserService = new DetailuserService();
        const user = await detailuserService.exexute(user_id);
        
        return res.json(user)

    }
}

export { DetailuserController };

