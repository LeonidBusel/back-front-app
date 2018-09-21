const genId = function() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

module.exports = {
    lastUpdate: 1,
    list: [
        {
            "id": '_' + genId(),
            "title": "Some ToDo 1",
            "done": false,
        }, {
            "id": '_' + genId(),
            "title": "Another ToDo 2",
            "done": true,
        }, {
            "id": '_' + genId(),
            "title": "More ToDo 3",
            "done": false,
        }, {
            "id": '_' + genId(),
            "title": "One More ToDo 4",
            "done": false,
        }
    ]
};