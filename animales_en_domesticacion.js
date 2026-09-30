/*---------------------------------------------*/
/*--|funcionalidad_animales_en_domesticacion|--*/
/*---------------------------------------------*/
const tarjetas = document.querySelectorAll(".tarjeta_animal");
const botonRestablecer = document.querySelector("#restablecerTodos");
const mensajeGeneral = document.querySelector("#mensajeGeneral");
const datosIniciales = {
    1: {
        nombre: "Perro",
        categoria: "Mamífero doméstico",
        descripcion: "Animal doméstico conocido por su compañía y relación con las personas.",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Domestic_dog_Golden_Retriever.jpg"
    },
    2: {
        nombre: "Gato",
        categoria: "Mamífero doméstico",
        descripcion: "Animal doméstico que suele convivir con las personas como mascota.",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg"
    },
    3: {
        nombre: "Conejo",
        categoria: "Mamífero doméstico",
        descripcion: "Animal que puede ser criado como mascota y convivir con las personas.",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/7/79/2010-baby-rabbit.jpg"
    }
};
/*---------------------------------------*/
/*--|obtener_datos_usando_localstorage|--*/
/*---------------------------------------*/
function obtenerDatos(id) {
    const datosGuardados = localStorage.getItem(`animales_${id}`);
    if (datosGuardados) {
        return JSON.parse(datosGuardados);
    }
    return datosIniciales[id];
}
/*-------------------*/
/*--|mostrar_datos|--*/
/*-------------------*/
function mostrarDatos(tarjeta) {
    const id = tarjeta.dataset.id;
    const datos = obtenerDatos(id);
    tarjeta.querySelector(".nombre_animal").textContent = datos.nombre;
    tarjeta.querySelector(".categoria_animal").textContent = datos.categoria;
    tarjeta.querySelector(".descripcion_animal").textContent = datos.descripcion;
    tarjeta.querySelector(".imagen_animal").src = datos.imagen;
    tarjeta.querySelector(".campo_nombre").value = datos.nombre;
    tarjeta.querySelector(".campo_categoria").value = datos.categoria;
    tarjeta.querySelector(".campo_descripcion").value = datos.descripcion;
    tarjeta.querySelector(".campo_imagen").value = datos.imagen;
}
/*---------------------------------------------------*/
/*--|guardar_y_restaurar_datos_usando_localstorage|--*/
/*---------------------------------------------------*/
function guardarDatos(tarjeta) {
    const id = tarjeta.dataset.id;
    const nombre = tarjeta.querySelector(".campo_nombre").value.trim();
    const categoria = tarjeta.querySelector(".campo_categoria").value.trim();
    const descripcion = tarjeta.querySelector(".campo_descripcion").value.trim();
    const imagen = tarjeta.querySelector(".campo_imagen").value.trim();
    const mensaje = tarjeta.querySelector(".mensaje");
    if (!nombre || !categoria || !descripcion || !imagen) {
        mensaje.textContent = "Completa todos los campos.";
        return;
    }
    const datos = {
        nombre,
        categoria,
        descripcion,
        imagen
    };
    localStorage.setItem(`animales_${id}`, JSON.stringify(datos));
    mostrarDatos(tarjeta);
    mensaje.textContent = "Información guardada correctamente.";
    setTimeout(() => {
        mensaje.textContent = "";
    }, 2500);
}
function restaurarDatos(tarjeta) {
    const id = tarjeta.dataset.id;
    const mensaje = tarjeta.querySelector(".mensaje");
    localStorage.removeItem(`animales_${id}`);
    mostrarDatos(tarjeta);
    mensaje.textContent = "Información restaurada.";
    setTimeout(() => {
        mensaje.textContent = "";
    }, 2500);
}
function restablecerTodos() {
    tarjetas.forEach((tarjeta) => {
        const id = tarjeta.dataset.id;
        localStorage.removeItem(`animales_${id}`);
        mostrarDatos(tarjeta);
    });
    mensajeGeneral.textContent = "Todos los animales fueron restablecidos.";
    setTimeout(() => {
        mensajeGeneral.textContent = "";
    }, 2500);
}
/*-----------------------------*/
/*--|eventos_de_los_animales|--*/
/*-----------------------------*/
tarjetas.forEach((tarjeta) => {
    const botonGuardar = tarjeta.querySelector(".boton_guardar");
    const botonRestaurar = tarjeta.querySelector(".boton_restaurar");
    mostrarDatos(tarjeta);
    botonGuardar.addEventListener("click", () => {
        guardarDatos(tarjeta);
    });
    botonRestaurar.addEventListener("click", () => {
        restaurarDatos(tarjeta);
    });
});
/*------------------------------*/
/*--|evento_restablecer_todos|--*/
/*------------------------------*/
botonRestablecer.addEventListener("click", () => {
    const confirmar = confirm("¿Quieres restablecer todos los animales?");
    if (confirmar) {
        restablecerTodos();
    }
});