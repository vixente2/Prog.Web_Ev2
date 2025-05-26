var datos = [];
var nacionalidad = [];
var categorias = [];
var productos = [];

function VerMasDatos(folio) {
    var estruc = "";
    $.each(datos, function (i, Recorer) {
        if (Recorer.folio == folio) {
            estruc = "Codigo: <b>" + Recorer.folio + "</b><br>" +
                "Fecha: <b>" + Recorer.fecha + "</b><br>" +
                "Nacionalidad: <b>" + Recorer.nacionalidad + "</b><br>" +
                "Nombres: <b>" + Recorer.cliente.nombres + " "+ Recorer.cliente.apellidos + "</b><br>" +
                "Nombre Categoría: <b>" + Recorer.nombreCategoria + "</b><br>" +
                "Nombre Producto: <b>" + Recorer.nombreProducto + "</b><br>" +
                "Cantidad: <b>" + Recorer.cantidad + "</b><br>" +
                "Precio: <b>" + Recorer.precio + "</b><br>" +
                "Medio Pago: <b>" + Recorer.medioPago + "</b><br>" +
                "Divisa Seleccionada: <b>" + Recorer.divisa + "</b><br>" +
                "Valor Divisa Seleccionada: <b>" + Recorer.valorDivisa + "</b><br>" +
                "SubTotal: <b>" + Recorer.subTotal + "</b><br>" +
                "Descuento: <b>" + Recorer.descuento + "</b><br>" +
                "Monto Total Pago: <b>" + Recorer.Total + "</b>";
        }
    })
    Swal.fire({
        title: "Detalle",
        html: estruc,
        icon: "info"
    });
}


