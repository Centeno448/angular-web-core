-- Ejecutar linea por linea

INSERT INTO public."AppRole" (name) VALUES ('user');
INSERT INTO public."AppRole" (name) VALUES ('admin');

-- Credenciales para aplicativo
-- Usuario: admin
-- Clave: admin
INSERT INTO public."AppUser" (username, email, password, role) 
VALUES ('admin', 'admin@mail.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', (SELECT id from public."AppRole" WHERE name = 'admin'));

