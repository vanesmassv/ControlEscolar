import  loginService  from '../services/loginService.js'
import AppError from '../errors/AppError.js';

export const Login = async(req, res) => {
    try{
        //declaracion de campos a utilizar
        const { email, password } = req.body;
        const { token, usuario } = await loginService.autenticarUsuario({email,password});
        return res.status(200).json({ ok: true, data: { token, usuario } });
    }catch(error){
        if (error instanceof AppError) return res.status(error.status).json({ error: error.message });
        return res.status(400).json({ error: error.message });
    }
}

export default Login;