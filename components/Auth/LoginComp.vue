<template>
    <div class="login">   
        <form @submit.prevent="validate" class="row g-3">
			<div class="col-md-12">
				<label class="form-label">{{ $t('Email') }}</label>
				<input 
					type="text"
					:class="['form-control', {'is-invalid': emailError, 'is-valid': !emailError && submit}]" 
					v-model="email" 
					required
				>
				<div class="invalid-feedback" v-if="errors[0]">{{ errors[0].message }}</div>
			</div>
			<div class="col-md-12">
				<label class="form-label">{{ $t('Password') }}</label>
				<input 
					type="password" 
					:class="['form-control', {'is-invalid': passwordError, 'is-valid': !passwordError && submit}]" 
					v-model="password" 
					required
				>
				<div class="invalid-feedback" v-if="errors[1]">{{ errors[1].message }}</div>
			</div>
			<div class="col-md-12">
				<i class="text-danger">* {{ $t('FalseInfo') }}</i>
				<div class="info">{{ info }}</div>
			</div>
			<div class="col-md-12">
				<button type="submit" class="btn btn-danger submit">{{ $t('Submit')}}</button>
			</div>
        </form>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const nuxtApp = useNuxtApp()
const { t } = useI18n()

const	email = ref(''),
		password = ref(''),
		emailError = ref(false),
		passwordError = ref(false),
		errors = ref([]),
		info = ref(''),
		submit = ref(false)

const validate = () => {
	errors.value = []

	//1. email validate
	if ( email.value.length < 10 || email.value.search('@') == -1 ) {
		emailError.value = true
		errors.value.push({
			'message': t('ErrorInvalidatEmail')
		})
	} else {
		emailError.value = false
		errors.value.push({'message': ''})
	}

	//2. password validate
	var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
	if ( password.value.length < 8 || password.value.match(regex) == null ) {
		passwordError.value = true
		errors.value.push({
			'field': 'password',
			'message': t('ErrorInvalidatPassword')
		})
	} else {
		passwordError.value = false
		errors.value.push({'message': ''})
	}

	//3. submit btn been clicked
	submit.value = true 

	//4. Only trigger when validation success
	if ( !emailError.value && !passwordError.value ) {
		submitForm()
	}
}

const submitForm = async () => {
	try {
		const response = await nuxtApp.Login({
			email: email.value,
			password: password.value
		})

		info.value = t(response)
	} catch (error) {
		console.log('Error: ' + error)
	}
}
</script>

<style scoped lang="scss">
.login {
	min-width: 300px
}
</style>