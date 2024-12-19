export async function register(email, password) {
    
    const response = await fetch(' https://se-register-api.en.tripleten-services.com/v1/signup',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    if(!response.ok)throw new Error("Este usuario ya existe");
    const data = await response.json();
    localStorage.setItem('jwt', data.token);
    return data;

} 

export async function login(email, password) {

    const response = await fetch(' https://se-register-api.en.tripleten-services.com/v1/signin',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    if(!response.ok)throw new Error("usuario no encontrado");
    const data = await response.json();
    
    localStorage.setItem('jwt', data.token);

    return data;

}

export async function checkToken(token) {
    const response = await fetch('https://se-register-api.en.tripleten-services.com/v1/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log("este e sel checktoken de auth",response);
    if(!response.ok)throw new Error("token no válido");
    const data = await response.json();
    return data;
  
  }