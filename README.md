# 🚀 PROYECTO WEB II
<P>Este proyecto tiene como objetivo implementar y demostrar el uso de los métodos HTTP GET, POST, PUT y DELETE en base a un programa de citas medicas donde habrán tablas de citas, pacientes, especialidades y doctores en un servidor Ubuntu. A través de este proyecto interactuamos con una base de datos utilizando estos métodos desde un servidor basado en Linux.<P>
   
## 📌 Tabla de Contenido  
1. [Tecnologías Utilizadas](#tecnologias-utilizadas)
   - [Ubuntu Server](#ubuntu-server)
   - [Navicat](#navicat)
   - [Postman](#postman)
2. [Clonación de Repositorio](#clonacion-repositorio)  
3. [Creación de Métodos](#creacion-de-metodos)  
   - [Métodos GET](#metodos-get)  
   - [Métodos POST](#metodos-post)  
   - [Métodos PUT por ID](#metodos-put-por-id)  
   - [Métodos DELETE por ID](#metodos-delete-por-id)  
4. [Pruebas de Métodos](#pruebas-de-metodos)
   - [Método GET](#metodo-get)  
   - [Método POST](#metodo-post)  
   - [Método PUT por ID](#metodo-put)  
   - [Método DELETE por ID](#metodo-delete)

## 📌TECNOLOGIAS UTILIZADAS
## 🎈UBUNTU SERVER
![Ubuntu](https://th.bing.com/th/id/OIP.ToGzWE7YWgD4f88FmJPwqgAAAA?rs=1&pid=ImgDetMain)
## 🎈NAVICAT
![Navicat](https://th.bing.com/th/id/OIP.M-yeXl_2K0r-kY_W_-eriQAAAA?rs=1&pid=ImgDetMain)
## 🎈POSTMAN
![Postman](https://th.bing.com/th/id/OIP.p_mVTStF7NkQg0_rI2kkPwAAAA?w=364&h=325&rs=1&pid=ImgDetMain)

## 🔧CLONACION REPOSITORIO
### COMANDOS:
- sudo apt install git (Instalar git en el servidor)
- git clone https://github.com/Moralezzz018/Citas-Medicas.git 
## 🛠CREACION DE METODOS
### METODOS GET:
<li>GET CITAS</li>
<li>GET DOCTORES</li>
<li>GET ESPECIALIDADES</li>
<li>GET PACIENTES</li> <br>

![Metodos get](https://github.com/user-attachments/assets/3e73dcf2-7041-40af-9114-2044ca9a3067)
### METODOS POST:
<li>POST CITAS</li>
<li>POST DOCTORES</li> <br>

![POST CITAS, DOCTORES](https://github.com/user-attachments/assets/6cf521c9-0509-4a9d-a2c0-3324b5b9506d)

<li>POST ESPECIALIDADES</li>
<li>POST PACIENTES</li> <br>

![POST ESPECIALIDAD, PACIENTES](https://github.com/user-attachments/assets/94f9fad0-a394-4c2b-974c-43affe37207c)
### METODOS PUT POR ID:
<li>PUT PACIENTES</li>
<li>PUT DOCTORES</li><br>

![PUT PACIENTES, DOCTORES ](https://github.com/user-attachments/assets/8e847547-d4c0-4b3c-b716-63227f77ab83)
<li>PUT ESPECIALIDADES</li>
<li>PUT CITAS</li> <br>

![PUT ESPECIALIDADES, CITAS](https://github.com/user-attachments/assets/94edf491-4dfa-4eb0-9ed3-b958c5e4fd49)
### METODOS DELETE POR ID:
<li>DELETE CITAS</li>
<li>DELETE DOCTORES</li>

![DELETE DOCTOR, CITAS](https://github.com/user-attachments/assets/8080503f-be08-4fde-90ef-1af1dd8311b3)
<li>DELETE ESPECIALIDADES</li>
<li>DELETE PACIENTES</li> <br>

![DELETE ESPECIALIDADES, PACIENTES](https://github.com/user-attachments/assets/8620ab9f-1ec2-42f8-8cf0-71a9b0cf8be2)

## 🛠PRUEBAS DE METODOS:
<P>Para probar los metodos utilizaremos una aplicación llamada postman, por medio de la ip del servidor nos facilitará la aplicación y prueba de estos métodos, hay que tener en cuenta que cada método funciona diferente.</P>
<ol>
   <li>GET: Muestra los datos de la db</li>
   <li>POST: Agrega datos a la db</li>
   <li>PUT: Actualiza datos de una tabla</li>
   <li>DELETE: Elimina datos en la db</li>
</ol>

### METODO GET:

![GET PRUEBA](https://github.com/user-attachments/assets/5bf2f8e3-56ed-4395-b7c0-c23e137074b4)

### METODO POST:
En este ejercicio haremos un post a pacientes.
Recalcar que para todos los post es la misma estructura, solo hay que tomar en cuenta los campos que tenemos en la db y colocarlos correctamente en el raw. 

![POST PRUEBA](https://github.com/user-attachments/assets/78e45c42-015b-4f6d-9da4-6bf62b31029c)

### METODO PUT:
Antes de actualizar la cita con id 7:

![PUT ANTES](https://github.com/user-attachments/assets/d9723c06-d94c-46e4-9019-8427f4861af7)

Vamos a actualizar el estado, de "Confirmada" pasara a "Pendiente"

![image](https://github.com/user-attachments/assets/9a0f1425-96bc-4c8b-a105-c49c91433664)

El actualizar citas es por medio del ID, entonces para usar el postman colocamos la ip del servidor más /"La tabla"/"id del campo"

![image](https://github.com/user-attachments/assets/7b28f442-9a5e-44ab-8d3c-e9e78b3614b1)

### METODO DELETE:
Con el método get podemos ver los campos de la tabla que tenemos, en este caso utilizaremos la tabla de pacientes:

![Mostrar pacientes](https://github.com/user-attachments/assets/53fd8b5b-9ed9-4faa-8ee4-d0576143a256)

Eliminaremos el paciente con ID: 2

![Eliminar pacientes](https://github.com/user-attachments/assets/2dae4468-f568-47d1-b280-fc60cdc36dee)

El json nos retorna un mensaje de "Paciente eliminado correctamente", para revisar que se haya eliminado solo usamos el método post para revisar que el paciente se haya elminado correctamente. 
![Resultado](https://github.com/user-attachments/assets/eba0ae29-2441-4254-a34d-26c68662d9f4)




