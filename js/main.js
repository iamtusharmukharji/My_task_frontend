function showPassword() {
    var x = document.getElementById("passwordBox");
    if (x.type === "password") {
      x.type = "text";
      document.getElementById("togglePassword").className = "bi bi-eye";
    } else {
      x.type = "password";
      document.getElementById("togglePassword").className = "bi bi-eye-slash";
    }
  }

function login(){
  var username = document.getElementById("usernameBox").value;
  var pwd = document.getElementById("passwordBox").value;
  console.log(username);
  console.log(pwd)
  
  let payload = {"email":username, "password":pwd};
  console.log(payload);
  fetch("http://192.168.18.129:5000/user/login/",{
    method:"POST",
    headers:{Accept: "application.json","Content-Type": "application/json"},
    body:JSON.stringify(payload),
    cache:"default"
  }).then(res => {
    console.log("response:", res);
  });
  
  


}