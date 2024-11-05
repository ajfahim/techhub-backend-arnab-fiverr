import offer from "../Models/offerModel.js";
import mongoose from "mongoose";

export const createOffer = async (req, res) => {
    try {
        const newOffer = new offer(req.body);
        console.log(req.body);
        const savedOffer = await newOffer.save();
        res.status(201).json(savedOffer);
    } catch (error) {
        console.error('Error saving offer:', error);
        res.status(500).json({ message: error.message });
    }
};

export const getAllOffers = async (req, res) => {
    const offers = await offer.find({});
    res.status(200).json(offers);
};
export const getOffersForSchool = async (req, res) => {

    const { id } = req.params;

    const offers = await offer.find({});;

    let dex = offers.filter((off) => {
        return off.school === id
    });

    res.status(200).json(dex);
};
export const copyOffer = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the offer by ID
        const existingOffer = await offer.findById(id);

        if (!existingOffer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        // Create a copy of the offer data
        const newOfferData = {
            ...existingOffer._doc, // Spread the existing offer data
            title: `${existingOffer.title} (Copy)`, // Change the title or any other field if necessary
            _id: undefined, // Remove the existing ID so MongoDB can generate a new one
            createdAt: undefined, // Remove any fields that should be re-generated
            updatedAt: undefined,
            recievedOffers:[]
        };

        // Create a new offer with the copied data
        const newOffer = new offer(newOfferData);

        // Save the new offer to the database
        await newOffer.save();

        // Return the newly created offer
        res.status(201).json(newOffer);

    } catch (error) {
        console.error('Error copying the offer:', error);
        res.status(500).json({ message: 'Failed to copy the offer', error: error.message });
    }
};
export const jobs = async (req, res) => {
    const { id } = req.params;// Extract the job ID from the route parameters
    const job = await offer.findById(id); // Find the job by ID using Mongoose

    if (!job) {
        return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
};


export const deleteOffer = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID" });
    }
    const deletedOffer = await offer.findOneAndDelete({ _id: id });
    if (deletedOffer) {
        res.status(200).json(deletedOffer);
    } else {
        return res.status(400).json({ error: "No Such Offer Found" });
    }
};

export const updateOffer = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID" });
    }
    const deletedOffer = await offer.findOneAndUpdate({ _id: id }, { ...req.body });
    if (deletedOffer) {
        const toSend = await offer.findById(id);
        res.status(200).json(toSend);
    } else {
        return res.status(400).json({ error: "No Such offer Found" });
    }
};