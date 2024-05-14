
const Zone = require("../models/property/Zone");
const { logger } = require("../logger");
const User = require("../models/auth/User");

exports.createZone = async (req, res) => {
    try {
        const newZone = new Zone({
            name: req.body.name,
            county: req.body.county,
        });
        const savedZone = await newZone.save();
        logger.info({
            action: "Create Zone",
            performedBy: req.user.id,
            onRecord: savedZone._id,
        });
        res.status(201).json(savedZone);
    } catch (error) {
        logger.error({
            action: "Create Zone",
            performedBy: req.user.id,
            error: error.message,
        });
        res.status(400).json({ message: error.message });
    }
};

exports.createSubZone = async (req, res) => {
    try {
        const zone = await Zone.findById(req.body.zone)
        const newSubZone = new Zone({
            name: req.body.name,
            county: req.body.county || zone.county
        });
        const savedSubZone = await newSubZone.save();

        zone.subzones.push(savedSubZone);
        zone.save()
        logger.info({
            action: "Create SubZone",
            performedBy: req.user.id,
            onRecord: savedSubZone._id,
        });
        res.status(201).json(savedSubZone);
    } catch (error) {
        logger.error({
            action: "Create SubZone",
            performedBy: req.user.id,
            error: error.message,
        });
        res.status(400).json({ message: error.message });
    }
};


exports.getZones = async (req, res) => {
    try {
        const zones = await Zone.find();
        logger.info({
            action: "Fetch All Zones",
            performedBy: req.user.id,
        });
        res.json(zones);
    } catch (error) {
        logger.error({
            action: "Fetch All Zones",
            performedBy: req.user.id,
            error: error.message,
        });
        res.status(500).json({ message: error.message });
    }
};

exports.getZone = async (req, res) => {
    try {
        const zone = await Zone.findById(req.params.id);
        if (!zone) return res.status(404).json({ message: "Zone not found" });
        logger.info({
            action: "Fetch Zone",
            performedBy: req.user.id,
            onRecord: zone._id,
        });
        res.json(zone);
    } catch (error) {
        logger.error({
            action: "Fetch Zone",
            performedBy: req.user.id,
            onRecord: req.params.id,
            error: error.message,
        });
        res.status(500).json({ message: error.message });
    }
};

exports.updateZone = async (req, res) => {
    try {
        const zone = await Zone.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!zone) return res.status(404).json({ message: "Zone not found" });
        logger.info({
            action: "Update Zone",
            performedBy: req.user.id,
            onRecord: zone._id,
        });
        res.json(zone);
    } catch (error) {
        logger.error({
            action: "Update Zone",
            performedBy: req.user.id,
            onRecord: req.params.id,
            error: error.message,
        });
        res.status(400).json({ message: error.message });
    }
};

exports.deleteZone = async (req, res) => {
    try {
        const zone = await Zone.findByIdAndDelete(req.params.id);
        if (!zone) return res.status(404).json({ message: "Zone not found" });

        // Check if any user is associated with the zone
        const usersWithZone = await User.find({ zone: req.params.id });
        if (usersWithZone.length > 0) {
            // Prevent deletion if there are associated users
            return res.status(400).json({
                message:
                    "Cannot delete zone because it is currently assigned to one or more users.",
            });
        }

        logger.info({
            action: "Delete Zone",
            performedBy: req.user.id,
            onRecord: req.params.id,
        });
        res.status(204).send();
    } catch (error) {
        logger.error({
            action: "Delete Zone",
            performedBy: req.user.id,
            onRecord: req.params.id,
            error: error.message,
        });
        res.status(500).json({ message: error.message });
    }
};
