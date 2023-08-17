const pool = require("../config");
const { io } = require("../socket");

const Messenger = {
  sendMessage: async (req, res) => {
    try {
      const { message, tags } = req.body;

      await pool.query("BEGIN");

      const messageResult = await pool.query(
        "INSERT INTO messages (message) VALUES ($1) RETURNING id",
        [message]
      );
      const messageId = messageResult.rows[0].id;

      if (tags && tags.length > 0) {
        const tagIdsResult = await pool.query(
          "SELECT id FROM tags WHERE name = ANY($1)",
          [tags]
        );
        const tagIds = tagIdsResult.rows.map((row) => row.id);

        for (const tagId of tagIds) {
          await pool.query(
            "INSERT INTO message_tags (messageId, tagId) VALUES ($1, $2)",
            [messageId, tagId]
          );
        }
      }

      await pool.query("COMMIT");

      const newMessage = {
        messageId,
        message,
        tags,
      };

      io.emit("getMessages", {
        newMessage,
      });

      res.json(newMessage);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getTags: async (req, res) => {
    try {
      const query = "SELECT * FROM tags";
      const result = await pool.query(query);
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getMessages: async (req, res) => {
    const tags = req.body.tags;

    try {
      let result = null;
      if (tags?.length > 0) {
        result = await pool.query(
          "SELECT DISTINCT ON (m.id) m.id AS message_id, m.message FROM messages m JOIN message_tags mt ON m.id = mt.messageId JOIN tags t ON mt.tagId = t.id WHERE t.name = ANY($1) ORDER BY m.id;",
          [tags]
        );
      } else {
        result = await pool.query(
          "SELECT DISTINCT ON (m.id) m.id AS message_id, m.message FROM messages m LEFT JOIN message_tags mt ON m.id = mt.messageId LEFT JOIN tags t ON mt.tagId = t.id WHERE t.name IS NULL"
        );
      }

      const messagesWithTags = result.rows.map((row) => ({
        id: row.message_id,
        message: row.message,
      }));

      res.status(200).json(messagesWithTags);
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
