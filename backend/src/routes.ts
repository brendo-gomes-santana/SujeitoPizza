import { Router } from 'express';

import { Auth } from './middlewares/Auth';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthuserController';
import { DetailuserController } from './controllers/user/DetailUserController';

import { CreateCategoryController } from './controllers/categorias/CreateCategoryController';
import { ListCategoryController } from './controllers/categorias/ListCategoryController';

import { CreateProductController } from './controllers/product/CreateProductController';
const router = Router();


// ROTAS USERS
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);

router.use(Auth) // tudo que tive abaixo desse midllware, vai chama esse middleware.
router.get('/usuario',new DetailuserController().handle);


//ROTAS CATEGORIA
router.post('/category', new CreateCategoryController().handle)
router.get('/category', new ListCategoryController().handle)

//ROTAS PRODUCT
router.post('/product', new CreateProductController().handle);

export { router }