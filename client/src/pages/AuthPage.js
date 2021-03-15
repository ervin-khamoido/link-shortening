import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const  AuthPage = () => {
   const auth = useContext(AuthContext);
   const message = useMessage();
   const {loading, error, request, clearError} = useHttp();
   const [form, setForm] = useState({
      email: '',
      password: ''
   });

   useEffect(() => {
      message(error);
      clearError();
   }, [error, message, clearError]);

   useEffect(() => {
      window.M.updateTextFields();
   }, [])

   const changeHandler = event => {
      setForm({
         ...form, 
         [event.target.name]: event.target.value
      });
   };

   const registerHandler = async () => {
      try {
         const data = await request('/api/auth/register', 'POST', {...form});
         message(data.message);
      } catch (error) {}
   };

   const loginHandler = async () => {
      try {
         const data = await request('/api/auth/login', 'POST', {...form});
         auth.login(data.token, data.userId);
      } catch (error) {}
   };

   return (
      <div className="row">
         <div className="col s6 offset-s3">
            <h1>Shorten the link</h1>

            <div className="card blue-grey darken-1">
            <div className="card-content white-text">
               <span className="auth-title card-title">Authorization</span>

               <div>
                  <div className="input-field">
                     <input 
                        placeholder="Enter email"
                        id="email"
                        type="text"
                        className="validate"
                        name="email"
                        onChange={changeHandler}
                     />
                     <label htmlFor="email">Email</label>
                  </div>

                  <div className="input-field">
                     <input 
                        placeholder="Enter password"
                        id="password"
                        type="password"
                        className="validate"
                        name="password"
                        onChange={changeHandler}
                     />
                     <label htmlFor="password">Password</label>
                  </div>
               </div>
            </div>
            <div className="card-action">
               <button 
                  className="auth-page-btn btn yellow darken-4"
                  disabled={loading}
                  onClick={loginHandler}
               >
                  LogIn
               </button>

               <button 
                  className="auth-page-btn btn grey lighten-1 black-text"
                  onClick={registerHandler}
                  disabled={loading}
               >
                  SignUp
               </button>
            </div>
            </div>
         </div>
      </div>
   )
}