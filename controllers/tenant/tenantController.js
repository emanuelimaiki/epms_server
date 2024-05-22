const Tenant = require("../../models/tenant/Tenant");
const Floorplan = require("../../models/property/Floorplan");
const { logger } = require("../../logger");
const fs = require("fs");
const {
  TenantVacation,
  TenantRelocation,
} = require("../../services/tenantService");

// Create a new tenant
exports.createTenant = async (req, res) => {
  try {
    const tenantData = req.body;
    const floorplan = await Floorplan.findById(tenantData.current_floor);
    if (!floorplan || floorplan.isoccupied) {
      return res
        .status(404)
        .json({ message: "Floorplan not found or is not vacant" });
    }
    tenantData.photo_path = req.files["photo"]
      ? req.files["photo"][0].path
      : "";
    tenantData.agreement = req.files["agreement"]
      ? req.files["agreement"][0].path
      : "";
    const newTenant = new Tenant(tenantData);

    const savedTenant = await newTenant.save();

    floorplan.tenant = savedTenant._id;
    floorplan.isoccupied = true;
    await floorplan.save();

    logger.info({
      action: "Create Tenant",
      performedBy: req.user.id,
      onRecord: savedTenant._id,
    });
    res.status(201).json(savedTenant);
  } catch (error) {
    logger.error({
      action: "Create Tenant",
      performedBy: req.user.id,
      error: error.message,
    });
    res.status(400).json({ message: error.message });
  }
};

// Get all tenants
exports.getTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find().populate("current_floor");
    logger.info({
      action: "Fetch All Tenants",
      performedBy: req.user.id,
    });
    res.json(tenants);
  } catch (error) {
    logger.error({
      action: "Fetch All Tenants",
      performedBy: req.user.id,
      error: error.message,
    });
    res.status(500).json({ message: error.message });
  }
};

// Get a single tenant by ID
exports.getTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id).populate(
      "current_floor"
    );
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    logger.info({
      action: "Fetch Tenant",
      performedBy: req.user.id,
      onRecord: tenant._id,
    });
    res.json(tenant);
  } catch (error) {
    logger.error({
      action: "Fetch Tenant",
      performedBy: req.user.id,
      onRecord: req.params.id,
      error: error.message,
    });
    res.status(500).json({ message: error.message });
  }
};

// Update a tenant
exports.updateTenant = async (req, res) => {
  try {
    const tenantId = req.params.id;
    const updateData = req.body;

    const updatedTenant = await Tenant.findByIdAndUpdate(tenantId, updateData, {
      new: true,
    });
    if (!updatedTenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    if (req.files["photo"]) {
      existingPhotoPath = updatedTenant.photo_path;
      await fs.unlink(existingPhotoPath, (err) => {
        if (err) {
          logger.error(`Error deleting the file: ${existingPhotoPath}`, err);
        } else {
          logger.http(`Successfully deleted the file: ${existingPhotoPath}`);
        }
      });
      updatedTenant.photo_path = req.files["photo"][0].path;
    }
    if (req.files["agreement"]) {
      existingFilePath = updatedTenant.agreement;
      await fs.unlink(existingFilePath, (err) => {
        if (err) {
          logger.error(`Error deleting the file: ${existingFilePath}`, err);
        } else {
          logger.http(`Successfully deleted the file: ${existingFilePath}`);
        }
      });
      updatedTenant.agreement = req.files["agreement"][0].path;
    }
    updatedTenant.save();

    logger.info({
      action: "Update Tenant",
      performedBy: req.user.id,
      onRecord: updatedTenant._id,
    });

    res.json(updatedTenant);
  } catch (error) {
    logger.error({
      action: "Update Tenant",
      performedBy: req.user.id,
      onRecord: req.params.id,
      error: error.message,
    });
    res.status(400).json({ message: error.message });
  }
};

exports.vacateTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    vacatedTenant = await TenantVacation(tenant);
    logger.info({
      action: "Vacated Tenant",
      performedBy: req.user.id,
      onRecord: vacatedTenant._id,
    });

    res.json(vacatedTenant);
  } catch (error) {
    logger.error({
      action: "Vacate Tenant",
      performedBy: req.user.id,
      onRecord: req.params.id,
      error: error.message,
    });
    res.status(400).json({ message: error.message });
  }
};

exports.relocateTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    const { curr_floorplan, date_moved, remarks } = req.body;
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    const relocatedTenant = await TenantRelocation(
      tenant,
      curr_floorplan,
      date_moved,
      remarks
    );
    return relocatedTenant;
  } catch (error) {
    logger.error({
      action: "Relocate Tenant",
      performedBy: req.user.id,
      onRecord: req.params.id,
      error: error.message,
    });
    res.status(400).json({ message: error.message });
  }
};

// Delete a tenant
exports.deleteTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndDelete(req.params.id);
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    const floorplan = await Floorplan.findById(tenant.current_floor);
    if (floorplan) {
      floorplan.tenant = null;
      floorplan.isoccupied = false;
      await floorplan.save();
    }

    logger.info({
      action: "Delete Tenant",
      performedBy: req.user.id,
      onRecord: req.params.id,
    });
    res.status(204).send();
  } catch (error) {
    logger.error({
      action: "Delete Tenant",
      performedBy: req.user.id,
      onRecord: req.params.id,
      error: error.message,
    });
    res.status(500).json({ message: error.message });
  }
};
