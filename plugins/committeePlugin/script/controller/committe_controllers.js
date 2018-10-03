function renderCommitRequestList()
{
    $("#committee_requests_list-out").html('Загрузка...');
    CommitteRequestApi.getCommitteeRequestList(0, callback);

    function callback(err, res)
    {
        if (!err)
        {
            var committeeReqList = res;

            var table = '<table>';
            table += '<tr>';
            table += '<th>ID</th>';
            table += '<th>Описание</th>';
            table += '<th>Число проголосовавших</th>';
            table += '</tr>';
            for (let i in committeeReqList.list)
            {
                /**
                 * @type CommitteeRequest
                 */
                let committeeRequest = committeeReqList.list[i];

                table += '<tr>';
                table += '<td>' + committeeRequest.request_id + '</td>';

                table += '<td>' + committeeRequest.creator + '<br>';
                table += committeeRequest.worker + '<br>';
                table += '<a href="' + committeeRequest.url + '">Описание</a>' + '</td>';

                table += '<td>' + committeeRequest.votes_count + '</td>';
                table += '</tr>';

            }

            table += '</table>';

            console.log(table);

            $("#committee_requests_list-out").html(table);
        } else
        {
            alert(err);
        }
    }
}


function renderCommitteeRequestById()
{
    var id = Number.parseInt($('#get_committee_request_id').val());

    CommitteRequestApi.getCommitteeRequest(id, 0, callback);

    function callback(err, res)
    {
        if (!err)
        {
            var committeeRequest = res;

            var table = '<table>';

            table += '<tr>';
            table += '<th>ID</th>';
            table += '<th>Описание</th>';
            table += '<th>Число проголосовавших</th>';
            table += '</tr>';

            table += '<tr>';
            table += '<td>' + committeeRequest.request_id + '</td>';

            table += '<td>' + committeeRequest.creator + '<br>';
            table += committeeRequest.worker + '<br>';
            table += '<a href="' + committeeRequest.url + '">Описание</a>' + '</td>';

            table += '<td>' + committeeRequest.votes_count + '</td>';
            table += '</tr>';

            table += '</table>';

            $('#get_committee_request-out').html(table);

        } else
        {
            alert(err);
        }
    }
}

function renderCommitteeVoteRequest()
{
    var wif, voter, request_id, vote_percent;
    voter = $('#committee_vote_request-login').val().trim();
    wif = $('#committee_vote_request-wif').val();
    request_id = Number.parseInt($('#committee_vote_request-id').val());
    vote_percent = Number.parseInt($('#committee_vote_request-percent').val()) * 100;

    $('#committee_vote_request-out').html('Подождите ...');

    CommitteRequestApi.voteRequest(wif, voter, request_id, vote_percent, callback);

    function callback(err, res)
    {
        if (!err)
        {
            console.log(res);
            $('#committee_vote_request-out').html('Вы проголосовали за ID ' + request_id
                    + ' с силой в ' + vote_percent / 100 + '%');
        } else
        {
            console.log(err);
        }
    }
}

function renderLinkGenerator()
{
    var id = Number.parseInt($('#committee_create_link-id').val());
    $('#committee_create_link-out').html(window.location.hostname + '/plugins/committeePlugin/auto_vote.html?id='+id);
}

function renderCommitteeWorkerCreateRequest()
{
    var wif = $('#committee_create_wif').val();
    var creator = $('#committee_create_creator').val();
    var url = $('#committee_create_url').val();
    var worker = $('#committee_create_worker').val();
    var reward_amount_min =
            new VizToken($('#committee_create_reward_min').val()).toString();
    var reward_amount_max =
            new VizToken($('#committee_create_reward_max').val()).toString();
    var duration =
            Number.parseFloat($('#committee_create_duration').val()) * 60 * 60 * 24;

    console.log(wif + '\n' + creator + '\n' + worker + '\n' + url + '\n'
            + reward_amount_min + '\n' + reward_amount_max + '\n' + duration);

    $('#committee_create-out').html('Подождите...');
    CommitteRequestApi.workerCreateRequest(wif, creator, url, worker,
            reward_amount_min, reward_amount_max, duration, callback);

    function callback(err, res)
    {
        if (!err)
        {
            console.log(res);
            $('#committee_create-out').html('Запрос создан');
        } else
        {
            alert(err);
        }
    }
}

function renderWorkerCancelRequest()
{
    var wif = $('#committee_cancle_wif').val();
    var creator = $('#committee_cancle_creator').val().trim();
    var request_id = Number.parseInt($('#committee_cancle_id').val());

    $('#committee_cancle-out').html('Подождите ...');
    CommitteRequestApi.workerCancelRequest(wif, creator, request_id, callback)

    function callback(err, res)
    {
        if (!err)
        {
            console.log(res);
            $('#committee_cancle-out').html('Запрос с ID ' + request_id + ' отменен');
        } else
        {
            alert(err);
        }
    }
}

function CommitteRequestApi()
{
}

CommitteRequestApi.getCommitteeRequestList = function (status, callback)
{
    viz.api.getCommitteeRequestsList(status, function (err, res)
    {
        var committeReqList = new CommitteeRequestList();
        var len = res.length;

        for (let index in res)
        {
            CommitteRequestApi.getCommitteeRequest(res[index], 0, function (err, res)
            {
                if (!err)
                {
                    committeReqList.list.push(res);
                    console.log('!err');
                }

                if (index == len - 1)
                {
                    if (err)
                    {
                        callback(err, null);
                    } else
                    {
                        callback(err, committeReqList);
                    }
                }
            });
        }
    });
};

CommitteRequestApi.getCommitteeRequest = function (request_id, votes_limit, callback)
{
    viz.api.getCommitteeRequest(request_id, votes_limit, function (err, res)
    {
        if (err)
        {
            callback(err, null);
        } else
        {
            callback(err, new CommitteeRequest(res));
        }

    });
};

CommitteRequestApi.voteRequest = function (wif, voter, request_id, vote_percent, callback)
{
    viz.broadcast.committeeVoteRequest(wif, voter, request_id, vote_percent, callback);
};

CommitteRequestApi.workerCreateRequest = function (wif, creator, url, worker, reward_amount_min, reward_amount_max, duration, callback)
{
    viz.broadcast.committeeWorkerCreateRequest(wif, creator, url, worker, reward_amount_min, reward_amount_max, duration, callback);
};

CommitteRequestApi.workerCancelRequest = function (wif, creator, request_id, callback)
{
    viz.broadcast.committeeWorkerCancelRequest(wif, creator, request_id, callback);
};