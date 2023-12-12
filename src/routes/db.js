import express from 'express';
import dbController from '../controller/dbController';

const router = express.Router();

router.get('/ReadNameNode', dbController.handleReadDB);
router.get('/WriteReadNameNode', dbController.HandleWriteDB);

module.exports = router;
