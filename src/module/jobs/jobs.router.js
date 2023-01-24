import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as jobsController from './controller/jobs.controller.js'


const router = Router()




router.post('/', auth(), jobsController.createJob)
router.get('/', auth(), jobsController.getAllJobs)
router.get('/:id', auth(), jobsController.getJob)
router.patch('/:id', auth(), jobsController.updateJob)
router.delete('/:id', auth(), jobsController.deleteJob)
export default router