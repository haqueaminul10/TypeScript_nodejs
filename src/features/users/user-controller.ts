import { type Request, type Response } from 'express';
import db from '../../config/database.js';

// CREATE
export const create = async (req: Request, res: Response) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) {
      return res
        .status(400)
        .json({ message: 'username and email are required' });
    }

    const sql = 'INSERT INTO users (username, email) VALUES (?, ?)';
    const [result]: any = await db.query(sql, [username, email]);

    return res.status(201).json({
      id: result.insertId,
      username,
      email,
    });
  } catch (err: any) {
    console.error('Create user error:', err);
    return res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
};

// LIST (get all users)
export const list = async (_req: Request, res: Response) => {
  try {
    const sql = 'SELECT * FROM users';
    const [rows]: any = await db.query(sql);
    return res.json(rows);
  } catch (err: any) {
    console.error('List users error:', err);
    return res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
};

// GET (get user by ID)
export const get = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const sql = 'SELECT * FROM users WHERE id = ?';
    const [rows]: any = await db.query(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(rows[0]);
  } catch (err: any) {
    console.error('Get user error:', err);
    return res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
};

// UPDATE
export const update = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { username, email } = req.body;

    // Only update fields that are provided
    const fields: string[] = [];
    const values: any[] = [];

    if (username) {
      fields.push('username = ?');
      values.push(username);
    }
    if (email) {
      fields.push('email = ?');
      values.push(email);
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: 'No fields provided for update' });
    }

    const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);

    const [result]: any = await db.query(sql, values);
    return res.json({ affectedRows: result.affectedRows });
  } catch (err: any) {
    console.error('Update user error:', err);
    return res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
};

// DELETE
export const remove = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const sql = 'DELETE FROM users WHERE id = ?';
    const [result]: any = await db.query(sql, [id]);
    return res.json({ affectedRows: result.affectedRows });
  } catch (err: any) {
    console.error('Delete user error:', err);
    return res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
};
