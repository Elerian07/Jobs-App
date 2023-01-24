import { create, find, findById, findByIdAndDelete, findByIdAndUpdate, findOne } from "../../../../DB/DBmethods.js";
import jobModel from "../../../../DB/model/jobs.model.js";
import { asyncHandler } from "../../../services/asyncHandler.js";



export const getAllJobs = asyncHandler(async (req, res, next) => {
    const populate = [{
        path: "company",
        select: "company position status jobType jobLocation -_id"
    },
    {
        path: "createdBy",
        select: "userName -_id"
    }]
    let jobs = await find({ model: jobModel, condition: { createdBy: req.user._id }, populate: [...populate] });
    if (!jobs) {
        return next(new Error("couldn't find any jobs"), { cause: 404 })
    } else {
        return res.status(200).json({ message: "Jobs Founded", jobs, count: jobs.length })
    }
})
export const createJob = asyncHandler(async (req, res, next) => {

    const job = await create({ model: jobModel, data: { ...req.body, createdBy: req.user._id } });
    if (!job) {
        return next(new Error("Couldn't create job"), { cause: 500 })
    } else {
        return res.status(201).json({ message: "job created", job })
    }
})
export const updateJob = asyncHandler(async (req, res, next) => {
    let { id } = req.params;
    let job = await findById({ model: jobModel, condition: { _id: id } });
    if (!job) {
        return next(new Error("Job not found"), { cause: 404 })
    } else {
        let updatedJob = await findByIdAndUpdate({ model: jobModel, condition: { _id: id }, data: req.body, options: { new: true } });
        return res.status(200).json({ message: "Job updated", updatedJob })
    }
})
export const deleteJob = asyncHandler(async (req, res, next) => {
    let { id } = req.params;
    let job = await findById({ model: jobModel, condition: { _id: id } });
    if (!job) {
        return next(new Error("Job not found"), { cause: 404 })
    } else {
        let deletedJob = await findByIdAndDelete({ model: jobModel, condition: { _id: id } });
        return res.status(200).json({ message: "Job Deleted", deletedJob })
    }
})
export const getJob = asyncHandler(async (req, res, next) => {
    let { id } = req.params;
    let { userId } = req.user._id.toString();
    const populate = [{
        path: "company",
        select: "company position status jobType jobLocation -_id"
    }, {
        path: "createdBy",
        select: "userName "
    }]
    let job = await findOne({
        model: jobModel,
        condition: { _id: id }, populate: [...populate]
    });

    if (!job) {
        return next(new Error("Job not found"), { cause: 404 })
    } else {
        if (job.createdBy.equals(req.user._id)) {
            return res.status(200).json({ message: "Job Founded", job })
        } else {
            return next(new Error("you're not authorized"), { cause: 401 })
        }
    }
})