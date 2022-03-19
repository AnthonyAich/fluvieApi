const { join } = require("path");
const config = require("config");
const knex = require("knex");
const { getChildLogger } = require("../core/logging");

const NODE_ENV = config.get("env");
const isDevelopment = NODE_ENV === "development";

const DATABASE_CLIENT = config.get("database.client");
const DATABASE_NAME = config.get("database.name");
const DATABASE_HOST = config.get("database.host");
const DATABASE_PORT = config.get("database.port");
const DATABASE_USERNAME = config.get("database.username");
// const DATABASE_PASSWORD = config.get("database.password");
const DATABASE_PASSWORD = "";

let knexInstance;

const getKnexLogger = (logger, level) => (message) => {
  if (message.sql) {
    logger.log(level, message.sql);
  } else if (message.length && message.forEach) {
    message.forEach((innerMessage) =>
      logger.log(
        level,
        innerMessage.sql ? innerMessage.sql : JSON.stringify(innerMessage)
      )
    );
  } else {
    logger.log(level, JSON.stringify(message));
  }
};

async function initializeData() {
  const logger = getChildLogger("database");

  const knexOptions = {
    client: DATABASE_CLIENT,
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      user: DATABASE_USERNAME,
      password: DATABASE_PASSWORD || "",
      insecureAuth: isDevelopment,
    },
    debug: true,
    log: {
      debug: getKnexLogger(logger, "debug"),
      error: getKnexLogger(logger, "error"),
      warn: getKnexLogger(logger, "warn"),
      deprecate: (method, alternative) =>
        logger.warn("Knex reported something deprecated", {
          method,
          alternative,
        }),
    },
    migrations: {
      tableName: "knex_meta",
      directory: join("src", "data", "migrations"),
    },
    seeds: {
      directory: join("src", "data", "seeds"),
    },
  };

  knexInstance = knex(knexOptions);

  try {
    await knexInstance.raw("SELECT 1+1 AS result");
    await knexInstance.raw(`DROP DATABASE IF EXISTS ${DATABASE_NAME}`);
    await knexInstance.raw(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`);

    await knexInstance.destroy();

    knexOptions.connection.database = DATABASE_NAME;
    knexInstance = knex(knexOptions);
    await knexInstance.raw("SELECT 1+1 AS result");
  } catch (error) {
    logger.error(error.message, {
      error,
    });
    throw new Error("Could not initialize the data layer");
  }

  let migrationsFailed = true;
  try {
    await knexInstance.migrate.latest();
    migrationsFailed = false;
  } catch (error) {
    logger.error("Error while migrating the database", {
      error,
    });
  }

  if (migrationsFailed) {
    try {
      await knexInstance.migrate.down();
    } catch (error) {
      logger.error("Error while undoing last migration", {
        error,
      });
    }
    throw new Error("migrations failed");
  }

  if (isDevelopment) {
    try {
      await knexInstance.seed.run();
    } catch (error) {
      logger.error("Error while seeding database", {
        error,
      });
    }
  }

  logger.info("Data layer initialized");
  return knexInstance;
}

async function shutdownData() {
  const logger = getChildLogger("database");

  logger.info("Shutting down database connection");

  await knexInstance.destroy();
  knexInstance = null;

  logger.info("Database connection closed");
}

function getKnex() {
  if (!knexInstance) {
    throw Error(
      "Please initialize the data layer before getting the Knex instance"
    );
  }
  return knexInstance;
}

const tables = Object.freeze({
  Category: "category",
  SDG: "sdg",
  DataSource: "datasource",
  User: "user",
  Role: "role",
  ExternalUser: "externaluser",
  ValueHistory: "valuehistory",
  Goal: "goal",
  Indicator: "indicator",
  PersonalTemplate: "personaltemplate",
  TemplateGoal: "templategoal",
  Template: "template",
});

module.exports = {
  initializeData,
  getKnex,
  tables,
  shutdownData,
};
