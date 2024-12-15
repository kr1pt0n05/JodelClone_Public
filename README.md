# SWT Scrum: Hotel Booking System

## Table of Contents

1. [About the Project](#über-das-projekt)  
2. [Technologies Used](#verwendete-technologien)  
3. [Installation](#installation)  

---

## Über das Projekt

"The goal of this project is to implement a hotel booking system that 
allows travelers to search, reserve, and book available rooms."

---

## Used Technologies


[![Spring Boot][Spring Boot]][Spring Boot-url]  
[![PostgreSQL][PostgreSQL]][PostgreSQL-url]  
[![JavaScript][JavaScript]][JavaScript-url]

---

## Installation

### Requirements:

- JDK 17 or higher
- PostgreSQL Server 16 or higher
- Maven (for building yourself)

### Schritte

1. **Clone Repository**:  
```bash
git clone https://github.com/kr1pt0n05/SWT-Scrum-Project.git
```
   
2. **Set up PostgreSQL Server**:
```bash
#Log into PostgreSQL:
psql -U postgres

#Create new user:
CREATE USER hotel_root WITH PASSWORD '123456';

#Create new database:
CREATE DATABASE hotel;

#Grant all privileges:
GRANT ALL PRIVILEGES ON DATABASE hotel TO hotel_root;
```
   

3. **Build the application or use provided build in /target directory**:
```bash
#Navigate to root directory
cd "SWT-Scrum-Project/backend/booking"

#Build Spring Boot Application
mvn clean install
```


4. **Run application**:
```bash
java -jar target/hotel-0.0.1-SNAPSHOT.jar
```


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Spring Boot]: https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white
[Spring Boot-url]: https://spring.io/projects/spring-boot

[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/

[JavaScript]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript

