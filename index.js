export default function (context) {
  
    context.app.component('LoginComp', require('./components/Auth/LoginComp.vue').default);
    context.app.component('LogoutComp', require('./components/Auth/LogoutComp.vue').default);
    context.app.component('SignupComp', require('./components/Auth/SignupComp.vue').default);
  
    context.app.router.addRoutes([
      { path: '/Login', component: require('./pages/Login.vue').default },
      { path: '/Signup', component: require('./pages/Signup.vue').default },
      { path: '/VerifyEmail', component: require('./pages/VerifyEmail.vue').default },
    ]);
}