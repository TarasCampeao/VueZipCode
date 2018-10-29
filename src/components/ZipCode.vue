<template>
	<div class="container">
		<h1>Zip Code test</h1>
		<form>
			<div class="input_cell">
				<input type="text" placeholder="Enter zip code" class="form_field" v-model="zip">
			</div>
			<button class="btn form_btn">Add location</button>
		</form>
	</div>
</template>



<script>
	

export default {
	name: 'ZipCode',
	data() {
		return {

		}
	}
}

</script>