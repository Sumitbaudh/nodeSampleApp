const connection = require('../instances/dbConnection');
const QueryTypes = require('sequelize')
const moment = require('moment');

exports.insertTask = async (title, userId, details) => {
    try {
        let currentTime = moment().format("YYYY-MM-DD HH:mm:ss")
        const query = `INSERT INTO "to_do_list" (title, added_by, details, is_completed, is_deleted, created_at) 
        values (?,?,?,?,?,?) RETURNING id;`
        const dataResponse = await connection.sequelize.query(query,
            {
                replacements: [title, userId, details, '0', '0', currentTime],
                type: QueryTypes.INSERT
            }
        );
        return dataResponse;
    } catch (error) {
        throw error;
    }
}

exports.updatetTaskStatus = async (status, taskId, completionDate) => {
    try {
        const query = `UPDATE "to_do_list" SET is_completed=?,date_of_completion=? WHERE id=? RETURNING id;`
        const dataResponse = await connection.sequelize.query(query,
            {
                replacements: [status, completionDate, taskId],
                type: QueryTypes.UPDATE
            }
        );
        return dataResponse;
    } catch (error) {
        throw error;
    }
}

exports.getTaskDetailsById = async (taskId) => {
    try {
        const query = `SELECT * FROM "to_do_list" WHERE id = ?;`
        const dataResponse = await connection.sequelize.query(query,
            {
                replacements: [taskId],
                type: QueryTypes.SELECT
            }
        );
        return dataResponse;
    } catch (error) {
        throw error;
    }
}

exports.markTaskDeletedById = async (taskId) => {
    try {
        const query = `UPDATE "to_do_list" SET is_deleted='1' WHERE id=? RETURNING id;`
        const dataResponse = await connection.sequelize.query(query,
            {
                replacements: [taskId],
                type: QueryTypes.UPDATE
            }
        );
        return dataResponse;
    } catch (error) {
        throw error;
    }
}

exports.getTaskListByUser = async (userId, startDate, endDate) => {
    try {
        const query = `SELECT * FROM "to_do_list" WHERE id = ? AND created_at BETWEEN ? AND ?;`
        const dataResponse = await connection.sequelize.query(query,
            {
                replacements: [userId, startDate, endDate],
                type: QueryTypes.SELECT
            }
        );
        return dataResponse;
    } catch (error) {
        throw error
    }
}