import { celebrate } from "celebrate";
import { 
    createApplication, 
    deleteApplication, 
    getApplicationById, 
    getApplications, 
    updateApplication } from "../controllers/applicationsController.js";

import {Router} from "express";
import { 
    applicationIdParamsSchema, 
    createApplicationSchema, 
    getAllApplicationsSchema, 
    updateApplicationSchema, 
    updateApplicationStatusSchema} from "../validations/applicationValidation.js";
import { authenticate } from "../middleware/authenticate.js";


const router = Router();

router.use("/applications", authenticate);

// {/APPLICATION} //
router.get("/applications", celebrate(getAllApplicationsSchema), getApplications);

router.post("/applications", celebrate(createApplicationSchema), createApplication);

// {/APPLICATION/:ID} //

router.get("/applications/:applicationId", celebrate(applicationIdParamsSchema), getApplicationById);

router.patch("/applications/:applicationId", celebrate(updateApplicationSchema), updateApplication);

router.delete("/applications/:applicationId", celebrate(applicationIdParamsSchema), deleteApplication);

// {/APPLICATION/:ID/STATUS} //

router.patch("/applications/:applicationId/status", celebrate(updateApplicationStatusSchema),updateApplication);


export default router;