import express from 'express';
import config from '../config/config';
import calCtrl from '../controllers/calendar.controller';

const router = express.Router();

router.route('/update/:day/:id').post(calCtrl.update);
router.route('/:day/:time').get(calCtrl.getEvent);
router.route('/:day').get(calCtrl.getDay);
router.route('/').get(calCtrl.getWeek);

export default router;
