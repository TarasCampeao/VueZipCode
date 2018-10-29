<template>
	<div class="container">
		<h1>Zip Code test</h1>
		<div class="form_zone">
			<div class="input_cell">
				<input type="text" placeholder="Enter zip code" class="form_field" v-model="zipCode">
			</div>
			<button class="btn form_btn" @click="addCity">Add location</button>
			<div class="form_error">{{error}}</div> 
		</div>
		<div class="city_zone">
			<h3>Cities list!</h3>
			<p v-if="!cities.length">No result. Please, try fill form!</p>
			<ul v-if="cities.length" class="result_list">
				<li class="city_item" v-for="city in cities" :key="city.id">{{ city.city }}</li>
			</ul>
		</div>
	</div>
</template>



<script>

export default {
	name: 'ZipCode',
	data() {
		return {
      		zipCode: '',
      		API_KEY: 'P7CMHOSQTWQEJQJB8OTC',
      		requestURL: 'https://api.zip-codes.com/ZipCodesAPI.svc/1.0',
      		cities: [],
      		sameCity: false,
      		error: '', 
		}
	},
    methods: {
	    addCity () { 
	      this.$http.get(`${this.requestURL}/QuickGetZipCodeDetails/${this.zipCode}?key=${this.API_KEY}`)
	        .then( (response) => {  
	          this.cities.forEach( (item) => {
	            if (item.city === response.body.City) {
	              this.sameCity = true
	            } else {
	              this.sameCity = false
	            }
	          })
	          if (!response.body.hasOwnProperty('Error') && response.body.hasOwnProperty('City') && !this.sameCity) {
	            this.cities.push( {city: response.body.City,
	                              state: response.body.State,
	                              lat: response.body.Latitude,
	                              long: response.body.Longitude,
	                              selected: false} );
	            this.error = '';
	            this.zipCode = '';
	          } else if ( response.body.hasOwnProperty('Error') ) {
	              this.error = 'Sorry, but ' + response.body.Error;
	              this.zipCode = '';
	          } else if ( response.body.hasOwnProperty('City') ) {
	              this.error = 'Sorry, but city is already in your list';
	              this.zipCode = '';
	          } else {
	              this.error = 'Sorry, but there is no city with such a zip-code';
	              this.zipCode = ''; 
	          }        
	      })
	    },
  	}
}

</script>