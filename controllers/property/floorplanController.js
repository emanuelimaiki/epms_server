const Floorplan = require("../../models/property/Floorplan");
const Property = require("../../models/property/Property");
const { logger } = require("../../logger");

exports.createFloorplan = async (req, res) => {
  try {
    const newFloorplan = new Floorplan(req.body);
    newFloorplan.yearlyincome = newFloorplan.monthlyincome * 12;
    const property = await Property.findById(newFloorplan.property);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    const savedFloorplan = await newFloorplan.save();
    property.floorplans.push(savedFloorplan);
    logger.info({
      action: "Create Floorplan",
      performedBy: req.user.id,
      onRecord: savedFloorplan._id,
    });
    res.status(201).json(savedFloorplan);
  } catch (error) {
    logger.error({
      action: "Create Floorplan",
      performedBy: req.user.id,
      error: error.message,
    });
    res.status(400).json({ message: error.message });
  }
};

exports.getFloorplans = async (req, res) => {
  try {
    const floorplans = await Floorplan.find().populate("property tenant");
    res.json(floorplans);
  } catch (error) {
    logger.error({
      action: "Get Floorplans",
      performedBy: req.user.id,
      error: error.message,
    });
    res.status(400).json({ message: error.message });
  }
};

exports.getFloorplan = async (req, res) => {
  try {
    const floorplan = await Floorplan.findById(req.params.id).populate(
      "property tenant"
    );
    if (!floorplan) {
      return res.status(404).json({ message: "Floorplan not found" });
    }
    res.json(floorplan);
  } catch (error) {
    logger.error({
      action: "Get Floorplan",
      performedBy: req.user.id,
      error: error.message,
    });
    res.status(400).json({ message: error.message });
  }
};

exports.updateFloorplan = async (req, res) => {
  try {
    const updatedFloorplan = await Floorplan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("property tenant");

    if (!updatedFloorplan) {
      return res.status(404).json({ message: "Floorplan not found" });
    }
    logger.info({
      action: "Update Floorplan",
      performedBy: req.user.id,
      onRecord: updatedFloorplan._id,
    });
    res.json(updatedFloorplan);
  } catch (error) {
    logger.error({
      action: "Update Floorplan",
      performedBy: req.user.id,
      error: error.message,
    });
    res.status(400).json({ message: error.message });
  }
};

exports.getVacantFloorplans = async (req, res) => {
  try {
    const floorplans = await Floorplan.find({ is_occupied: false }).populate(
      "property tenant"
    );
    res.json(floorplans);
  } catch (error) {
    logger.error({
      action: "Get Vacant Floorplan",
      performedBy: req.user.id,
      error: error.message,
    });
    res.status(400).json({ message: error.message });
  }
};

exports.deleteFloorplan = async (req, res) => {
  try {
    const deletedFloorplan = await Floorplan.findByIdAndDelete(req.params.id);
    if (!deletedFloorplan) {
      return res.status(404).json({ message: "Floorplan not found" });
    }
    logger.info({
      action: "Delete Floorplan",
      performedBy: req.user.id,
      onRecord: deletedFloorplan._id,
    });
    res.json({ message: "Floorplan deleted successfully" });
  } catch (error) {
    logger.error({
      action: "Delete Floorplan",
      performedBy: req.user.id,
      error: error.message,
    });
    res.status(400).json({ message: error.message });
  }
};
