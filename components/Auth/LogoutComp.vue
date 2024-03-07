<template>
    <div class="logout" @click="logout">   
        {{ $t('Logout') }}
    </div>
</template>

<script>

export default {	
	methods: {
		logout() {
			this.$store.dispatch('logout')
		}
	}
}
</script>