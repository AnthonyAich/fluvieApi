const templateRepository = require("../repository/template");
const ServiceError = require("../core/serviceError");
const { getChildLogger } = require("../core/logging");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("template-service");
  this.logger.debug(message, meta);
};

/**
 * creates a template for the given roleId
 */
const createTemplate = async (body) => {
  try {
    debugLog(`Creating a template for role-id ${body?.roleId}`);
    await templateRepository.addTemplate(body);
    return { "message": "Template has successfully been created" }
  } catch (error) {
    throw Error(`Error occurred while creating a template for role-id ${body?.roleId}`);
  }
};

/**
 * deletes the template with the given templateId
 */
const deleteTemplate = async (body) => {
  try {
    debugLog(`Deleting template with id ${body?.id}`);
    await templateRepository.deleteTemplate(body);
    return { "message": "Template has successfully been deleted" }

  } catch (error) {
    throw Error(`Error occurred while deleting template with TemplateId ${body?.id}`);
  }
};

/**
 * edits a template with the give templateId, goalId and flag
 */
const editTemplate = async (body) => {
  try {
    debugLog(`editing template with id ${body?.templateId}`);
    return await templateRepository.editTemplate(body);
  } catch (error) {
    console.error(`Error occurred while editing template with id ${body?.templateId}`);
    return { "message": "The template has failed to edit" }
  }
};

/**
 * Finds and returns the template in the database with the given templateId
 */
const editPersonalTemplate = async (body) => {
  try {
    debugLog(`editing template with id ${body?.userId}`);
    await templateRepository.editPersonalTemplate(body);
    return { "message": "Template has successfully been edited" }
  } catch (error) {
    console.error(`Error occurred while editing template with id ${body?.userId}\n`, error);
    return { "message": "Your personal template has failed to edit" }
  }
};

module.exports = {
  createTemplate,
  deleteTemplate,
  editTemplate,
  editPersonalTemplate
};