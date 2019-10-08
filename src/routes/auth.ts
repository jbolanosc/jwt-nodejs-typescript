import {Router} from 'express';
const authRoutes = Router();

import { signup, signin, profile } from './../controllers/auth.controller';
import { TokenValidation } from './../libs/validateToken';

authRoutes.get('/', (req, res) => {

})

authRoutes.post('/signup', signup);
authRoutes.post('/signin', signin);
authRoutes.post('/profile', TokenValidation, profile);

export default authRoutes;
