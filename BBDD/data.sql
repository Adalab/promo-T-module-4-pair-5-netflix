CREATE TABLE movies (
    id INT not null auto_increment primary key,
    title VARCHAR(45) not null,
    genre VARCHAR(45) not null,
    image VARCHAR(1000) not null,
    category VARCHAR(45) not null,
    `year` INT 
    
    );

CREATE TABLE users (
idUser INT primary key not null auto_increment,
user VARCHAR(45) not null,
password VARCHAR(45) not null,
name VARCHAR(45) not null,
email VARCHAR(45) not null, 
plan_details VARCHAR(45) not null
);

CREATE TABLE actors (
idActor INT auto_increment not null primary key,
name VARCHAR(45) not null,
lastname VARCHAR(45) not null,
country VARCHAR(45) not null,
year_birthday INT 
);

INSERT INTO movies (title, genre, image, category, year)
VALUES ('Pulp Fiction', 'Crimen', 'https://pics.filmaffinity.com/pulp_fiction-210382116-large.jpg', 'TOP 10', '1994'),
('La vita è bella', 'Comedia', 'https://pics.filmaffinity.com/la_vita_e_bella-646167341-mmed.jpg', 'TOP 10', '1996'),
('Forrest Gump', 'Comedia', 'https://pics.filmaffinity.com/forrest_gump-212765827-mmed.jpg', 'TOP 10', '1994');

INSERT INTO users (user, password, name, email, plan_details)
VALUES('laura_dev', 'laura', 'Laura', 'laura@gmail.com', 'Standard'),
('maria_dev', 'maria', 'Maria', 'maria@gmail.com', 'Standard'),
('ester_dev', 'ester', 'Ester', 'ester@gmail.com', 'Standard');

INSERT INTO actors (name, lastname, country, year_birthday)
VALUES('Tom', 'Hanks', 'Estados Unidos', '1956'),
('Roberto', 'Benigni', 'Italia', '1952'),
('John', 'Travolta', 'Estados Unidos', '1954');

SELECT * FROM movies;

SELECT title, genre FROM movies WHERE year>1990;

SELECT title FROM movies WHERE category='TOP 10';

UPDATE movies SET year=1997 WHERE title = 'La vita è bella';

SELECT * FROM actors;

SELECT name FROM actors WHERE year_birthday BETWEEN 1950 AND 1960;

SELECT name, lastname FROM actors WHERE country='Estados Unidos';

SELECT user FROM users WHERE plan_details='Standard';

DELETE FROM users WHERE user LIKE 'M%';

CREATE TABLE rel_movies_users (
id INT not null auto_increment primary key,
fkIdMovies INT,
fkIdUsers INT,
FOREIGN KEY (fkIdMovies) REFERENCES movies (id),
FOREIGN KEY (fkIdUsers) REFERENCES users (idUser)
);

INSERT INTO rel_movies_users (fkIdMovies, fkIdUsers)
VALUES ('1', '1'), ('2', '1'), ('2', '2');

CREATE TABLE rel_movies_actors (
id INT not null auto_increment primary key,
fkIdActor INT,
fkIdMovie INT,
FOREIGN KEY (fkIdActor) REFERENCES actors (idActor),
FOREIGN KEY (fkIdMovie) REFERENCES movies (id)
);

INSERT INTO rel_movies_actors (fkIdActor, fkIdMovie)
VALUES ('1', '1'), ('2', '2'), ('3', '3');