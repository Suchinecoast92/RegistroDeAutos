# 📋 Instrucciones para Configurar MySQL en XAMPP

## 🚀 Pasos para Configurar la Base de Datos

### 1️⃣ Iniciar XAMPP
1. Abre el **Panel de Control de XAMPP**
2. Inicia los servicios:
   - ✅ **Apache** (si quieres usar phpMyAdmin)
   - ✅ **MySQL** (obligatorio - puerto 3306)

### 2️⃣ Crear la Base de Datos

Tienes **dos opciones** para ejecutar el archivo SQL:

#### **Opción A: Usando phpMyAdmin (Recomendado)**
1. Abre tu navegador y ve a: `http://localhost/phpmyadmin`
2. Haz clic en la pestaña **"SQL"** en la parte superior
3. Abre el archivo `database.sql` con un editor de texto
4. Copia todo el contenido del archivo
5. Pégalo en el campo de texto de phpMyAdmin
6. Haz clic en el botón **"Continuar"** o **"Ejecutar"**
7. Deberías ver el mensaje: "Base de datos creada exitosamente"

#### **Opción B: Usando Línea de Comandos**
1. Abre una terminal (CMD o PowerShell)
2. Navega a la carpeta de instalación de XAMPP:
   ```bash
   cd C:\xampp\mysql\bin
   ```
3. Ejecuta MySQL:
   ```bash
   mysql -u root -p
   ```
4. Cuando te pida la contraseña, presiona **Enter** (sin contraseña por defecto)
5. Ejecuta el archivo SQL:
   ```sql
   source C:\Users\Moise\Proyecto2\database.sql
   ```

### 3️⃣ Verificar la Instalación
En phpMyAdmin, deberías ver:
- ✅ Base de datos: **tasks_db**
- ✅ Tabla: **tasks** con 3 registros de ejemplo

Estructura de la tabla:
```
tasks
├── id (INT, AUTO_INCREMENT, PRIMARY KEY)
├── title (VARCHAR 255, NOT NULL)
├── description (TEXT)
├── status (ENUM: pending, in_progress, completed)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### 4️⃣ Iniciar el Servidor Node.js
Una vez que la base de datos esté lista:

```bash
npm start
```

Deberías ver en la consola:
```
✅ Conexión exitosa a MySQL
✅ Servidor escuchando en http://localhost:3000
```

### 5️⃣ Probar la Aplicación
Abre en tu navegador:
```
http://localhost:3000/tasks.html
```

## ⚙️ Configuración de la Conexión

Si necesitas cambiar la configuración de MySQL, edita el archivo:
```
config/database.js
```

Parámetros por defecto:
```javascript
{
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',  // Sin contraseña por defecto en XAMPP
  database: 'tasks_db'
}
```

## 🔧 Solución de Problemas

### ❌ Error: "ER_ACCESS_DENIED_ERROR"
**Problema:** Usuario o contraseña incorrectos

**Solución:**
1. Ve a `config/database.js`
2. Verifica que `user` sea `'root'`
3. Verifica que `password` sea `''` (vacío) o tu contraseña de MySQL

### ❌ Error: "ER_BAD_DB_ERROR"
**Problema:** La base de datos no existe

**Solución:**
1. Ejecuta el archivo `database.sql` en phpMyAdmin o MySQL
2. Verifica que se creó la base de datos `tasks_db`

### ❌ Error: "ECONNREFUSED"
**Problema:** MySQL no está corriendo

**Solución:**
1. Abre el Panel de Control de XAMPP
2. Inicia el servicio **MySQL**
3. Verifica que esté corriendo en el puerto 3306

### ❌ Error: "Client does not support authentication protocol"
**Problema:** Versión de MySQL incompatible con el método de autenticación

**Solución:**
En MySQL, ejecuta:
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
FLUSH PRIVILEGES;
```

## 📊 Comandos SQL Útiles

### Ver todas las tareas
```sql
SELECT * FROM tasks;
```

### Contar tareas por estado
```sql
SELECT status, COUNT(*) as total 
FROM tasks 
GROUP BY status;
```

### Limpiar todas las tareas
```sql
DELETE FROM tasks;
```

### Resetear el AUTO_INCREMENT
```sql
ALTER TABLE tasks AUTO_INCREMENT = 1;
```

### Eliminar la base de datos (cuidado)
```sql
DROP DATABASE tasks_db;
```

## 📝 Estructura del Proyecto

```
Proyecto2/
├── config/
│   └── database.js         # Configuración de MySQL
├── public/
│   └── tasks.html          # Interfaz web
├── server.js               # Servidor con API REST
├── database.sql            # Script para crear la BD
├── package.json
└── INSTRUCCIONES_MYSQL.md  # Este archivo
```

## ✅ Ventajas de Usar MySQL

- ✅ **Persistencia**: Los datos NO se pierden al reiniciar el servidor
- ✅ **Escalabilidad**: Puede manejar miles de tareas
- ✅ **Consultas avanzadas**: Filtros, búsquedas, estadísticas
- ✅ **Respaldo**: Fácil hacer backup de la base de datos
- ✅ **Multi-usuario**: Varios servidores pueden conectarse a la misma BD

## 🎓 Próximos Pasos Sugeridos

1. Agregar autenticación de usuarios
2. Implementar paginación para muchas tareas
3. Agregar búsqueda por texto
4. Crear reportes y estadísticas
5. Implementar backup automático

---

**¿Necesitas ayuda?** Verifica que:
1. ✅ XAMPP esté corriendo
2. ✅ MySQL esté activo en el puerto 3306
3. ✅ La base de datos `tasks_db` exista
4. ✅ Las dependencias de npm estén instaladas (`npm install`)
