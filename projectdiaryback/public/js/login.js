$(document).ready(function() {
    $('#signup_btn').on('click', function(){
        // get the field values 
        $username = $('#username').val();
        $password = $('#password').val();

        var data = {

            username : $username, 
            password : $password,
        }

        console.log(data);

         //ajax call to the url
         $.ajax({
            type: "POST",
            url: '/login/data',
            data: data,
            success: function(response){
                console.log(response);
                console.log(response.token);
                if(response.message == 'success' ) {
                    var hostname = window.location.hostname;
                    window.location.assign('/welcome?auth='+response.token);
                }
            },
            error : function(error){
                console.log(error.responseText);
                alert('Something went wrong try again');
                window.location.reload();
            }
          });
    });
});