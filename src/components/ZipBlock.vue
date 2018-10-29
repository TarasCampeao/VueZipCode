<template>
	<div class="container">
		<h1>Zip Code test</h1>
		<div class="form_zone">
			<div class="input_cell">
				<input type="text" name="zip" placeholder="Enter zip code" class="form_field" v-model="zipCode">
			</div>
			<button class="btn form_btn" @click="addCity">Add location</button>
			<div class="form_error">{{error}}</div>
		</div>
		<div class="city_zone">
			<h3>Cities list!</h3>
			<p v-if="!cities.length">No results. Please, try fill form!</p>
			<ul v-if="cities.length" class="result_list">
				<li class="city_item" 
					v-for="(city, index) in cities" 
					:key="city.id"
					:class="{active: city.selected}"
					@click="checkCode(city)">
					<div>{{ city.city }}, {{ city.state }}</div>
			        <button class="delete_btn" @click="removeUser(city, index)">
			        	<i class="far fa-trash-alt"></i>
			        </button>
				</li>
			</ul>
		</div>
	</div>
</template>


<script>

export default {
	name: 'ZipBlock',
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
	              this.error = 'Sorry, but city is already in your list!';
	              this.zipCode = '';
	          } else {
	              this.error = 'Sorry, but there is no city with such a zip-code!';
	              this.zipCode = ''; 
	          }     
	      });
	    },
	    removeUser(city, index) {
	    	this.cities.splice(index, 1);
	    },
	    checkCode (city) {
	      this.cities.forEach( (item) => {
	        item.selected = false;
	      })
	      city.selected = true;     
	      this.$http.get(`${this.requestURL}/FindZipCodesInRadius/ByLatLon?latitude=${city.lat}&longitude=${city.long}&minimumradius=0&maximumradius=1&key=${this.API_KEY}`)
	        .then ( (response) => {
	          this.zipCode = response.body.DataList[0].Code;
	      })
	    }
  	}
}

</script>