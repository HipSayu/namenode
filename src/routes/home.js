import express from 'express';
import homeController from '../controller/homeController';
import heartbeat from '../controller/heartbeat'
const router = express.Router();

router.get('/', homeController.handleHelloWord);
router.post('/clientRequest', homeController.hanldeCheckRequest);
router.get('/reqHeartBeat1',heartbeat.Requireheartbeat1 )
router.get('/reqHeartBeat2',heartbeat.Requireheartbeat2 )
router.get('/reqHeartBeat3',heartbeat.Requireheartbeat3 )

module.exports = router;
