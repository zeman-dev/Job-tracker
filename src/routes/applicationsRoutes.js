import { celebrate } from "celebrate";
import { createApplication, 
    deleteApplication, 
    getApplicationById, 
    getApplications, 
    updateApplication } from "../controllers/applicationsController.js";

import {Router} from "express";
import { applicationIdParamsSchema, createApplicationSchema, getAllApplicationsSchema, updateApplicationSchema } from "../validations/applicationValidation.js";


const router = Router();

// {/APPLICATION} //
router.get("/applications", celebrate(getAllApplicationsSchema), getApplications);

router.post("/applications", celebrate(createApplicationSchema), createApplication);

// {/APPLICATION/:ID} //

router.get("/applications/:applicationId", celebrate(applicationIdParamsSchema), getApplicationById);

router.patch("/applications/:applicationId", celebrate(updateApplicationSchema), updateApplication);

router.delete("/applications/:applicationId", celebrate(applicationIdParamsSchema), deleteApplication);

// {/APPLICATION/:ID/STATUS} //

router.patch("/applications/:applicationId/status", () =>{});

// {AUTH} // 
router.post("/auth/register", () => {});

router.post("/auth/login", () => {});

router.post("/auth/logout", () => {});

router.get("/auth/me", () => {})

export default router;