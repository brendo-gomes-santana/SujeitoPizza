import { Router } from 'express';
import multer from 'multer';

import { Auth } from './middlewares/Auth';
import uploadConfig from './config/multer'

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthuserController';
import { DetailuserController } from './controllers/user/DetailUserController';

import { CreateCategoryController } from './controllers/categorias/CreateCategoryController';
import { ListCategoryController } from './controllers/categorias/ListCategoryController';

import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';


import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController'; 
import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOnderController } from './controllers/order/ListOrderController';
import { DetailOrdersController } from './controllers/order/DetailOrdersController';
import { FinalizandoOrderController } from './controllers/order/FinalizandoOrderController';

const router = Router();
const upload = multer(uploadConfig.upload('./tmp'))

// ROTAS USERS
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);

router.use(Auth) // tudo que tive abaixo desse midllware, vai chama esse middleware.
router.get('/usuario',new DetailuserController().handle);


//ROTAS CATEGORIA
router.post('/category', new CreateCategoryController().handle);
router.get('/category', new ListCategoryController().handle);

//ROTAS PRODUCT
router.post('/product', upload.single('file'), new CreateProductController().handle);
router.get('/category/product', new ListByCategoryController().handle)

//ROTAS ORDER
router.post('/order', new CreateOrderController().handle)
router.delete('/order', new RemoveOrderController().handle)
router.post('/order/add', new AddItemController().handle)
router.delete('/order/remove', new RemoveItemController().handle)
router.put('/order/send', new SendOrderController().handle)
router.get('/orders', new ListOnderController().handle)
router.get('/order/detail', new DetailOrdersController().handle)
router.put('/order/finalizando', new FinalizandoOrderController().handle)

export { router }