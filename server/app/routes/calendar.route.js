import express from 'express';
import config from '../config/config';
import calendarCtrl from '../controllers/calendar.controller.js';

const router = express.Router();

router.route('/').get(calendarCtrl.getWeek);
router.route('/:day/:hour/:minutes').put(calendarCtrl.update);
router.route('/:day/:hour/:minutes').post(calendarCtrl.addEvent);
router.route('/:day/:hour/:minute').get(calendarCtrl.getDay);
/**
 * This will eventually be handled once we de/activate eventss
 */
//router.route('/').delete(voiceCtrl.deleteAll);

export default router;
