<template>
<div class="container-fluid">
    <div class="row">
        <div class="col s12 l4"
            v-for="item in cards"
            v-bind:key="item.id">
            <div class="card text-white mb-3" v-bind:class="[item.color]">
                
                <div class="card-body">
                    <img v-bind:src="item.icon" width="80px" height="80px">
                    <div class="card-title">
                        {{item.title}}
                    </div>
                    <div class="card-text">
                        {{item.text}}
                    </div>
                    <router-link v-bind:to="item.url">
                        <button class="btn" v-bind:class="[item.color]">details</button>
                    </router-link>
                </div>          
            </div>
        </div>
    </div>
</div>

</template>

<script>
const cards = [
           { id: 1, title: 'Ocean and Environment', text: 'Plastic and renewable materials', color: 'bg-primary', url: '/esg', icon: 'https://cdn3.iconfinder.com/data/icons/business-ultimate-blue-series/64/blue-23-512.png'},
           { id: 2, title: 'Green Energy', text: 'Solar, Wind, Fosil and Gas free energy', color: 'bg-success', url: '/esg', icon: 'https://www.pngmart.com/files/7/Equity-PNG-Photos.png'},
           { id: 3, title: 'Stocks', color: 'bg-info',text: 'Governance and inclusive driven Stocks', url: '/esg', icon: 'https://www.flaticon.es/premium-icon/icons/svg/939/939804.svg'}

            ];
export default {
    name: 'dashboard',
    data() {
        return {
            cards
        }
    }
}
</script>

<style scoped>
.card-icon {
    text-align: right
}
</style>