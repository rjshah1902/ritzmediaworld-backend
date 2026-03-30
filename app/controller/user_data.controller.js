import db from "../config/connection.config.js";

const dbName = "user_data";

export const getUsers = async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT * FROM ${dbName}`);

        res.send({
            status: true,
            message: "Users fetched successfully",
            data: rows,
        });
    } catch (error) {
        res.send({
            status: false,
            message: "Something went wrong",
            data: [],
        });
    }
};

export const addUser = async (req, res) => {
    const { ip_address, brower_type } = req.body;

    try {
        const [existing] = await db.query(
            `SELECT * FROM ${dbName} WHERE ip_address = ?`,
            [ip_address]
        );

        let user;

        if (existing.length > 0) {
            await db.query(
                `UPDATE ${dbName} 
         SET brower_type = ?, updated_at = NOW()
         WHERE ip_address = ?`,
                [brower_type, ip_address]
            );

            const [updatedUser] = await db.query(
                `SELECT * FROM ${dbName} WHERE ip_address = ?`,
                [ip_address]
            );

            user = updatedUser[0];
        } else {
            const [result] = await db.query(
                `INSERT INTO ${dbName} (ip_address, brower_type, created_at, updated_at)
         VALUES (?, ?, NOW(), NOW())`,
                [ip_address, brower_type]
            );

            const [newUser] = await db.query(
                `SELECT * FROM ${dbName} WHERE id = ?`,
                [result.insertId]
            );

            user = newUser[0];
        }

        res.send({
            status: true,
            message: "User Saved Successfully",
            data: user,
        });
    } catch (error) {
        console.error(error);
        res.send({
            status: false,
            message: "Something went wrong",
            data: [],
        });
    }
};



export const getUserDetails = async (req, res) => {
    const { user_id } = req.query;

    try {
        // ✅ validation
        if (!user_id) {
            return res.send({
                status: false,
                message: "user_id is required",
                data: [],
            });
        }

        const [rows] = await db.query(
            `SELECT * FROM user_data WHERE id = ?`,
            [user_id]
        );

        if (rows.length > 0) {
            return res.send({
                status: true,
                message: "User fetched successfully",
                data: rows[0], // 👈 single user
            });
        } else {
            return res.send({
                status: false,
                message: "User not found",
                data: [],
            });
        }

    } catch (error) {
        return res.send({
            status: false,
            message: "Something went wrong",
            data: [],
        });
    }
};