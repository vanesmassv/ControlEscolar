import LoginService from '../services/loginService.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const { token, user } = await LoginService.autenticarUsuario({ email, password });
    
    // ✅ Estructura de respuesta
    res.json({
      ok: true,
      data: {
        token,
        user: {
          id: String(user.id),
          email: user.email,
          nombre: user.nombre,
          rol: user.rol  
        }
      }
    });
  } catch (error) {
    next(error);
  }
};