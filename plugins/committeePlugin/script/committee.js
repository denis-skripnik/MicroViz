(function ()
{
    window.api = viz.api;
    window.broadcast = viz.broadcast;
})();

function renderCommitteeRequestsList()
{
    api.getCommitteeRequestsList(0, callback);

    function callback(err, result)
    {
        $('#committee_requests_list-list').html('');
        if (!err)
        {

            if (result.length == 0)
            {
                $('#committee_requests_list-list').append('Заявок нет <br>');
                console.log('$(#committee_requests_list-listt).append(Заявок нет <br>);');
            } else
            {
                let table = '<table>';
                for (let req in result)
                {
                    console.log('for ' + result[req]);
                    getCommitteeRequest(result[req], -1, callback);

                    function callback(err, res)
                    {
                        if (!err)
                        {
                            table += '<tr>';
                            table += '<th>ID</th>'
                            table += '<th>Создатель</th>';
                            table += '<th>Воркер</th>';
                            table += '<th>Цена, VIZ</th>';
                            table += '<th>Ссылка на проект</th>';
                            table += '<th>Число проголосовавших</th>';
                            table += '</tr>';
                            table += '<tr>';
                            table += '<td>' + res.request_id + '</td>';
                            table += '<td>' + res.creator + '</td>';
                            table += '<td>' + res.worker + '</td>'
                            table += '<td>' + parseMoney(res.required_amount_min) + ' - ';
                            table += parseMoney(res.required_amount_max) + '</td>';
                            table += '<td>' + '<a href="' + res.url + '">'
                                    + res.url + '</a><br>' + '</td>';
                            table += '<td>' + res.votes_count + '</td>';
                            table += '</tr>';

                            if (result.length == (req + 1))
                            {
                                table += '</table>';
                                $('#committee_requests_list-list').html(table);
                            }


                            console.log(err, res, "dd");
                        } else
                        {
                            alert(err);
                        }
                    }
                }
            }
        } else
        {
            alert(err);
        }

    }
}

function renderCreateCommitteRequest()
{

    var wif = $('#committee_create_wif').val();
    var creator = $('#committee_create_creator').val();
    var url = $('#committee_create_url').val();
    var worker = $('#committee_create_worker').val();
    var reward_amount_min =
            getVizMoneyFormat($('#committee_create_reward_min').val());
    var reward_amount_max =
            getVizMoneyFormat($('#committee_create_reward_max').val());
    var duration =
            Number.parseFloat($('#committee_create_duration').val()) * 60 * 60 * 24;

    console.log(wif, creator, url, worker,
            reward_amount_min, reward_amount_max, duration);

    broadcast.committeeWorkerCreateRequest(wif, creator, url, worker,
            reward_amount_min, reward_amount_max, duration, callback);

    function callback(err, result)
    {

        console.log(err, result);
        if (!err)
        {
            $('#committee_create-out').html('Создан');
        } else
        {
            alert(err);
        }

    }
}

function renderCommitteeRequestById()
{
    var id = Number.parseInt($("#get_committee_request_id").val());

    getCommitteeRequest(id, -1, callback);

    function callback(err, res)
    {
        if (!err)
        {
            let table = '<table>';
            
            table += '<tr>';
            table += '<th>ID</th>'
            table += '<th>Создатель</th>';
            table += '<th>Воркер</th>';
            table += '<th>Цена, VIZ</th>';
            table += '<th>Ссылка на проект</th>';
            table += '<th>Число проголосовавших</th>';
            table += '</tr>';
            table += '<tr>';
            table += '<td>' + res.request_id + '</td>';
            table += '<td>' + res.creator + '</td>';
            table += '<td>' + res.worker + '</td>';
            table += '<td>' + parseMoney(res.required_amount_min) + ' - ';
            table += parseMoney(res.required_amount_max) + '</td>';
            table += '<td>' + '<a href="' + res.url + '">'
                    + res.url + '</a><br>' + '</td>';
            table += '<td>' + res.votes_count + '</td>';
            table += '</tr>';

            table += '</table>';
            $('#get_committee_request-out').html(table);


            console.log(err, res, "dd");
        } else
        {
            alert(err);
        }
    }
}

function getCommitteeRequest(request_id, votes_limit, callback)
{
    api.getCommitteeRequest(request_id, votes_limit, callback);
}

function parseMoney(str)
{
    var num = Number.parseFloat(str);
    num *= 1000;
    num = Number.parseInt(num);
    num /= 1000;
    return num;
}

function getVizMoneyFormat(str)
{
    var res = parseMoney(str);
    if (Number.isInteger(res))
    {
        res += '.000';
    }
    return res + ' VIZ';
}