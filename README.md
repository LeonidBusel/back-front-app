# Тестовое задание **IT-TERRA**
## Table of Contents
- [Clone Project](#clone-project)
- [Run Back-end](#run-back-end)
- [Run Front-end](#run-front-end)

## Clone Project
```
git clone https://github.com/cmd88/it-terra-task.git
```

### Run Back-end
Перейти в папку back-end и выполнить:
```
npm install
node app.js 
``` 

Конфигурация сервера находиться в файле config.json. Обновление данных между фронтом и бэком, для быстроты разработки,
происходит с полной заменой всего списка ToDo, а не точечными командами (добавить/удалить/редактировать). Если остановить 
сервер, и внести изменения в браузере, то при запуске сервера подтянуться изменения с браузера. Если в нескольких браузерах 
изменить, то возьмется весь список с браузера, в котором наиболее свежие изменения.

## Run Front-end
Перейти в папку front-end и выполнить:
```
npm install
npm run leave
```