$(document).ready(function () {
    CargarArreglos();
    cargarComboBox();

    $('.form_venta').submit(function (e) {

        var folio = datos.length + 1;
        var nombres = $('#txt_nombres').val();
        var apellidos = $('#txt_apellidos').val();
        var nombreNacionalidad = $('.Combo_nacionalidad option:selected').text();
        var nombreCategoria = $('.Combo_categoria option:selected').text();
        var nombreProducto = $('.Combo_producto option:selected').text();
        var precio = $('#txt_precio').val();
        var cantidad = $('#txt_cantidad').val();
        var medioPago= $('input[name="medioPago"]:checked').data('tipo');
        var divisa= $('input[name="tipoDivisa"]:checked').val();

        //Condicionar una varible
        var valorDivisa ;
        
        if ( divisa == "dolar"){
           valorDivisa = $('#lbl_dolar').text();
        }
        if (divisa == "euro"){
            valorDivisa = $('#lbl_euro').text();
        };

        var subTotal= $('#lbl_subtotal').text();
        var descuento= $('.lbl_Descuento').text();
        var Total = $('.lbl_Total').text();
        var fechaFull = new Date();
        var fechahoy = fechaFull.getDate() + "/" + fechaFull.getMonth() + 1 + "/" + fechaFull.getFullYear();


        //Guardar los datos que luego mostrara
        datos.push({
            "folio": folio,
            "fecha": fechahoy,
            "nacionalidad": nombreNacionalidad,
            "cliente": {
                "nombres": nombres,
                "apellidos": apellidos,
            },
            "nombreCategoria": nombreCategoria,
            "nombreProducto": nombreProducto,
            "cantidad": cantidad,
            "precio": precio,
            "medioPago": medioPago,
            "divisa": divisa,
            "valorDivisa": valorDivisa,
            "subTotal": subTotal,
            "descuento": descuento,
            "Total": Total
        })

        CargarTabla();
        return false;
    })

    function CargarTabla() {
        $('.cargarDatosTabla').empty();
        $.each(datos, function (i, lista) {

            var estruc = "<tr>" +
                "<td>" + lista.folio + "</td>" +
                "<td>" + lista.fecha + "</td>" +
                "<td>" + lista.nacionalidad + "</td>" +
                "<td>" + lista.cliente.nombres + " " + lista.cliente.apellidos + "</td>" +
                "<td>" + lista.Total + "</td>" +
                "<td>ED</td>" +
                "<td>EL</td>" +
                '<td onclick="VerMasDatos(' + lista.folio + ')" >VM</td>' +
                "</tr>";
            $('.cargarDatosTabla').append(estruc);
        })

    }

    //Mostrar el valor de dolar y euro
    $('input[type="radio"][name="tipoDivisa"]').change(function () {
        tipoDivisa = $(this).val();
        $.getJSON("https://mindicador.cl/api/" + tipoDivisa, function (data) {
            valorDivisa = data['serie'][0].valor;

            if (tipoDivisa == "dolar") {
                $('#lbl_dolar').text(valorDivisa)
            }
            else {
                $('#lbl_euro').text(valorDivisa)
            }
        })
    })



    function CargarArreglos() {

        nacionalidad.push({
            "codNacionalidad": 1,
            "nombreNacionalidad": "chile"
        }),
            nacionalidad.push({
                "codNacionalidad": 2,
                "nombreNacionalidad": "argentina"
            }),
            nacionalidad.push({
                "codNacionalidad": 3,
                "nombreNacionalidad": "peru"
            }),
            nacionalidad.push({
                "codNacionalidad": 4,
                "nombreNacionalidad": "colombiana"
            }),
            nacionalidad.push({
                "codNacionalidad": 5,
                "nombreNacionalidad": "brasil"
            }),

            categorias.push({
                "codigoCategoria": "Li001",
                "nombreCategoría": "Licores y Bebidas"
            }),
            categorias.push({
                "codigoCategoria": "Ta001",
                "nombreCategoría": "Tabaco y Accesorios"
            }),
            categorias.push({
                "codigoCategoria": "Al001",
                "nombreCategoría": "Alimentos y Dulces"
            })
        productos.push({
            "codigoProducto": "W001",
            "codigoCategoria": "Li001",
            "nombreProducto": "Whisky Jack Daniels",
            "precio": "14990"
        })
        productos.push({
            "codigoProducto": "P001",
            "codigoCategoria": "Li001",
            "nombreProducto": "Pisco Republicano",
            "precio": "7990"
        })
        productos.push({
            "codigoProducto": "Ca001",
            "codigoCategoria": "Ta001",
            "nombreProducto": "Cigarros Camel",
            "precio": "2990"
        })
        productos.push({
            "codigoProducto": "Zi001",
            "codigoCategoria": "Ta001",
            "nombreProducto": "Encendedores Zippo",
            "precio": "1990"
        })
        productos.push({
            "codigoProducto": "Cho001",
            "codigoCategoria": "Al001",
            "nombreProducto": "Chocolate Mixto",
            "precio": "2990"
        })

        productos.push({
            "codigoProducto": "Alf001",
            "codigoCategoria": "Al001",
            "nombreProducto": "Alfajores",
            "precio": "1990"
        })



    }

    function cargarComboBox() {
        $('.Combo_nacionalidad').empty().append('<option>(Selecciona Registro)</option>')
        $('.Combo_categoria').empty().append('<option>(Selecciona Registro)</option>')
        $.each(nacionalidad, function (i, listaNacionalidad) {
            $('.Combo_nacionalidad').append("<option value='" + listaNacionalidad.codNacionalidad + "'>" + listaNacionalidad.nombreNacionalidad + "</option>")
        });
        $.each(categorias, function (i, listaCategorias) {
            $('.Combo_categoria').append("<option value='" + listaCategorias.codigoCategoria + "'>" + listaCategorias.nombreCategoría + "</option>")
        });

        $('.Combo_categoria').change(function () {
            var valorCategoria = $(this).val();
            $('.Combo_producto').empty().append('<option>(Selecciona Registro)</option>')
            $.each(productos, function (i, listaProducto) {
                if (listaProducto.codigoCategoria == valorCategoria) {

                    $('.Combo_producto').append("<option value='" + listaProducto.codigoProducto + "'>" + listaProducto.nombreProducto + "</option>")
                }
            })
        })

        $('.Combo_producto').change(function () {
            var valorProducto = $(this).val();

            $.each(productos, function (i, listaProducto) {
                if (listaProducto.codigoProducto == valorProducto) {

                    $('#txt_precio').val(listaProducto.precio)

                    $('input[type="text"][name="txtCantidad"]').change(function () {
                        var valorCantidad = $(this).val();
                        var valorSubTotal = (valorCantidad * listaProducto.precio);
                        $('#lbl_subtotal').text(valorSubTotal)

                        $('input[type="radio"][name="medioPago"]').change(function () {
                            var valorMediopago = $(this).val();
                            var valorDescuento = (valorSubTotal * valorMediopago);
                            var valorTotal = (valorSubTotal - valorDescuento)
                            $('.lbl_Descuento').text(valorDescuento)

                            $('.lbl_Total').text(valorTotal)

                        })
                    })
                }
            })
        })
    }
})