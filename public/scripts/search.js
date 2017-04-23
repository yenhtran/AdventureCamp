$('#adventure-search').on('input', function(data){
    var search = $(this).serialize();
    if (search === "search=") {
        search = "all"
    }
    $.get('/adventures?'+ search, function(data){
        $('#adventure-grid').html('');
        console.log('DATA: ', data);

        data.forEach(function(adventure){
            $('#adventure-grid').append(`<div class='col-md-3 col-sm-6'>
                <div class='thumbnail'>
                    <img src="${ adventure.image }">
                    <div class='caption'>
                        <h4>${ adventure.name }</h4>
                    </div>
                    <p>
                        <a href="/adventures/${ adventure._id }" class='btn btn-primary'>More Info</a>
                    </p>
                </div>
            </div>`);
        });
    });
});

$('#adventure-search').submit(function(event){
  event.preventDefault(); 
});
