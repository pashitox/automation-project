-- =============================================
-- SCRIPT DE INICIALIZACIÓN GARANTIZADO
-- =============================================

-- Crear tablas
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    assignee_email VARCHAR(255),
    due_date TIMESTAMP,
    priority VARCHAR(50) DEFAULT 'medium',
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo
INSERT INTO projects (name, description) VALUES 
('Proyecto Marketing', 'Campaña de marketing Q4'),
('Desarrollo Web', 'Sitio web corporativo'),
('Automation Project', 'Sistema de automatización de tareas');

INSERT INTO tasks (project_id, title, description, assignee_email, priority, status) VALUES 
(1, 'Diseñar banners promocionales', 'Crear banners para redes sociales', 'design@company.com', 'high', 'completed'),
(1, 'Planificar contenido mensual', 'Calendarizar posts para noviembre', 'content@company.com', 'medium', 'in-progress'),
(2, 'Desarrollar API REST', 'Crear endpoints para el frontend', 'dev@company.com', 'high', 'in-progress'),
(3, 'Configurar n8n workflows', 'Implementar automatizaciones', 'automation@company.com', 'medium', 'pending');

-- Verificar creación
\echo '========================================='
\echo '✅ BASE DE DATOS CONFIGURADA EXITOSAMENTE'
\echo '========================================='
\echo 'Tablas creadas: projects, tasks'
\echo 'Datos insertados: 3 proyectos, 4 tareas'
