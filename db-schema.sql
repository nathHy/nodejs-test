# docker exec -i $(docker ps -q -f name=mysql) mysql -uroot -proot < db-schema.sql
CREATE DATABASE IF NOT EXISTS `graphql`;
USE `graphql`;
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`
(
    id INT AUTO_INCREMENT,
    price FLOAT,
    name CHAR(30),
    description CHAR(30),
    imageUrl CHAR(30),
    PRIMARY KEY (id)
);

INSERT INTO `product` (price, name, description, imageUrl)
VALUES
(1.50, 'product 1', 'some product #1', 'http://someurl/image1.png'),
(2.50, 'product 2', 'some product #2', 'http://someurl/image2.png'),
(3.50, 'product 3', 'some product #3', 'http://someurl/image3.png'),
(4.50, 'product 4', 'some product #4', 'http://someurl/image4.png'),
(5.50, 'product 5', 'some product #5', 'http://someurl/image5.png');