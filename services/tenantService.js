const Floorplan = require("../models/property/Floorplan");
const Tenant = require("../models/tenant/Tenant");
const Tenant_Histories = require("../models/tenant/Tenant_Histories");

exports.TenantVacation = async (tenant) => {
  try {
    if (tenant.vacated) {
      throw new Error("Tenant is Vacated");
    }
    const floorplan = await Floorplan.findById(tenant.current_floor);

    floorplan.isoccupied = false;
    floorplan.tenant = null;
    floorplan.save();

    tenant.current_floor = null;
    tenant.vacated = true;

    //manipulate house Histories

    tenant.save();
    return tenant;
  } catch (error) {
    throw error;
  }
};

exports.TenantRelocation = async (
  tenant,
  curr_floorplan,
  date_moved,
  remarks
) => {
  try {
    if (tenant.vacated) {
      throw new Error("Tenant is Vacated");
    }

    //vacate the previous floorplan
    const prev_floorplan = await Floorplan.findById(tenant.current_floor);

    prev_floorplan.isoccupied = false;
    prev_floorplan.tenant = null;
    prev_floorplan.save();

    //populate the new floorplan
    new_floorplan = await Floorplan.findById(curr_floorplan);
    if (new_floorplan.is_occupied) {
      throw new Error("Floorplan is not vacant");
    }

    new_floorplan.tenant = tenant;
    new_floorplan.is_occupied = true;
    await new_floorplan.save();

    //update the Tenant floor
    tenant.current_floor = new_floorplan;

    //add tenant History
    tenanthistory = await this.TenantHistory(
      tenant,
      prev_floorplan,
      date_moved,
      remarks
    );

    tenant.histories.push(tenanthistory);
    tenant.save();
    return tenant;
  } catch (error) {
    throw error;
  }
};

exports.TenantHistory = async (
  tenant,
  prev_floorplan = null,
  date_from,
  date_to = null,
  remarks
) => {
  try {
    if (prev_floorplan != null) {
      old_history = await Tenant_Histories.findOneAndUpdate(
        { tenant, floorplan: prev_floorplan._id },
        {
          date_to: date_from,
          status: "Vacated",
          remarks,
        },
        { new: true }
      );
      if (!old_history) {
        throw new Error("History not Found");
      }
      old_history.save();
    }
    const new_history = new Tenant_Histories({
      tenant,
      floorplan: tenant.curr_floorplan,
      date_from,
      date_to,
      status: "Active",
      remarks,
    });

    return new_history;
  } catch (error) {
    throw error;
  }
};
