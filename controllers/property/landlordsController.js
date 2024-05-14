const Landlord = require("../../models/property/Landlord"); // Import the Landlord model
const { logger } = require("../../logger");


exports.createLandlord = async (req, res) => {
    try {
        const newLandlord = new Landlord({
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            id_number: req.body.id_number,
            phone_number: req.body.phone_number,
            email: req.body.email,
            agreement_path: req.files['agreement'] ? req.files['agreement'][0].path : '',
            contract_path: req.files['contract'] ? req.files['contract'][0].path : '',
            zone: req.body.zone,
        });
        const savedLandlord = await newLandlord.save();
        logger.info({
            action: "Create Landlord",
            performedBy: req.user.id,
            onRecord: savedLandlord._id,
        });
        res.status(201).json(savedLandlord);
    } catch (error) {
        logger.error({
            action: "Create Landlord",
            performedBy: req.user.id,
            error: error.message,
        });
        res.status(400).json({ message: error.message });
    }
};

exports.getLandlords = async (req, res) => {
    try {
        const landlords = await Landlord.find();
        logger.info({
            action: "Fetch All Landlords",
            performedBy: req.user.id,
        });
        res.json(landlords);
    } catch (error) {
        logger.error({
            action: "Fetch All Landlords",
            performedBy: req.user.id,
            error: error.message,
        });
        res.status(500).json({ message: error.message });
    }
};

exports.getLandlord = async (req, res) => {
    try {
        const landlord = await Landlord.findById(req.params.id);
        if (!landlord) return res.status(404).json({ message: "Landlord not found" });
        logger.info({
            action: "Fetch Landlord",
            performedBy: req.user.id,
            onRecord: landlord._id,
        });
        res.json(landlord);
    } catch (error) {
        logger.error({
            action: "Fetch Landlord",
            performedBy: req.user.id,
            onRecord: req.params.id,
            error: error.message,
        });
        res.status(500).json({ message: error.message });
    }
};

exports.updateLandlord = async (req, res) => {
    try {
        const landlordId = req.params.id;
        // Find the landlord by ID
        const landlord = await Landlord.findById(landlordId);
        if (!landlord) {
            return res.status(404).json({ message: "Landlord not found" });
        }
        // Update landlord details
        landlord.first_name = req.body.first_name;
        landlord.middle_name = req.body.middle_name;
        landlord.last_name = req.body.last_name;
        landlord.id_number = req.body.id_number;
        landlord.phone_number = req.body.phone_number;
        landlord.email = req.body.email;
        landlord.zone = req.body.zone;

        // Handle file updates
        if (req.files['agreement']) {
            landlord.agreement_path = req.files['agreement'][0].path;
        }

        if (req.files['contract']) {
            landlord.contract_path = req.files['contract'][0].path;
        }
        // Save the updated landlord
        const updatedLandlord = await landlord.save();

        logger.info({
            action: "Update Landlord",
            performedBy: req.user.id,
            onRecord: updatedLandlord._id,
        }); s
        res.json(updatedLandlord);
    } catch (error) {
        logger.error({
            action: "Update Landlord",
            performedBy: req.user.id,
            error: error.message,
        });
        res.status(400).json({ message: error.message });
    }
};


exports.deleteLandlord = async (req, res) => {
    try {
        const landlord = await Landlord.findByIdAndDelete(req.params.id);
        if (!landlord) return res.status(404).json({ message: "Landlord not found" });
        logger.info({
            action: "Delete Landlord",
            performedBy: req.user.id,
            onRecord: req.params.id,
        });
        res.status(204).send();
    } catch (error) {
        logger.error({
            action: "Delete Landlord",
            performedBy: req.user.id,
            onRecord: req.params.id,
            error: error.message,
        });
        res.status(500).json({ message: error.message });
    }
};
