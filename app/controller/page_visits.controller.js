import db from "../config/connection.config.js";

const dbName = "page_visits";

export const getVisitCount = async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT * FROM ${dbName}`);

        if (rows.length > 0) {
            res.send({
                "status": true,
                "message": "Visits Data count fetached Successfully",
                "data": rows,
            });
        } else {
            res.send({
                "status": true,
                "message": "Visits Data is Empty",
                "data": [],
            });
        }
    } catch (error) {
        res.send({
            "status": false,
            "message": "Something Went Wrong",
            "data": [],
        });
    }
};


export const addOrUpdateVisit = async (req, res) => {
    const { page_name, page_url } = req.body;

    try {
        const [rows] = await db.query(
            `SELECT * FROM ${dbName} WHERE page_url = ?`,
            [page_url]
        );

        let action = "";

        if (rows.length > 0) {
            await db.query(
                `UPDATE ${dbName} 
                 SET page_count = page_count + 1, updated_at = NOW() 
                 WHERE page_url = ?`,
                [page_url]
            );
            action = "updated";
        } else {
            await db.query(
                `INSERT INTO ${dbName} 
                (page_name, page_url, page_count, created_at, updated_at) 
                VALUES (?, ?, ?, NOW(), NOW())`,
                [page_name, page_url, 1]
            );
            action = "inserted";
        }

        const [updatedData] = await db.query(
            `SELECT * FROM ${dbName} WHERE page_url = ?`,
            [page_url]
        );

        return res.send({
            status: true,
            message: `Page ${action} successfully`,
            data: updatedData[0],
        });

    } catch (error) {
        return res.send({
            status: false,
            message: "Something Went Wrong",
            data: [],
        });
    }
};