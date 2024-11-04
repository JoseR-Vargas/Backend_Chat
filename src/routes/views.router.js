import { Router } from 'express';

const router = Router();


router.get('/chat', (req, res) => {
    const data = {};
    
    res.status(200).render('chat', data);
});


export default router;