<template>
    <div class="container">
        <div class="col-sm-6 offset-sm-3">
            <div id="varifyemail" class="alert alert-warning text-center" role="alert">
                <b v-if="info">{{ info }}</b>
                <b v-else>{{ $t('VarifyEmail') }}</b>
            </div>
        </div>
    </div>
</template>

<script setup>
const nuxtApp = useNuxtApp()
const query = useRoute().query
const { t } = useI18n()
const info = false

if ( query.token ) {
    try {
		const response = await nuxtApp.VarifyEmail({
			token: query.token
		})

		info.value = t(response)
	} catch (error) {
		console.log('Error: ' + error)
	}
} 
</script>

<style scoped>
#varifyemail {
    margin: 250px 0;
}
</style>