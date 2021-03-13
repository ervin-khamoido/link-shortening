import { useState } from "react"

export const  AuthPage = () => {
   const [form, setForm] = useState({
      email: '',
      password: ''
   });

   const changeHandler = event => {
      setForm({
         ...form, 
         [event.target.name]: event.target.value
      });
   };

   return (
      <div className="row">
         <div className="col s6 offset-s3">
            <h1>Shorten the link</h1>

            <div className="card blue-grey darken-1">
            <div className="card-content white-text">
               <span className="card-title">Authorization</span>

               <div>
                  <div className="input-field">
                     <input 
                        placeholder="Enter email"
                        id="email"
                        type="text"
                        class="validate"
                        name="email"
                        onChange={changeHandler}
                     />
                     <label htmlFor="email">Email</label>
                  </div>

                  <div className="input-field">
                     <input 
                        placeholder="Enter password"
                        id="password"
                        type="text"
                        class="validate"
                        name="password"
                        onChange={changeHandler}
                     />
                     <label htmlFor="password">Password</label>
                  </div>
               </div>
            </div>
            <div className="card-action">
               <button className="auth-page-btn btn yellow darken-4">LogIn</button>
               <button className="auth-page-btn btn grey lighten-1 black-text">SignUp</button>
            </div>
            </div>
         </div>
      </div>
   )
}