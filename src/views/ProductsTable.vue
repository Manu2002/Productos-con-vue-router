<template>
     <div class="products hidable row">
             <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
            <div class="col-sm-12 col-md-12 col-lg-12" id="almacen">
                <table class="table table-striped table-hover">
                    <thead class="thead-dark bg-light">
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Uds.</th>
                            <th>Precio/u</th>
                            <th>Importe</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <product-row v-for="product in productos" :key="product.id" :product="product"> </product-row>
                        <!-- Aquí insertaremos los productos-->
                    </tbody>
                    <tfoot>
                        <th colspan="4">Importe total del almacén:</th>
                        <th id="total">{{getTotal().toFixed(2) + " €"}}</th>
                        <th></th>
                    </tfoot>
                </table>
            </div>
        </div>
</template>

<script>

import API from '../services/API'
import ProductRow from '../components/ProductRow.vue'

export default {
  components: { ProductRow },  
    data(){
        return{
            productos:[],
        }
    }, 
    methods:{
        getData(){
          API.products.getAll()
        .then(response => this.productos=response.data)
        .catch(response => {
            if (!response.status) {// Si el servidor no responde 'response' no es un objeto sino texto
            alert('Error: el servidor no responde');
            console.log(response);
            } else {
            alert('Error '+response.status+': '+response.message);          
            }
            this.products=[];
        })
        },
        getTotal(){
            var total = 0;
            this.productos.forEach(element => {
                let importe = element.price * element.units;
                total = total + importe
            });
            return total;
            }
    },
    mounted(){
        this.getData();
    },
}
</script>