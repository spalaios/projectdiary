
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
                // console.log(response.token);
                // if(response.url ) {
                //     var hostname = window.location.hostname;
                //     window.location.assign(response.url);
                // }
                const tokener = response.token;
                console.log(tokener);

                $.ajax({
                    type: "POST",
                    url: '/welcome', //A string containing the URL to which the request is sent.
                    //A plain object or string that is sent to the server with the request.
                    data: {
                        token : response.token
                    },
                
                    //The type of data expected from the server. Default: Intelligent Guess (xml, json, script, text, html).
                    dataType: 'json',
                
                    success: function(response,status,xhr) {
                        //show content
                        console.log('Success!' + response+', Status: '+status+', xhr: '+xhr)
                
                            if(response.redirect) {
                                window.location = response.redirectURL;
                            }

                           
                
                    },
                    error: function(jqXHR, textStatus, err) {
                        console.log(jqXHR);
                        //show error message
                        console.log('text status '+textStatus+', err '+err)
                    }
                });
            },
            error : function(error){
                console.log(error.responseText);
                alert('Something went wrong try again');
                window.location.reload();
            }
          });
    });
});