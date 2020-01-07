

//IMPORTANTE - LADO CLIENTE
//IMPORTANTE - Con el metodo "invoke" invocamos metodo del Hub, Concentrador o Servidor
//IMPORTANTE - A su vez el servidor o hub mediante el metodo "SendAsync"




// Establecer conexion hacia nuestro Endpoint de SignalR
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .configureLogging(signalR.LogLevel.Information) // Informacion del login
    .build();

// Realizar la conexion
connection.start().catch(function (err) {
    return console.error(err.toString());
});

// Establecer logica del boton conectar
// Capturar el nombre del grupo e invocamos al metodo "AdToGroupAsync" desde el cliente al Hub para que este agrege el grupo
document.getElementById("connect").addEventListener("click", function (event) {
    var group = document.getElementById("groupName").value;
    connection.invoke("AddToGroupAsync", group).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

// Establecer la logica del boton desconectar
//
document.getElementById("leave").addEventListener("click", function (event) {
    var group = document.getElementById("groupName").value;
    connection.invoke("RemoveFromGroupAsync", group).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("send").addEventListener("click", function (event) {
    var group = document.getElementById("groupName").value;
    var name = document.getElementById("name").value;
    var message = document.getElementById("message").value;

    connection.invoke("BroadcastMessageGroup", { Group: group, Name: name, Message: message }).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

connection.on("displayTextConnect", function (message) {
    var li = document.createElement("li");
    li.textContent = message;
    li.className = "list-group-item";
    document.getElementById("messages").appendChild(li);
});

connection.on("displayText", function (group, name, message) {
    var li = document.createElement("li");
    li.textContent = name + ' dice: ' + message;
    li.className = "list-group-item";
    document.getElementById("messages").appendChild(li);
});