$(document).ready(function() {
    console.log('testing the form for ajax...');

    // take the corresponding values of the fields
    
    
    
    $('#submitBtn').on('click', function() {
        var $name = $('#name').val();
        var $description = $('#description').val();
        var $technologies = $('#technologies').val();
        var $concepts = $('#concepts').val();
        // create an object first
        var data = {
            name : $name,
            description : $description,
            technologies : $technologies,
            concepts : $concepts
        }

        console.log(data);

        //ajax call to the url
        $.ajax({
            type: "POST",
            url: '/home/data',
            data: data,
            success: function(){
                console.log('data send successfully');
            },
            error : function(error){
                console.log('failed');
                console.log(error);
            }
          });

    });

    //on button submit send the data via ajax 
});