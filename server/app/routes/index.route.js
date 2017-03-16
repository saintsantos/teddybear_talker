import express from 'express';
import voiceRoute from './voice.route';
import calRoute from './calendar.route';

const router = express.Router();

//Health Check!
router.get('/hi', (req, res) =>
    res.send('Hi!')
);

router.use('/voice', voiceRoute);
router.use('/calendar', calRoute);
export default router;
