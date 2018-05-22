$(document).ready(function() {
    $('#signup_btn').on('click', function(){
        // get the field values 
        $username = $('#username').val();
        $email = $('#email').val();
        $password = $('#password').val();
        $contact = $('#contact').val();

        var data = {

            username : $username, 
            email : $email,
            password : $password,
            contact : $contact
        }

        console.log(data);

         //ajax call to the url
         $.ajax({
            type: "POST",
            url: '/signup/data',
            data: data,
            success: function(response){
                console.log(response);
            },
            error : function(error){
                console.log(error.responseText);
            }
          });
    })
})