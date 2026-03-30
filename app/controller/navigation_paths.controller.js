import db from "../config/connection.config.js";

const dbName = "navigation_paths";

export const addNavigationPath = async (req, res) => {
    const { current_page, next_page, user_id } = req.body;

    try {
        let duration = 0;

        // 1. Get last navigation for this user
        const [lastVisit] = await db.query(
            `SELECT * FROM ${dbName} 
             WHERE user_id = ? 
             ORDER BY created_at DESC 
             LIMIT 1`,
            [user_id]
        );

        if (lastVisit.length > 0) {
            const lastTime = new Date(lastVisit[0].created_at).getTime();
            const currentTime = new Date().getTime();

            // duration in seconds
            duration = Math.floor((currentTime - lastTime) / 1000);
        }

        // 2. Insert new navigation with duration
        const [result] = await db.query(
            `INSERT INTO ${dbName} 
            (current_page, next_page, user_id, duration, created_at, updated_at)
            VALUES (?, ?, ?, ?, NOW(), NOW())`,
            [current_page, next_page, user_id, duration]
        );

        // 3. Fetch inserted data
        const [data] = await db.query(
            `SELECT * FROM ${dbName} WHERE id = ?`,
            [result.insertId]
        );

        res.send({
            status: true,
            message: "Navigation path added with duration",
            data: data[0],
        });

    } catch (error) {
        res.send({
            status: false,
            message: "Something went wrong",
            data: [],
        });
    }
};

export const getUserJourney = async (req, res) => {
    const { user_id } = req.query;

    try {
        const [rows] = await db.query(
            `SELECT current_page, next_page, created_at
             FROM ${dbName}
             WHERE user_id = ?
             ORDER BY created_at ASC`,
            [user_id]
        );

        res.send({
            status: true,
            message: "User journey fetched",
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