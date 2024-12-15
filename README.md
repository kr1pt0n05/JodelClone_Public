# Softwarearchitektur: Jodel-like Application

## Table of Contents

1. [About the Project](#über-das-projekt)  
2. [Technologies Used](#verwendete-technologien)  
3. [Installation](#installation)  

---

## About the Project

A simple web-based Jodel application allowing users to share thoughts, hints, and observations through posts.
Users can like or dislike comments, vote on posts and comments, and write comments to participate in discussions.
When creating posts, the user's coordinates are captured, and when retrieving posts, only posts within a 10 km radius are displayed.

---

## Used Technologies
[![React][React]][React-url]  
[![Vite][Vite]][Vite-url]  
[![Spring Boot][Spring Boot]][Spring Boot-url]  
[![PostgreSQL][PostgreSQL]][PostgreSQL-url]  
[![Docker][Docker]][Docker-url]  

---

## Installation

### Requirements:

- Docker installed

### Schritte

1. **Clone Repository**:  
```bash
git clone https://github.com/kr1pt0n05/JodelClone_Public.git
```

2. **Build Application**:
```bash
mvn clean package -Pdocker
```

3. **Run Application**:
```bash
docker compose up -d --build
```

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Spring Boot]: https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white
[Spring Boot-url]: https://spring.io/projects/spring-boot

[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/

[React]: https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black
[React-url]: https://reactjs.org/

[Docker]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/

[Vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
