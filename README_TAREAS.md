# 📋 Sistema de Gestión de Tareas

Sistema CRUD completo para gestionar tareas con estados (Pendiente, En Progreso, Completada) y actualización en tiempo real usando Socket.io.

## 🚀 Características

- ✅ **CRUD Completo**: Crear, leer, actualizar y eliminar tareas
- ✏️ **Edición de Tareas**: Modal interactivo para editar título y descripción
- 🔄 **Actualización en Tiempo Real**: Todos los clientes conectados ven los cambios instantáneamente
- 📊 **Estados de Tareas**:
  - ⏸️ **Pendiente**: Tarea por hacer
  - 🔄 **En Progreso**: Tarea en desarrollo
  - ✅ **Completada**: Tarea terminada
- 🎨 **Interfaz Moderna**: Diseño responsive con fondo en escala de grises y botones de acción coloridos
- 🔍 **Filtros**: Visualiza tareas por estado
- 💾 **Persistencia MySQL**: Los datos se guardan permanentemente
- ⚪ **Diseño Profesional**: Interfaz limpia sin emojis, con botones de colores intuitivos

## 📁 Archivos Principales

- `server.js` - Servidor Express con API REST y Socket.io
- `public/tasks.html` - Interfaz web para gestionar tareas

## 🛠️ Instalación y Uso

1. **Instalar dependencias** (si no lo has hecho):
```bash
npm install
```

2. **Configurar MySQL en XAMPP**:
   - Inicia XAMPP y el servicio MySQL
   - Ejecuta el archivo `database.sql` en phpMyAdmin
   - Ver instrucciones detalladas en: `INSTRUCCIONES_MYSQL.md`

3. **Iniciar el servidor**:
```bash
npm start
```

4. **Acceder a la aplicación**:
   - Abrir en el navegador: `http://localhost:3000/tasks.html`

## 🔌 API REST

### Endpoints Disponibles

#### Obtener todas las tareas
```http
GET /api/tasks
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "title": "Completar proyecto",
    "description": "Finalizar el sistema de tareas",
    "status": "in_progress",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T14:20:00.000Z"
  }
]
```

#### Crear nueva tarea
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Nueva tarea",
  "description": "Descripción opcional"
}
```

**Respuesta:**
```json
{
  "id": 2,
  "title": "Nueva tarea",
  "description": "Descripción opcional",
  "status": "pending",
  "createdAt": "2024-01-15T15:00:00.000Z"
}
```

#### Actualizar tarea
```http
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Título actualizado",
  "description": "Nueva descripción",
  "status": "completed"
}
```

**Nota:** Todos los campos son opcionales en la actualización.

**Estados válidos:**
- `pending`
- `in_progress`
- `completed`

#### Eliminar tarea
```http
DELETE /api/tasks/:id
```

## 🌐 Socket.io

### Eventos

#### tasks:update
Se emite a todos los clientes cuando hay cambios en las tareas.

**Ejemplo de escucha:**
```javascript
socket.on('tasks:update', (tasks) => {
  console.log('Tareas actualizadas:', tasks);
  // Actualizar la interfaz
});
```

## 💡 Ejemplos de Uso

### Crear una tarea con JavaScript
```javascript
const response = await fetch('/api/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Mi nueva tarea',
    description: 'Detalles de la tarea'
  })
});

const newTask = await response.json();
console.log(newTask);
```

### Editar título y descripción de una tarea
```javascript
const response = await fetch('/api/tasks/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Título actualizado',
    description: 'Nueva descripción'
  })
});

const updatedTask = await response.json();
console.log(updatedTask);
```

### Actualizar solo el estado de una tarea
```javascript
const response = await fetch('/api/tasks/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    status: 'completed'
  })
});

const updatedTask = await response.json();
console.log(updatedTask);
```

### Eliminar una tarea
```javascript
const response = await fetch('/api/tasks/1', {
  method: 'DELETE'
});

const deletedTask = await response.json();
console.log('Tarea eliminada:', deletedTask);
```

## 🎨 Interfaz de Usuario

La interfaz incluye:
- **Formulario de creación**: Título y descripción para nuevas tareas
- **Modal de edición**: Ventana emergente para editar tareas existentes
  - Se cierra con botón Cancelar, haciendo clic fuera o presionando ESC
  - Animaciones suaves de entrada y salida
- **Filtros**: Ver todas, pendientes, en progreso o completadas
- **Tarjetas de tareas**: Con múltiples acciones
  - Botón **Editar** (azul) - Abre modal para editar título y descripción
  - Botón **En Progreso** (naranja) - Cambia estado
  - Botón **Completar** (verde) - Marca como completada
  - Botón **Pendiente** (naranja) - Regresa a pendiente
  - Botón **Eliminar** (rojo) - Elimina con confirmación
- **Colores por estado** (escala de grises):
  - Gris claro: Pendiente
  - Gris medio: En Progreso
  - Gris oscuro: Completada

## 📝 Notas Importantes

- ✅ Las tareas se almacenan en **MySQL** (persistencia permanente)
- ✅ Los datos NO se pierden al reiniciar el servidor
- ✅ Las actualizaciones son en tiempo real para todos los clientes conectados
- ✅ El título de la tarea es obligatorio, la descripción es opcional
- **Operaciones CRUD:**
  - ➕ **Crear** tareas con título y descripción
  - 📖 **Leer/Listar** todas las tareas
  - ✏️ **Actualizar** tareas:
    - Editar título y descripción (modal de edición)
    - Cambiar estado (pendiente, en progreso, completada)
  - 🗑️ **Eliminar** tareas con confirmación
- ⚙️ Requiere XAMPP con MySQL corriendo en el puerto 3306

## 🔧 Mejoras Futuras Sugeridas

- [x] ✅ Persistencia en base de datos MySQL
- [x] ✅ Modal de edición para modificar tareas
- [ ] Autenticación de usuarios
- [ ] Tareas asignadas a usuarios específicos
- [ ] Fechas de vencimiento
- [ ] Prioridades (alta, media, baja)
- [ ] Notificaciones push
- [ ] Exportar tareas a PDF/Excel
- [ ] Búsqueda de tareas por texto
- [ ] Paginación para listas grandes
- [ ] Arrastrar y soltar para reordenar tareas

## 📄 Licencia

ISC
