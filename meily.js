 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDknIaARLJ0_Bvd0AeX2kgBRuOlTEfswNc",
    authDomain: "chat-c2c6d.firebaseapp.com",
    databaseURL: "https://chat-c2c6d.firebaseio.com",
    projectId: "chat-c2c6d",
    storageBucket: "",
    messagingSenderId: "940091870279"
  };

  firebase.initializeApp(config);
  const username = prompt('dame su nombre')
 const database = firebase.database();


 $('button').click(function(event){
    event.preventDefault();
    var mensaje= $("#mensaje").val() ;


    var data={usuario:username,mensaje:mensaje};
    database.ref("chat/").push(data,function(err){
        if (err){throw err;}
        else{
            console.info('guardamos la informacion');
            ponerMensaje(data);
            $('#mensaje').val("")
        }
    });

 });

 function ponerMensaje(pepito){
    $('#caja').append("<p>"+pepito.usuario+":"+pepito.mensaje+"<p>");
 }
function interar(data){
    for(var chiguiro in data){
        if (data.hasOwnProperty(chiguiro)){
            var element = data[chiguiro];
            var gato = {
                usuario:element.usuario,
                mensaje:element.mensaje
            };
            ponerMensaje(gato);
        }
    }
}

 var traerMensaje = new Promise(function(res,rej){
    var mensaje = database.ref('/chat/').once('value').then(function(snapshot){
        return res(snapshot.val() );
    });
    if (!mensaje){return rej();}
 });

 traerMensaje.then(function(data){
    interar(data);
 });