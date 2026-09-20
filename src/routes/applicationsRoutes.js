import { createApplication, 
    deleteApplication, 
    getApplicationById, 
    getApplications, 
    updateApplication } from "../controllers/applicationsController.js";

import {Router} from "express";


const router = Router();

// {/APPLICATION} //
router.get("/applications", getApplications);

router.post("/applications", createApplication);

// {/APPLICATION/:ID} //

router.get("/applications/:applicationId", getApplicationById);

router.patch("/applications/:applicationId", updateApplication);

router.delete("/applications/:applicationId", deleteApplication);

// {/APPLICATION/:ID/STATUS} //

router.patch("/applications/:applicationId/status", () =>{});

// {AUTH} // 
router.post("/auth/register", () => {});

router.post("/auth/login", () => {});

router.post("/auth/logout", () => {});

router.get("/auth/me", () => {})

export default router;