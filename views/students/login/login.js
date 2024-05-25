function togglePassword() {
  let password=document.getElementById('show');
  let checkbox=document.getElementById('showPasswordCheckbox');
  console.log("checked");
  console.dir(password);
  checkbox.addEventListener('change',()=>{
    if(checkbox.checked){
      password.type='text';
    }else{
      password.type='password';
    }
  })
}
togglePassword();