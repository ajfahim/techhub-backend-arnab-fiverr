import express from 'express';
import { copyOffer, createOffer, deleteOffer, getAllOffers, getOffersForSchool, jobs, updateOffer } from '../Controllers/offerController.js';

const router = express.Router();

router.post('/create',createOffer);
router.post('/copyOffer/:id',copyOffer);
router.get('/getOffers', getAllOffers);
router.get('/getOffers/schoolDashboard/:id', getOffersForSchool);
router.get('/jobs/:id', jobs);
router.delete('/deleteOffer/:id',deleteOffer);
router.patch('/updateOffer/:id',updateOffer);

export default router;