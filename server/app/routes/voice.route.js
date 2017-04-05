import express from 'express';
import config from '../config/config';
import voiceCtrl from '../controllers/voice.controller';

const router = express.Router();

router.route('/upload').post(voiceCtrl.upload);
router.route('/update/:id').post(voiceCtrl.updateId);
router.route('/').get(voiceCtrl.getAll);
router.route('/:id').get(voiceCtrl.getOne);
router.route('/:id').delete(voiceCtrl.deleteOne);
router.route('/').delete(voiceCtrl.deleteAll);

export default router;
