const path = require("path");
const express = require("express");
const db = require("./config/database");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// ===== ENDPOINTS REST PARA CLIENTES =====

// Obtener todos los clientes
app.get("/api/clientes", async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, nombre, apellido, telefono, email, direccion, created_at as createdAt, updated_at as updatedAt FROM clientes ORDER BY nombre, apellido'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ error: "Error al obtener los clientes" });
  }
});

// Obtener un cliente por ID
app.get("/api/clientes/:id", async (req, res) => {
  const clienteId = parseInt(req.params.id);
  
  try {
    const [cliente] = await db.query(
      'SELECT id, nombre, apellido, telefono, email, direccion, created_at as createdAt, updated_at as updatedAt FROM clientes WHERE id = ?',
      [clienteId]
    );
    
    if (cliente.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    
    res.json(cliente[0]);
  } catch (error) {
    console.error('Error al obtener cliente:', error);
    res.status(500).json({ error: "Error al obtener el cliente" });
  }
});

// Crear un nuevo cliente
app.post("/api/clientes", async (req, res) => {
  const { nombre, apellido, telefono, email, direccion } = req.body;
  
  if (!nombre || nombre.trim() === "" || !apellido || apellido.trim() === "") {
    return res.status(400).json({ error: "Nombre y apellido son requeridos" });
  }
  
  try {
    const [result] = await db.query(
      'INSERT INTO clientes (nombre, apellido, telefono, email, direccion) VALUES (?, ?, ?, ?, ?)',
      [nombre.trim(), apellido.trim(), telefono || null, email || null, direccion || null]
    );
    
    const [newCliente] = await db.query(
      'SELECT id, nombre, apellido, telefono, email, direccion, created_at as createdAt, updated_at as updatedAt FROM clientes WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json(newCliente[0]);
  } catch (error) {
    console.error('Error al crear cliente:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: "El email ya está registrado" });
    }
    res.status(500).json({ error: "Error al crear el cliente" });
  }
});

// Actualizar un cliente
app.put("/api/clientes/:id", async (req, res) => {
  const clienteId = parseInt(req.params.id);
  const { nombre, apellido, telefono, email, direccion } = req.body;
  
  try {
    const [existing] = await db.query('SELECT id FROM clientes WHERE id = ?', [clienteId]);
    
    if (existing.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    
    const updates = [];
    const values = [];
    
    if (nombre !== undefined) {
      updates.push('nombre = ?');
      values.push(nombre.trim());
    }
    if (apellido !== undefined) {
      updates.push('apellido = ?');
      values.push(apellido.trim());
    }
    if (telefono !== undefined) {
      updates.push('telefono = ?');
      values.push(telefono);
    }
    if (email !== undefined) {
      updates.push('email = ?');
      values.push(email);
    }
    if (direccion !== undefined) {
      updates.push('direccion = ?');
      values.push(direccion);
    }
    
    if (updates.length > 0) {
      values.push(clienteId);
      await db.query(
        `UPDATE clientes SET ${updates.join(', ')} WHERE id = ?`,
        values
      );
    }
    
    const [updatedCliente] = await db.query(
      'SELECT id, nombre, apellido, telefono, email, direccion, created_at as createdAt, updated_at as updatedAt FROM clientes WHERE id = ?',
      [clienteId]
    );
    
    res.json(updatedCliente[0]);
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: "El email ya está registrado" });
    }
    res.status(500).json({ error: "Error al actualizar el cliente" });
  }
});

// Eliminar un cliente
app.delete("/api/clientes/:id", async (req, res) => {
  const clienteId = parseInt(req.params.id);
  
  try {
    const [cliente] = await db.query(
      'SELECT id, nombre, apellido, telefono, email, direccion FROM clientes WHERE id = ?',
      [clienteId]
    );
    
    if (cliente.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    
    await db.query('DELETE FROM clientes WHERE id = ?', [clienteId]);
    
    res.json(cliente[0]);
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    res.status(500).json({ error: "Error al eliminar el cliente" });
  }
});

// ===== ENDPOINTS REST PARA AUTOS =====

// Obtener todos los autos
app.get("/api/autos", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT 
        a.id, 
        a.marca, 
        a.modelo, 
        a.anio, 
        a.placas, 
        a.color,
        a.cliente_id as clienteId,
        CONCAT(c.nombre, ' ', c.apellido) as dueno,
        c.telefono as telefonoDueno,
        c.email as emailDueno,
        a.created_at as createdAt, 
        a.updated_at as updatedAt
      FROM autos a
      INNER JOIN clientes c ON a.cliente_id = c.id
      ORDER BY a.created_at DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener autos:', error);
    res.status(500).json({ error: "Error al obtener los autos" });
  }
});

// Obtener un auto por ID
app.get("/api/autos/:id", async (req, res) => {
  const autoId = parseInt(req.params.id);
  
  try {
    const [auto] = await db.query(
      `SELECT 
        a.id, 
        a.marca, 
        a.modelo, 
        a.anio, 
        a.placas, 
        a.color,
        a.cliente_id as clienteId,
        CONCAT(c.nombre, ' ', c.apellido) as dueno,
        c.telefono as telefonoDueno,
        c.email as emailDueno,
        a.created_at as createdAt, 
        a.updated_at as updatedAt
      FROM autos a
      INNER JOIN clientes c ON a.cliente_id = c.id
      WHERE a.id = ?`,
      [autoId]
    );
    
    if (auto.length === 0) {
      return res.status(404).json({ error: "Auto no encontrado" });
    }
    
    res.json(auto[0]);
  } catch (error) {
    console.error('Error al obtener auto:', error);
    res.status(500).json({ error: "Error al obtener el auto" });
  }
});

