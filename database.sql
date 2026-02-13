-- =============================================
-- Base de Datos para Sistema de Registro de Autos
-- =============================================

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS registro_autos_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos
USE registro_autos_db;

-- =============================================
-- TABLA: clientes
-- =============================================
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(150) UNIQUE,
    direccion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_nombre (nombre),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLA: autos
-- =============================================
CREATE TABLE IF NOT EXISTS autos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    anio INT NOT NULL,
    placas VARCHAR(20) NOT NULL UNIQUE,
    cliente_id INT NOT NULL,
    color VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_placas (placas),
    INDEX idx_marca (marca),
    INDEX idx_cliente (cliente_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- DATOS DE EJEMPLO
-- =============================================

-- Insertar clientes de ejemplo
INSERT INTO clientes (nombre, apellido, telefono, email, direccion) VALUES
('Juan', 'Pérez', '555-0101', 'juan.perez@email.com', 'Calle Principal 123'),
('María', 'González', '555-0102', 'maria.gonzalez@email.com', 'Avenida Central 456'),
('Carlos', 'Rodríguez', '555-0103', 'carlos.rodriguez@email.com', 'Boulevard Norte 789');

-- Insertar autos de ejemplo
INSERT INTO autos (marca, modelo, anio, placas, cliente_id, color) VALUES
('Toyota', 'Corolla', 2022, 'ABC-1234', 1, 'Blanco'),
('Honda', 'Civic', 2021, 'XYZ-5678', 1, 'Gris'),
('Ford', 'Mustang', 2023, 'DEF-9012', 2, 'Rojo'),
('Chevrolet', 'Cruze', 2020, 'GHI-3456', 2, 'Negro'),
('Nissan', 'Sentra', 2022, 'JKL-7890', 3, 'Azul');

-- =============================================
-- VERIFICACIÓN
-- =============================================
SELECT 'Base de datos creada exitosamente' AS mensaje;

-- Ver clientes
SELECT * FROM clientes;

-- Ver autos con información del cliente
SELECT 
    a.id,
    a.marca,
    a.modelo,
    a.anio,
    a.placas,
    a.color,
    CONCAT(c.nombre, ' ', c.apellido) AS dueno,
    c.telefono,
    c.email
FROM autos a
INNER JOIN clientes c ON a.cliente_id = c.id
ORDER BY a.created_at DESC;
