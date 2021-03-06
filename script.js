var url = "http://localhost:8888";

function registerUser() {
     var username = document.getElementsByClassName("username");
     var password = document.getElementsByClassName("password");

     $.ajax({
         url: url + "/register",
         method: "post",
         data: {
             username: username[0].value,
             password: password[0].value
         }
     }).success(function(response){
         alert(response.message);
     }).error(function(response) {
         alert(response.message);
     });
}

function loginUser() {
    var username = document.getElementsByClassName("username");
    var password = document.getElementsByClassName("password");

    $.ajax({
        url: url + "/login",
        method: "post",
        data: {
            username: username[0].value,
            password: password[0].value
        }
    })
.success(function(response){
     window.location.assign("/home");
 }).error(function(response) {
     alert("Incorrect username or password!");
 });
}

function getUser() {
    var username = document.getElementsByClassName("username");

    $.ajax({
        url: url + "/user",
        method: "get"
    }).success(function(response){
        document.getElementsByClassName("username")[0].innerHTML = response.username;
    }).error(function(response) {
        alert("Cannot fetch data. Please try again");
    });
}

$.ajax({
    url: url+"/items",
    method: "get"
}).success(function(response){
    //loo through each row and display in the html
    for (var a = 0; a < response.lentgh; a++){
        var item = response[a];

        //Display owner items data in the table
        $("#itemtable").append("<tr>" +
            "<td>"+ item._id + "</td>"+
            "<td>"+ item.details + "</td>"+
            "<td>"+ item.post_time + "</td>"+
            "<td>"+ item.edit_time + "</td>"+
            '<td><button onclick="editItem(\'' + '\')">edit</button></td>'+
            '<td><button href="#" onclick="deleteItem(\'' + item._id + '\')">delete</button></td>'+
            "<td>" + item.isPublic + "</td>" +
            "</tr>");
    }
}).error(function(response){
    alert("Cannot fetch data. Please try again");
});

function editItem(id){
    alert(id);
}
function deleteItem(id){
    alert(_id);
}

function addItem() {
    var details = document.getElementsByClassName("details")[0];
    var isPublic = document.getElementsByClassName("isPublic")[0];

    console.log(isPublic.checked);

    $.ajax({
        url: url + "/add",
        method: "post",
        data: {
            details: details.value,
            isPublic: isPublic.checked
        }
    }).success(function(response){
        console.log(response);
        alert("Item successfully added!");
        //Append the data in the table
        $("#itemtable").append("<tr>" + 
            "<td>" + response.item._id + "</td>" +
            "<td>" + response.item.details + "</td>" + 
            "<td>" + response.item.post_time + "</td>" +
            "<td>" + response.item.edit_time + "</td>" +
            '<td><a href="">edit</a></td>' +
            '<td><a href="">delete</a></td>' +
            "<td>" + response.item.isPublic + "</td>" +
            "</tr>");

    }).error(function(response) {
        alert("Cannot add item. Please try again");
    });
}