import createHttpError from 'http-errors';
import { Application } from '../models/application.js';

export const getApplications = async (req, res) => {
  const applicationQuery = await Application.find();

  res.status(200).json({
    applicationQuery,
  });
};

export const getApplicationById = async (req, res) => {
  const { applicationId } = req.params;
  const application = await Application.findOne({ _id: applicationId });
  if (!application) {
    throw createHttpError(404, 'Application not found');
  }

  res.status(200).json({ application });
};

export const createApplication = async (req, res) => {
    console.log(res.locals.userId)
  const application = await Application.create({...req.body, userId: res.locals.userId});

  res.status(201).json(application);
};

export const updateApplication = async (req, res) => {
  const { applicationId } = req.params;
  const application = await Application.findOneAndUpdate(
    { _id: applicationId },
    req.body,
    { returnDocument: 'after' },
  );
  if (!application) {
    throw createHttpError(404, 'Application not found');
  }
  res.status(200).json(application);
};

export const deleteApplication = async (req, res) => {
  const { applicationId } = req.params;
  const application = await Application.findOneAndDelete({
    _id: applicationId,
  });
  if (!application) {
    throw createHttpError(404, 'Application not found');
  }
  res.status(200).json(application);
};
