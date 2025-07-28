export const urlBase = 'http://localhost:5000';  // 'http://192.168.1.10:5000';

  
export const fetchUsers = async () => {
    const response = await fetch('https://obligatorio2dda.onrender.com/usuario');
    return response.json();
  };
  