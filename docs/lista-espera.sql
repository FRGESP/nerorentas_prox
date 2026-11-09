-- Lista de espera de la página de "Próximamente".
-- Correr UNA vez en la base de prueba (RENTAS), por ejemplo desde DataGrip o MySQL Workbench.
-- La tabla Lista_de_Espera ya existe y está vacía; esto la completa y crea el procedimiento que usa /api/lista-espera.

-- 1. Correo obligatorio y único, más la fecha de registro
ALTER TABLE Lista_de_Espera
    MODIFY Correo VARCHAR(100) NOT NULL,
    ADD COLUMN FechaRegistro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD CONSTRAINT UQ_LISTA_ESPERA_CORREO UNIQUE (Correo);

-- 2. Registra un correo. RES 0 = registrado; 1 = ya estaba en la lista
DROP PROCEDURE IF EXISTS SP_AÑADIR_LISTA;
CREATE PROCEDURE SP_AÑADIR_LISTA(IN CORREOIN VARCHAR(100))
    BEGIN
        INSERT IGNORE INTO Lista_de_Espera (Correo) VALUES (LOWER(TRIM(CORREOIN)));
        IF ROW_COUNT() > 0 THEN
            SELECT 0 AS RES;
        ELSE
            SELECT 1 AS RES;
        END IF;
    END;

-- 3. Para consultar los registros
-- SELECT IdEspera, Correo, FechaRegistro FROM Lista_de_Espera ORDER BY FechaRegistro DESC;
