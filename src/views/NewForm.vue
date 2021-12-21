<template>
    <div class="form row">
            <div class="col-sm-6 col-md-4 col-lg-4">
                <form id="new-prod" @submit.prevent="insertProduct" @reset="botonReset">
                    <fieldset>
                        <legend>{{this.estado()}}</legend><br> 
                        <label for="newprod-id">Id del producto: </label>
                            <input type="text" class="form-control" id="newprod-id" disabled required min="1" step="1" v-model="newProduct.id"><br><br>
                        <div class="form-group">
                            <label for="newprod-name">Nombre: </label>
                            <input type="text" class="form-control" id="newprod-name" v-model="newProduct.name"><br>
                        </div>
                        <br>
                        <div class="form-group">
                            <label for="newprod-price">Precio: </label>
                            <input type="number" class="form-control" id="newprod-price" v-model.number="newProduct.price"><br>
                        </div>
                        <br>
                        <div class="form-group">
                            <label for="newprod-units">Units: </label>
                            <input type="number" class="form-control" id="newprod-units" v-model.number="newProduct.units"><br>
                        </div>
                        <br>
                        <button type="submit" class="btn btn-default btn-primary">Añadir</button><button type="reset" class="btn btn-secondary">Reset</button>

                        <br><br>
                        
                        <!-- Aquí los inputs y botones del form -->
                    </fieldset>
                </form>
            </div>
    </div>
</template>

<script>
import API from '../services/API'

export default {
    name: 'newForm',
    data(){
        return{
            newProduct:{
                
            },
            edit: false
        }
    },
    methods:{
    insertProduct(){
        if (this.edit) {
            try {
                API.products.modify(this.newProduct)
                this.$router.push('/products')
            } catch (error) {
                console.error(error)
            }
        } else {
            if (this.newProduct.name === "") {
                alert('Dele un nombre al producto')
            } else if (this.newProduct.price <= 0) {
                alert('El precio debe ser mayor de 0')
            } else if (this.newProduct.units <= 0) {
                alert('Las unidades deben ser mayores a 0')
            } else {
                API.products.create(this.newProduct)
                this.$router.push('/products')
            }
        } 
    },
    estado(){
        if(this.edit){
            return 'Editar Producto'
        }else{
            return 'Nuevo Producto'
        }
    },
    async botonReset(){
        if(this.edit){
            let response = await API.products.getOne(this.$route.params.id)
            this.newProduct = response.data
        }
    }
    },
    async mounted(){
        if (this.$route.params.id) {
            this.edit = true
            let response = await API.products.getOne(this.$route.params.id)
            this.newProduct = response.data
        }
    }
}
</script>