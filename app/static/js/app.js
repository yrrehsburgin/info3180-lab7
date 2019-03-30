/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/upload">Upload</router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});

const Home = Vue.component('home', {
   template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
   `,
    data: function() {
       return {}
    }
});

const uploadForm = Vue.component('upload-form',{
    template: ` 
    <div class="upload">
        <h2>Upload Form</h2>
        
        <div v-if='messageFlag' >
        
            <div v-if="!errorFlag ">
                <div class="alert alert-success" >
                    <p>File Upload Successful</p>                
                </div>
            </div>
            
            
            <div v-else >
                <ul class="alert alert-danger">
                    <li v-for="error in errorss">
                        {{ error[0] }}<br>
                    </li>
                    <li v-for="error in errorss">
                        {{ error[1] }}
                    </li>
                </ul>
            </div>
            
        </div>
        
        <div class="form-inline d-flex justify-content">
            <form id="uploadForm"  @submit.prevent="uploadPhoto" method="POST" enctype="multipart/form-data">
                <div>
                <div for="msg">Description </div>
                <textarea class="form-control" rows="2"  cols="95" id="msg" name="description"></textarea><br></br>
                <div for="pic">Photo Upload </div>
                
                <input type="file" name="photo" id="upload"/> </br>
                </div></br>
                <button class="btn btn-success" type="submit">Submit</button>
            </form>
        </div>
    </div>
    `,
    methods: {
    uploadPhoto: function(){
        
        let self = this;
        let uploadForm = document.getElementById('uploadForm');
        let form_data = new FormData(uploadForm);
        
        fetch("/api/upload", {
            method: 'POST',
            body: form_data,
            headers: {
                'X-CSRFToken': token
            },
            credentials: 'same-origin'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonResponse) {
            // display a success message
             self.messageFlag = true;

                if (jsonResponse.hasOwnProperty("errors")){
                    self.errorFlag=true;
                    self.errorss = jsonResponse.errors;
                }
                else if(jsonResponse.hasOwnProperty("message")){
                    self.errorFlag = false;
                    self.response = jsonResponse.message;
                    
                }
        })
        .catch(function (error) {
            console.log(error);
        });
    },
       onFileSelected: function(){
            let self = this;
            let filenameArr = $("#photo")[0].value.split("\\");
            self.filename = filenameArr[filenameArr.length-1];
        }
    },
    data: function(){
        return {
            errorFlag: false,
            messageFlag: false,
            errorss: [],
            response:[],
            filename: ""
        };
    }
});



const NotFound = Vue.component('not-found', {
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data: function () {
        return {}
    }
})

// Define Routes
const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: "/", component: Home},
        // Put other routes here
        { path: "/upload", component: uploadForm },
        // This is a catch all route in case none of the above matches
        {path: "*", component: NotFound}
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});