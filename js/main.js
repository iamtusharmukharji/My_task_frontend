const url = "http://192.168.18.129:5000";



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

  
//function to call login api
async function login(){
  var username = document.getElementById("usernameBox").value;
  var pwd = document.getElementById("passwordBox").value;
  
  let payload = {"email":username, "password":pwd};
  console.log(payload);

  const response = await fetch(url+"/user/login/",{
    method:"POST",
    headers:{Accept: "application.json","Content-Type": "application/json"},
    body:JSON.stringify(payload),
    cache:"default"
  });

  var data = await response.json();
  console.log(data);
  console.log(response.status);
  const jwt_token = data.token;
  localStorage.setItem("token", jwt_token);
  //window.location.href="task-home.html";
}


//fucntion to call signup api
async function signup(){
  var email = document.getElementById("emailBox").value;
  var name = document.getElementById("nameBox").value;
  var password = document.getElementById("passBox").value;
  var check = document.getElementById("cnfPassBox").value;
  var alert = document.getElementById("alert");
  var button = document.getElementById("create-acc-button");
  var loader = document.getElementById("loader");

  button.style.display = "none";
  loader.style.display = "block";

  if (password!=check){
    loader.style.display = "none";
    button.style.display = "block";
  alert.innerHTML = "Password not matched!";
  console.log("password not matched");
  return;
  }
  
  let payload = {"email":email, "name":name, "password":password};

  const resp = await fetch(url+"/user/signup/",
  {
    method:"POST",
    headers:{Accept: "application.json", "Content-Type": "application/json"},
    body:JSON.stringify(payload),
    cache:"default"
  });
  if (resp.status == 400){
    alert.innerHTML = "User already exists";
    console.log("password not matched");
    
    loader.style.display = "none";
    button.style.display = "block";
    return;
  }
  var data = await resp.json();
  console.log(data);
  showModal("form-modal",0);
  button.style.display = "block";
  loader.style.display = "none";
  
}

//function for closing and opening any modal div

function showModal(id,flag){
  var modal = document.getElementById(id)
  document.getElementById("emailBox").value = '';  
  document.getElementById("nameBox").value = '';
  document.getElementById("passBox").value = '';
  document.getElementById("cnfPassBox").value = '';
  document.getElementById("alert").innerHTML = '';
  if (flag == 1){
    modal.style.display = "block";
  }
  else{
    modal.style.display = "none";
  }
}