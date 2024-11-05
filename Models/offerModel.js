import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
   
    title: {
        type: String,
    },
    school:{
        type: String,
    },
    owner: {
        type: String,
    },
    deadline: {
        type: String,
    },
    salary: {
        type: String,
    },
    establishment: {
        type: String,
    },
    acceptedContract: {
        type: String,
    },
    permanentContract: {
        type: String,
    },
    interventionType: {
        type: String,
    },
    interventionLanguage: {
        type: String,
    },
    learnerLevel: {
        type: String,
    },
    learnerNumber: {
        type: Number,
    },
    diploma: {
        type: String,
    },
    minDegree: {
        type: String,
    },
    presentation: {
        type: String,
    },
    teachingArea: {
        type: String,
    },
    keywords: [
        {
            type: String,
            required: true
        }
    ],
    eduObjective: {
        type: String,
    },
    interventionContent: {
        type: String,
    },
    syllabus: {
        type: String,
    },
    evaluation: {
        type: Boolean,
    },
    speakerPresence :{
        type: Boolean,
    },
    faceToFace :{
        type: Boolean,
    },
    remotely :{
        type: Boolean,
    },
    applicationLimit: {
        type: Boolean,
    },
    date: {
        type: String,
    },
    rgentOffer: {
        type: Boolean,
    },
    flexibleStartDate: {
        type: Boolean,
    },
    flexibleEndDate: {
        type: Boolean,
    },
    defineSlots: {
        type: Boolean,
    },
    totalHours: {
        type: Number,
    },
    hoursPerWeek: {
        type: Number,
    },
    td: {
        type: Boolean,
    },
    tp: {
        type: Boolean,
    },
    hourlyPay: {
        type: Boolean,
    },
    dailyRate: {
        type: Boolean,
    },
    expenses: {
        type: Boolean,
    },
    identification: {
        type: Boolean,
    },
    diplomasCertificates: {
        type: Boolean,
    },
    criminalRecord: {
        type: Boolean,
    },
    cv: {
        type: Boolean,
    },
    bankAccount: {
        type: Boolean,
    },
    kbis: {
        type: Boolean,
    },
    logistical: {
        type: String,
    },
    recievedOffers:[String],
}, { timestamps: true });


const offer = mongoose.model("OfferCollection", offerSchema);

export default offer;
