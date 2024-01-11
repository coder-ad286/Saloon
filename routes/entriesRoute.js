import express from "express";
import { createEntry, fetchEntries } from "../controllers/entriesCtrl.js";
import { isAuthenticated } from "../middlewares/authenticate.js";
const  entriesRoute = express.Router()

entriesRoute.post('/create',isAuthenticated,createEntry)
entriesRoute.get('/fetch-entries',isAuthenticated,fetchEntries)

export default entriesRoute;