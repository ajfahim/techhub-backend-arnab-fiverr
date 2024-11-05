import ApplicationModel from "../models/teacherApplicationModel.js";
import offer from "../Models/offerModel.js";
import userModel from '../models/userModel.js';

// Handle the creation of a new application
export const apply = async (req, res) => {
  console.log("heavy",req.body)
  try {
    const newApplication = new ApplicationModel(req.body); // Create a new application using request body data
    const result = await newApplication.save(); // Save the application to the database
    let offerDex = await offer.findById(req.body.offerId);
    let schoolDex = await userModel.findById(req.body.schoolId);

    schoolDex.speakers.push(req.body.teacherId);

    console.log("SCO",schoolDex.speakers)

    await userModel.findOneAndUpdate({_id:req.body.schoolId},{...schoolDex});

    offerDex.recievedOffers.push(result._id);
    await offer.findOneAndUpdate({_id:req.body.offerId},{...offerDex});
    res.status(201).json(result); // Send back the saved application with status code 201 (Created)
  } catch (error) {
    console.error("Error saving application:", error);
    res.status(500).json({
      message: "An error occurred while saving the application.",
      error: error.message, // Provide the error message for debugging
    });
  }
};

// Handle fetching all applications
export const getApplications = async (req, res) => {
  try {
    const applications = await ApplicationModel.find({}); // Find all applications in the database
    res.status(200).json(applications); // Return the applications with status code 200 (OK)
  } catch (error) {
    console.error("Error retrieving applications:", error);
    res.status(500).json({
      message: "An error occurred while retrieving the applications.",
      error: error.message, // Provide the error message for debugging
    });
  }
};

export const getapplicationBySchool = async (req, res) => {
  const { id } = req.params;
  try {
    const applications = await ApplicationModel.find({ schoolId: id }); // Find all applications in the database
    let dex = [];
    for (let i = 0; i < applications.length; i++) {
      let offerDat = await offer.findById(applications[i].offerId);
      let temp = {
        ...applications[i].toObject(), // Convert to plain JS object and spread the properties
        offerInfo: offerDat, // Add the offerInfo field
      };
      dex.push(temp);
    }
    res.status(200).json(dex); // Return the applications with status code 200 (OK)
  } catch (error) {
    console.error("Error retrieving applications:", error);
    res.status(500).json({
      message: "An error occurred while retrieving the applications.",
      error: error.message, // Provide the error message for debugging
    });
  }
};

export const myApplicationByTeacherId = async (req, res) => {
  const {id}=req.params;
  const teacher=await userModel.findById(id);
  try {
    let applications = [];
    const allApps = await ApplicationModel.find({});
    for(let i=0;i<allApps.length;i++){
      if(allApps[i].teacherId!==id){
        continue;
      }

      let appDat=allApps[i];
      let schoolDat=await userModel.findById(allApps[i].schoolId);
      let offerDat=await offer.findById(allApps[i].offerId);
      let teacherDat=teacher;

      applications.push(
        {
          applicationData:appDat,
          schoolData:schoolDat,
          teacherData:teacherDat,
          offerData:offerDat
        }
      )
    }
    res.status(200).json(applications); // Return the applications with status code 200 (OK)
  } catch (error) {
    console.error("Error retrieving applications:", error);
    res.status(500).json({
      message: "An error occurred while retrieving the applications.",
      error: error.message, // Provide the error message for debugging
    });
  }
};
