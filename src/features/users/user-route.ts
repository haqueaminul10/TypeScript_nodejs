import { Router } from 'express';
import { create, list, get, update, remove } from './user-controller.js';

const router = Router();

router.post('/create', create);
router.get('/', list);
router.get('/single/:id', get);
router.put('/update/:id', update);
router.delete('/delete/:id', remove);

export default router;
