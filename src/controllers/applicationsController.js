import createHttpError from 'http-errors';
import { Application } from '../models/application.js';


// {GET ALL} //

export const getApplications = async (req, res) => {
  const {search, source, workFormat} = req.query;
  const applicationQuery = Application.find({userId: req.user._id});

  if(source){
    applicationQuery.where("source").equals(source);
  }
  if(workFormat){
    applicationQuery.where("workFormat").equals(workFormat);
  }
  if(search){
    applicationQuery.where({
      $or: [
        {role: {$regex: search, $options: "i"}},
        {company: {$regex: search, $options: "i"},}
      ],
    });
  }

const allApplications = await applicationQuery

  res.status(200).json(allApplications);
};

// {GET BY ID} //

export const getApplicationById = async (req, res) => {
  const { applicationId } = req.params;
  const application = await Application.findOne({
     _id: applicationId, 
     userId: req.user._id 
    });
  if (!application) {
    throw createHttpError(404, 'Application not found');
  }

  res.status(200).json(application);
};

// {CREATE} //

export const createApplication = async (req, res) => {
  const application = await Application.create({
    ...req.body, 
    userId: req.user._id
  });

  res.status(201).json(application);
};

// {UPDATE} //

export const updateApplication = async (req, res) => {
  const { applicationId } = req.params;
  const application = await Application.findOneAndUpdate({
     _id: applicationId, 
     userId: req.user._id 
    },
    req.body,
    { returnDocument: 'after',
      runValidators: true,
     },
  );
  if (!application) {
    throw createHttpError(404, 'Application not found');
  }
  res.status(200).json(application);
};

// {DELETE} //

export const deleteApplication = async (req, res) => {
  const { applicationId } = req.params;
  const application = await Application.findOneAndDelete({ 
    _id: applicationId, 
    userId: req.user._id 
  },
  );
  if (!application) {
    throw createHttpError(404, 'Application not found');
  }
  res.status(200).json(application);
};
