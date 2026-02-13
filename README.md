Sistema de Registro de Autos

Sistema CRUD completo para gestionar el registro de vehículos y sus propietarios con base de datos MySQL.

Características

CRUD Completo de Clientes**: Crear, leer, actualizar y eliminar clientes
CRUD Completo de Autos**: Gestión total de vehículos registrados
- **Relación Cliente-Auto**: Un cliente puede tener múltiples autos
- **Persistencia MySQL**: Datos almacenados permanentemente
- **Interfaz Moderna**: Diseño con efecto **Liquid Glass (Glassmorfismo)**
- **Imagen de Fondo**: Auto clásico visible a través del efecto vidrio
- **Efectos Visuales**: Blur, transparencias, animaciones suaves
- **Responsive**: Funciona en desktop y móviles
- **Validaciones**: Placas únicas, emails únicos, campos requeridos

Estructura de la Base de Datos

### Tabla: `clientes`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT (PK) | Identificador único |
| nombre | VARCHAR(100) | Nombre del cliente |
| apellido | VARCHAR(100) | Apellido del cliente |
| telefono | VARCHAR(20) | Teléfono (opcional) |
| email | VARCHAR(150) | Email único (opcional) |
| direccion | TEXT | Dirección completa (opcional) |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Fecha de actualización |

### Tabla: `autos`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT (PK) | Identificador único |
| marca | VARCHAR(50) | Marca del auto |
| modelo | VARCHAR(50) | Modelo del auto |
| anio | INT | Año de fabricación |
| placas | VARCHAR(20) | Placas únicas |
| color | VARCHAR(30) | Color (opcional) |
| cliente_id | INT (FK) | ID del propietario |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Fecha de actualización |

**Relación**: Cada auto pertenece a un cliente (ON DELETE CASCADE)

## Instalación

### 1. Configurar MySQL en XAMPP

1. Inicia XAMPP y el servicio **MySQL**
2. Abre phpMyAdmin: `http://localhost/phpmyadmin`
3. Ve a la pestaña **SQL**
4. Copia y pega el contenido completo de `database.sql`
5. Haz clic en **Ejecutar**
6. Verifica que se creó la base de datos `registro_autos_db`

### 2. Guardar la Imagen de Fondo

**IMPORTANTE:** Guarda la imagen del auto que te proporcioné con el nombre:
```
c:\Users\Moise\ProyectoRegistroAutos\public\background.jpg
```

### 3. Instalar Dependencias

```bash
npm install
```

### 4. Iniciar el Servidor

```bash
npm start
```


```

### 5. Acceder a la Aplicación

Abre en tu navegador:
```
http://localhost:3000/registro-autos.html
```

## API REST

### Endpoints de Clientes

#### Obtener todos los clientes
```http
GET /api/clientes
```

#### Obtener un cliente
```http
GET /api/clientes/:id
```

#### Crear cliente
```http
POST /api/clientes
Content-Type: application/json

{
  "nombre": "Juan",
  "apellido": "Pérez",
  "telefono": "555-1234",
  "email": "juan@email.com",
  "direccion": "Calle Principal 123"
}
```

#### Actualizar cliente
```http
PUT /api/clientes/:id
Content-Type: application/json

{
  "nombre": "Juan Carlos",
  "telefono": "555-5678"
}
```

#### Eliminar cliente
```http
DELETE /api/clientes/:id
```

### Endpoints de Autos

#### Obtener todos los autos
```http
GET /api/autos
```

#### Obtener un auto
```http
GET /api/autos/:id
```

#### Obtener autos de un cliente
```http
GET /api/clientes/:id/autos
```

#### Crear auto
```http
POST /api/autos
Content-Type: application/json

{
  "marca": "Toyota",
  "modelo": "Corolla",
  "anio": 2022,
  "placas": "ABC-1234",
  "color": "Blanco",
  "clienteId": 1
}
```

#### Actualizar auto
```http
PUT /api/autos/:id
Content-Type: application/json

