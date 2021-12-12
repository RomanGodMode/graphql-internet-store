<p>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# How to run

## running the production

in root of project

```bash
$ docker-compose -f docker-compose.prod.yml up --build
```

## development in watch mode

in folders **'server/'** and **'client/'**

```bash
$ npm install
```

then in root of project

```bash
$ docker-compose -f docker-compose.dev.yml up --build
```

