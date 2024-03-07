<template>
    <div class="signup">   
        <form @submit.prevent="validate" class="row g-3">
            <div class="col-md-6">
                <label class="form-label">{{ $t('Firstname') }}</label>
                <input 
					type="text" 
					:class="['form-control', { 'is-invalid': firstnameError, 'is-valid': !firstnameError && submit }]"
					v-model="firstname" 
					required
				>
                <div class="invalid-feedback" v-if="errors[0]">{{ errors[0].message }}</div>
            </div>
            <div class="col-md-6">
                <label class="form-label">{{ $t('Lastname') }}</label>
                <input 
					type="text" 
					:class="['form-control', { 'is-invalid': lastnameError, 'is-valid': !lastnameError && submit }]"
					v-model="lastname"
					required
				>
                <div class="invalid-feedback" v-if="errors[1]">{{ errors[1].message }}</div>
            </div>
            <div class="col-md-12">
                <label class="form-label">{{ $t('Email') }}</label>
                <input 
					type="text"
					:class="['form-control', {'is-invalid': emailError, 'is-valid': !emailError && submit }]" 
					v-model="email"
					required
				>
                <div class="invalid-feedback" v-if="errors[2]">{{ errors[2].message }}</div>
            </div>
            <div class="col-md-12">
                <label class="form-label">{{ $t('Password') }}</label>
                <input
					type="password"
					:class="['form-control', { 'is-invalid': passwordError, 'is-valid': !passwordError && submit }]"
					v-model="password"
					required
				>
                <div class="invalid-feedback" v-if="errors[3]">{{ errors[3].message }}</div>
            </div>
            <div class="col-md-12">
                <label class="form-label">{{ $t('RePassword') }}</label>
                <input
					type="password"
					:class="['form-control', {'is-invalid': repasswordError, 'is-valid': !repasswordError && submit }]" 
					v-model="repassword"
					required
				>
                <div class="invalid-feedback" v-if="errors[4]">{{ errors[4].message }}</div>
            </div>
			<div class="col-md-12">
				<i class="text-danger">* {{ $t('FalseInfo') }}</i>
			</div>
            <div class="col-md-12">
				<button type="submit" class="btn btn-danger submit">{{ $t('Submit') }}</button>
			</div>
        </form>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const	firstname = ref(''),
		lastname = ref(''),
		email = ref(''),
		password = ref(''),
		repassword = ref(''),
		firstnameError = ref(''),
		lastnameError = ref(''),
		emailError = ref(false),
		passwordError = ref(false),
		repasswordError = ref(false),
		errors = ref([]),
		submit = ref(false)

const validate = () => {
	errors.value = []

	//1. firstname validate
	if ( firstname.value.length < 2 ) {
		firstnameError.value = true
		errors.value.push({
			'message': t('ErrorInvalidatFirstname')
		})
	} else {
		firstnameError.value = false
		errors.value.push({'message': ''})
	}

	//2. lastname validate
	if ( lastname.value.length < 2 ) {
		lastnameError.value = true
		errors.value.push({
			'message': t('ErrorInvalidatLastname')
		})
	} else {
		lastnameError.value = false
		errors.value.push({'message': ''})
	}

	//3. email validate
	if ( email.value.length < 10 || email.value.search('@') == -1 ) {
		emailError.value = true
		errors.value.push({
			'message': t('ErrorInvalidatEmail')
		})
	} else {
		emailError.value = false
		errors.value.push({'message': ''})
	}
	
	//4. password validate
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

	//5. repassword validate
	if ( repassword.value.length < 8 || repassword.value !== password.value ) {
		repasswordError.value = true
		if ( repassword.value.length < 8 ) {
			errors.value.push({
				'field': 'repassword',
				'message': t('ErrorInvalidatPassword')
			})
		} else {
			errors.value.push({
				'field': 'repassword',
				'message': t('ErrorInvalidatPasswordsMatch')
			})
		}
	} else {
		repasswordError.value = false
		errors.value.push({'message': ''})
	}

	//6. submit btn been clicked
	submit.value = true 

	//7. Only trigger when validation success
	if ( !firstnameError.value && !lastnameError.value && !emailError.value && !passwordError.value && !repasswordError.value ) {
		submitForm()
	}
}

const submitForm = async () => {
	try {
		const response = await nuxtApp.Signup({
			firstname: firstname.value,
			lastname: lastname.value,
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
.signup {
	min-width: 300px;
}
</style>