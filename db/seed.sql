-- db/seed.sql
-- Testa dati lietotāju tabulai

USE prakse;

INSERT INTO users (name, email, password_hash, created_at) VALUES
('Jānis Bērziņš', 'janis@example.com', '$2b$10$hashedpassword1', NOW()),
('Anna Liepa', 'anna@example.com', '$2b$10$hashedpassword2', NOW()),
('Pēteris Kalniņš', 'peteris@example.com', '$2b$10$hashedpassword3', NOW())
ON DUPLICATE KEY UPDATE id=id;