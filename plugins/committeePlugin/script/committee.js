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

function createCommitteRequest()
{

    var wif = $('#committee_create_wif').val();
    var creator = $('#committee_create_creator').val();
    var url = $('#committee_create_url').val();
    var worker = $('#committee_create_worker').val();
    var reward_amount_min =
            Number.parseFloat($('#committee_create_reward_min').val()) + ' VIZ';
    var reward_amount_max =
            Number.parseFloat($('#committee_create_reward_max').val()) + ' VIZ';
    var duration =
            Number.parseFloat($('#committee_create_duration').val()) * 60 * 60 * 24;

    console.log(wif, creator, url, worker,
            reward_amount_min, reward_amount_max, duration);

    broadcast.committeeWorkerCreateRequest(wif, creator, url, worker,
            reward_amount_min, reward_amount_max, duration, callback);

    function callback(err, result)
    {
        
        console.log(err, result, result.length);
        if (!err)
        {
            $('#committee_create-out').html('Создан');
        } else
        {
            alert(err);
        }

    }
}