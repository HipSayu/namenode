import express from 'express';
import homeController from '../controller/homeController';

const router = express.Router();

router.get('/', homeController.handleHelloWord);
router.post('/clientRequest', homeController.hanldeCheckRequest);
router.get('/reqHeartBeat',homeController.Requireheartbeat )

module.exports = router;
