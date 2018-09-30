(function ()
{
    window.api = viz.api;
    window.broadcast = viz.broadcast;
})();

function getCommitteeRequestsList()
{
    api.getCommitteeRequestsList(0, callback);

    function callback(err, result)
    {
        $('#committee_requests_list-list').html('');
        console.log(err, result, result.length);
        if (!err)
        {
            if (result.length == 0)
            {
                $('#committee_requests_list-list').append('Заявок нет <br>');
                console.log('$(#committee_requests_list-listt).append(Заявок нет <br>);');
            } else
            {
                for (let req in result)
                {
                    $('#committee_requests_list-list').append(req + '<br>');
                    console.log("$('#committee_requests_list-list').append(req + '<br>');");
                }
            }
        } else
        {
            alert(err);
        }

    }
}