"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    const patients = patientsService_1.default.getNonSensitivePatients();
    res.json(patients);
});
router.post('/', (req, res) => {
    try {
        const newPatientsEntry = utils_1.toNewPatientsEntry(req.body);
        const addedEntry = patientsService_1.default.addPatients(newPatientsEntry);
        res.json(addedEntry);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.default = router;
