/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    $('#btnGuardar').click(guardar);
    $('#txtFiltro').keyup(getListaEstudiante);
    $('#list_ajax').click(getAjaxUser);
    $('#txtFiltro').keyup(guardarEdad);
    var almacen = window.localStorage;
    var filtro = almacen.getItem("edadMax");
    $("#txtFiltro").val(filtro);
    var arreglo2 = JSON.parse(almacen.getItem("lista"));
    
    $.each(arreglo2, function (index, obb) {
                var mi_estudiante = new estudiante(obb.nombre, obb.apellido, obb.anio);
                lista_estudiantes.push(mi_estudiante);
            });
    getListaEstudiante();
    console.log(arreglo2);
});


var lista_estudiantes=[];

function estudiante(nombre, apellido, anio) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.anio = anio;
    this.edad = function () {
        return 2018-this.anio;
    };
    this.toString = function (){
        return this.nombre +" "+ this.apellido +" "+this.edad();
    };
}

function guardar() {
    //var nombre = document.getElementById("txtNombre").value;
    var nombre = $("#txtNombre").val();
    var apellido = $("#txtApellido").val();
    var anio = $("#txtAnioNac").val();
    var mi_estudiante = new estudiante(nombre, apellido, anio);
    lista_estudiantes.push(mi_estudiante);
    getListaEstudiante();
    
    //Guardar en base local.
    var almacen = window.localStorage;
    almacen.setItem("lista",JSON.stringify(lista_estudiantes));
}

function limpiarForm(){
    var nombre = $("#txtNombre").val("");
    var apellido = $("#txtApellido").val("");
    var anio = $("#txtAnioNac").val(""); 
}

function setEliminar(indice){
    alert("Eliminar");
    lista_estudiantes.splice(indice, 1);
}

function getListaEstudiante(){
    var html = " ";
    var el = {};
    filtro = $("#txtFiltro").val();
    for (var i=0; i < lista_estudiantes.length; i++) {
        el = lista_estudiantes[i];
        if (el.edad() === parseInt(filtro)) {
            html = html + "<li>" + el.toString() + " <input id='btDelete' data-indice='"+i+"' class='eli' type='submit' value='Eliminar'/></li>"; 
        }
        else if(filtro === "") {
            html = html + "<li>" + el.toString() + " <input id='btDelete' data-indice='"+i+"' class='eli' type='submit' value='Eliminar'/></li>";
        }
    }
    $('#listaEstudiante').html(html);
    $('.eli').click(function (){
        setEliminar($(this).data("indice"));
        getListaEstudiante();
    });
}

function getAjax(){
    $.ajax({
        type: "POST",
        //url: "/Home/GetPersons",
        url: "https://ghibliapi.herokuapp.com/films",
        data: { annoMaximo: 2018 },
        success: function (r) {
            $.each(r, function (index, obb) {
                var mi_estudiante = new estudiante(obb.nombre, obb.apellido, obb.annoNacimiento);
                lista_estudiantes.push(mi_estudiante);
            });
            getListaEstudiante();
        },
        error: function (err) {
            console.log("Error");
            console.log(err);
        }
    });
    
    console.log("Ejecución Fuera");
}

function getAjaxUser(){
    $.ajax({
        type: "GET",
        //url: "/Home/GetPersons",
        url: "https://reqres.in/api/users?page=2",
        success: function (r) {
            console.log(r);
            $.each(r.data, function (index, line) {
                var mi_estudiante = new estudiante(line.first_name, line.last_name, line.id);
                lista_estudiantes.push(mi_estudiante);  
            });
            getListaEstudiante();
        },
        error: function (err) {
            console.log("Error");
            console.log(err);
        }
    });
}

function guardarEdad(){
    var almacen = window.localStorage;
    var filtro = $("#txtFiltro").val();
    almacen.setItem("edadMax",filtro);
}