{
  "marca": "Honda",
  "modelo": "Civic",
  "anio": 2023,
  "placas": "XYZ-5678",
  "color": "Negro",
  "clienteId": 2
}
```

#### Eliminar auto
```http
DELETE /api/autos/:id
```

## Interfaz de Usuario

### Estilo Liquid Glass (Glassmorfismo)
La interfaz utiliza un diseño moderno de **glassmorfismo/liquid glass** con las siguientes características:

#### Efectos Visuales
- **Backdrop Blur**: Desenfoque de 20-40px que permite ver el fondo
- **Transparencias**: Elements con rgba(255,255,255, 0.08-0.25)
- **Bordes Luminosos**: Bordes sutiles con rgba(255,255,255, 0.15-0.4)
- **Sombras Suaves**: Box-shadows con inset para efecto 3D
- **Overlay Gradiente**: Fondo con gradiente rgba(0,0,0, 0.4-0.6)
- **Animaciones**: fadeInUp suaves al cargar, hover effects

#### Componentes con Efecto Glass
- **Cards**: Fondo transparente con blur intenso y brillo superior
- **Tablas**: Contenedor glass con filas semi-transparentes
- **Inputs**: Campos con transparencia y blur, borde al focus
- **Modales**: Blur de 40px con saturación 180%
- **Tabs**: Botones glass con transiciones suaves
- **Botones**: Efecto shimmer al hover con gradiente

### Pestaña Autos
- **Formulario de registro**: Marca, modelo, año, placas, color y dueño
- **Tabla de autos**: Lista todos los autos con información del dueño
- **Acciones**: Editar y eliminar cada auto
- **Modal de edición**: Permite modificar todos los campos

### Pestaña Clientes
- **Formulario de registro**: Nombre, apellido, teléfono, email y dirección
- **Tabla de clientes**: Lista todos los clientes registrados
- **Acciones**: Editar y eliminar cada cliente
- **Modal de edición**: Permite modificar información del cliente

### Características Visuales
- Imagen de fondo del auto clásico **visible a través del glass**
- Cards flotantes con efecto vidrio líquido
- Tablas responsivas con scroll horizontal personalizado
- Texto blanco con sombras para legibilidad
- Botones con colores intuitivos:
  - **Azul**: Editar
  - **Rojo**: Eliminar
  - **Gris oscuro**: Acciones primarias
  - Todos con efecto shimmer al hover

## ⚙️ Validaciones

### Clientes
- Nombre y apellido requeridos
- Email único (no se pueden repetir)
- Formato de email válido

### Autos
- Marca, modelo, año y placas requeridos
- Placas únicas (no se pueden repetir)
- Debe seleccionar un cliente existente
- Placas se convierten automáticamente a mayúsculas
- Año entre 1900-2099

## Integridad de Datos

- **CASCADE**: Al eliminar un cliente, se eliminan automáticamente todos sus autos
- **FOREIGN KEY**: Los autos siempre deben tener un cliente válido
- **UNIQUE**: Placas y emails no se pueden duplicar
- **Índices**: Búsquedas optimizadas por placas, email, nombre

## Consultas SQL Útiles

### Ver todos los autos con sus dueños
```sql
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
```

### Contar autos por cliente
```sql
SELECT 
    c.id,
    CONCAT(c.nombre, ' ', c.apellido) AS cliente,
    COUNT(a.id) AS total_autos
FROM clientes c
LEFT JOIN autos a ON c.id = a.cliente_id
GROUP BY c.id
ORDER BY total_autos DESC;
```

### Buscar autos por placas
```sql
SELECT * FROM autos WHERE placas LIKE '%ABC%';
```

## Solución de Problemas

### Error: "Base de datos no encontrada"
1. Verifica que MySQL esté corriendo en XAMPP
2. Ejecuta el archivo `database.sql` en phpMyAdmin
3. Confirma que la base de datos `registro_autos_db` existe

### Error: "Imagen de fondo no se muestra"
1. Guarda la imagen como `public/background.jpg`
2. Verifica que el nombre sea exactamente `background.jpg`
3. Recarga la página con Ctrl+F5

### Error: "Email ya registrado"
- Los emails deben ser únicos
- Usa otro email o edita el cliente existente

### Error: "Placas ya registradas"
- Las placas deben ser únicas
- Usa otras placas o edita el auto existente




