const pool = require("../config");

const Messenger = {
  sendMessage: async (req, res) => {
    try {
      const { message, tag } = req.body;

      let tagId;

      if (tag.trim() !== "") {
        const query = "SELECT id FROM tags WHERE tag = $1";
        const result = await pool.query(query, [tag]);

        if (result.rows.length > 0) {
          tagId = result.rows[0].id;
        } else {
          const insertQuery =
            "INSERT INTO tags (tag) VALUES ($1) RETURNING id, tag";
          const insertResult = await pool.query(insertQuery, [tag]);
          tagId = insertResult.rows[0].id;
        }
      }

      const insertMessageQuery =
        "INSERT INTO messages (message, tag_id) VALUES ($1, $2) RETURNING *";
      const insertMessageResult = await pool.query(insertMessageQuery, [
        message,
        tagId,
      ]);

      const newMessage = {
        id: insertMessageResult.rows[0].id,
        message: insertMessageResult.rows[0].message,
        tag: tag,
      };

      io.emit("getMessage", newMessage);

      res.json(newMessage);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getTags: async (req, res) => {
    try {
      const query = "SELECT * FROM tags";
      const result = await pool.query(query);
      if (result.rows.length > 0) {
        res.status(200).json(result.rows);
      } else {
        res.status(200).json(result.rows);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getMessages: async (req, res) => {
    try {
      const query =
        "SELECT messages.*, tags.tag FROM messages LEFT JOIN tags ON messages.tag_id = tags.id";
      const result = await pool.query(query);

      const messagesWithTags = result.rows.map((row) => ({
        id: row.id,
        message: row.message,
        tag: row.tag,
      }));

      res.json(messagesWithTags);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createTag: async (req, res) => {
    try {
      const { tag } = req.body;

      const result = await pool.query(
        "INSERT INTO tags (name) VALUES ($1) RETURNING *",
        [tag]
      );

      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteTag: async (req, res) => {
    try {
      const { tag } = req.body.tagData;

      const result = await pool.query("DELETE FROM tags WHERE name = ($1)", [
        tag,
      ]);

      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = Messenger;
