<template>
    <tr>
        <td>{{product.id}}</td>
        <td>{{product.name}}</td>
        <td>{{product.units}}</td>
        <td>{{product.price}}</td>
        <td>{{(product.units*product.price).toFixed(2)}} €</td>
        <td>
            <button class="btn btn-secondary up" @click.prevent="upProduct">
                <span class="material-icons">arrow_drop_up</span>
            </button>
            <button class="btn btn-secondary down " @click.prevent="downProduct">
                <span class="material-icons">arrow_drop_down</span>
            </button>
            <button class="btn btn-secondary edit" @click.prevent="edit">
                <span class="material-icons">edit</span>
            </button>
            <button class="btn btn-secondary delete" @click.prevent="deleteProduct">
                <span class="material-icons">delete</span>
            </button>
        </td>
    </tr>
</template>

<script>
import API from '../services/API'

export default{
    name: 'appRow',
    props:['product'],
    methods: {
        deleteProduct(){
            API.products.delete(this.product.id)
        },
        upProduct(){
            let newProduct = {
                id: this.product.id,
                name: this.product.name,
                price: this.product.price,
                units: this.product.units + 1
            }
            API.products.modify(newProduct)
        },
        downProduct(){
            let unitsNew = this.product.units - 1
            if (unitsNew <= 0) {
                this.deleteProduct()
            }
            let newProduct = {
                id: this.product.id,
                name: this.product.name,
                price: this.product.price,
                units: unitsNew
            }
            API.products.modify(newProduct)
        },
        edit(){
            this.$router.push(
                { 
                    name: 'Edit', 
                    params: { id: this.product.id }
                
                })
        }
    }
}
</script>