// Obtener autos de un cliente
app.get("/api/clientes/:id/autos", async (req, res) => {
  const clienteId = parseInt(req.params.id);
  
  try {
    const [rows] = await db.query(
      `SELECT 
        id, 
        marca, 
        modelo, 
        anio, 
        placas, 
        color,
        created_at as createdAt, 
        updated_at as updatedAt
      FROM autos
      WHERE cliente_id = ?
      ORDER BY created_at DESC`,
      [clienteId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener autos del cliente:', error);
    res.status(500).json({ error: "Error al obtener los autos del cliente" });
  }
});

// Crear un nuevo auto
app.post("/api/autos", async (req, res) => {
  const { marca, modelo, anio, placas, clienteId, color } = req.body;
  
  if (!marca || !modelo || !anio || !placas || !clienteId) {
    return res.status(400).json({ error: "Marca, modelo, año, placas y cliente son requeridos" });
  }
  
  try {
    // Verificar que el cliente existe
    const [cliente] = await db.query('SELECT id FROM clientes WHERE id = ?', [clienteId]);
    if (cliente.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    
    const [result] = await db.query(
      'INSERT INTO autos (marca, modelo, anio, placas, cliente_id, color) VALUES (?, ?, ?, ?, ?, ?)',
      [marca.trim(), modelo.trim(), anio, placas.trim().toUpperCase(), clienteId, color || null]
    );
    
    const [newAuto] = await db.query(
      `SELECT 
        a.id, 
        a.marca, 
        a.modelo, 
        a.anio, 
        a.placas, 
        a.color,
        a.cliente_id as clienteId,
        CONCAT(c.nombre, ' ', c.apellido) as dueno,
        a.created_at as createdAt, 
        a.updated_at as updatedAt
      FROM autos a
      INNER JOIN clientes c ON a.cliente_id = c.id
      WHERE a.id = ?`,
      [result.insertId]
    );
    
    res.status(201).json(newAuto[0]);
  } catch (error) {
    console.error('Error al crear auto:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: "Las placas ya están registradas" });
    }
    res.status(500).json({ error: "Error al crear el auto" });
  }
});

// Actualizar un auto
app.put("/api/autos/:id", async (req, res) => {
  const autoId = parseInt(req.params.id);
  const { marca, modelo, anio, placas, clienteId, color } = req.body;
  
  try {
    const [existing] = await db.query('SELECT id FROM autos WHERE id = ?', [autoId]);
    
    if (existing.length === 0) {
      return res.status(404).json({ error: "Auto no encontrado" });
    }
    
    // Si se proporciona clienteId, verificar que existe
    if (clienteId !== undefined) {
      const [cliente] = await db.query('SELECT id FROM clientes WHERE id = ?', [clienteId]);
      if (cliente.length === 0) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }
    }
    
    const updates = [];
    const values = [];
    
    if (marca !== undefined) {
      updates.push('marca = ?');
      values.push(marca.trim());
    }
    if (modelo !== undefined) {
      updates.push('modelo = ?');
      values.push(modelo.trim());
    }
    if (anio !== undefined) {
      updates.push('anio = ?');
      values.push(anio);
    }
    if (placas !== undefined) {
      updates.push('placas = ?');
      values.push(placas.trim().toUpperCase());
    }
    if (clienteId !== undefined) {
      updates.push('cliente_id = ?');
      values.push(clienteId);
    }
    if (color !== undefined) {
      updates.push('color = ?');
      values.push(color);
    }
    
    if (updates.length > 0) {
      values.push(autoId);
      await db.query(
        `UPDATE autos SET ${updates.join(', ')} WHERE id = ?`,
        values
      );
    }
    
    const [updatedAuto] = await db.query(
      `SELECT 
        a.id, 
        a.marca, 
        a.modelo, 
        a.anio, 
        a.placas, 
        a.color,
        a.cliente_id as clienteId,
        CONCAT(c.nombre, ' ', c.apellido) as dueno,
        a.created_at as createdAt, 
        a.updated_at as updatedAt
      FROM autos a
      INNER JOIN clientes c ON a.cliente_id = c.id
      WHERE a.id = ?`,
      [autoId]
    );
    
    res.json(updatedAuto[0]);
  } catch (error) {
    console.error('Error al actualizar auto:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: "Las placas ya están registradas" });
    }
    res.status(500).json({ error: "Error al actualizar el auto" });
  }
});

// Eliminar un auto
app.delete("/api/autos/:id", async (req, res) => {
  const autoId = parseInt(req.params.id);
  
  try {
    const [auto] = await db.query(
      `SELECT 
        a.id, 
        a.marca, 
        a.modelo, 
        a.anio, 
        a.placas, 
        a.color,
        CONCAT(c.nombre, ' ', c.apellido) as dueno
      FROM autos a
      INNER JOIN clientes c ON a.cliente_id = c.id
      WHERE a.id = ?`,
      [autoId]
    );
    
    if (auto.length === 0) {
      return res.status(404).json({ error: "Auto no encontrado" });
    }
    
    await db.query('DELETE FROM autos WHERE id = ?', [autoId]);
    
    res.json(auto[0]);
  } catch (error) {
    console.error('Error al eliminar auto:', error);
    res.status(500).json({ error: "Error al eliminar el auto" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
  console.log(`📁 Interfaz disponible en http://localhost:${PORT}/index.html`);
});
