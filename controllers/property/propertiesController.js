const Property = require("../../models/property/Property");
const { logger } = require("../../logger");
const Landlord = require("../../models/property/Landlord");

exports.createProperty = async (req, res) => {
  try {
    const images = req.files["images"]
      ? req.files["images"].map((file) => file.path)
      : [];
    const newProperty = new Property(req.body);
    const landlord = await Landlord.findById(newProperty.landlord);
    if (!landlord) {
      return res.status(404).json({ message: "Landlord not found" });
    }
    newProperty.images = images;
    const savedProperty = await newProperty.save();

    landlord.plots.push(newProperty);
    await landlord.save();
    logger.info({
      action: "Create Property",
      performedBy: req.user.id,
      onRecord: savedProperty._id,
    });
    res.status(201).json(savedProperty);
  } catch (error) {
    logger.error({
      action: "Create Property",
      performedBy: req.user.id,
      error: error.message,
    });
    res.status(400).json({ message: error.message });
  }
};

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate("landlord zone");
    logger.info({
      action: "Fetch All Properties",
      performedBy: req.user.id,
    });
    res.json(properties);
  } catch (error) {
    logger.error({
      action: "Fetch All Properties",
      performedBy: req.user.id,
      error: error.message,
    });
    res.status(500).json({ message: error.message });
  }
};

exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "landlord zone"
    );
    if (!property)
      return res.status(404).json({ message: "Property not found" });
    logger.info({
      action: "Fetch Property",
      performedBy: req.user.id,
      onRecord: property._id,
    });
    res.json(property);
  } catch (error) {
    logger.error({
      action: "Fetch Property",
      performedBy: req.user.id,
      onRecord: req.params.id,
      error: error.message,
    });
    res.status(500).json({ message: error.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const updateData = req.body;
    //change this to push new images instead of replacing all. front end to use upload routes
    if (req.files["images"]) {
      updateData.images = req.files["images"].map((file) => file.path);
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      updateData,
      { new: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    logger.info({
      action: "Update Property",
      performedBy: req.user.id,
      onRecord: updatedProperty._id,
    });

    res.json(updatedProperty);
  } catch (error) {
    logger.error({
      action: "Update Property",
      performedBy: req.user.id,
      error: error.message,
    });
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    logger.info({
      action: "Delete Property",
      performedBy: req.user.id,
      onRecord: req.params.id,
    });
    res.status(204).send();
  } catch (error) {
    logger.error({
      action: "Delete Property",
      performedBy: req.user.id,
      onRecord: req.params.id,
      error: error.message,
    });
    res.status(500).json({ message: error.message });
  }
};
