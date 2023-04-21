import { Response, Request } from "express";
import { CreateUserService } from "../../services/user/CreateuserService";

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, password } = req.body

        const CreateUserController = new CreateUserService();
        const user = await CreateUserController.execute({
            name, 
            email,
            password
        });

        return res.json(user)
    }
}

export { CreateUserController };
