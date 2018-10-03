function loadPage()
{
    $('#committee_vote_request-out').html('Вы проголосуете за ID: ' + getIdFromSearch());
}

function getIdFromSearch()
{
    console.log(window.location);

    var search = window.location.search.split(/[?&]/g);
    var value;

    for (let i in search)
    {
        if (search[i].search('id=') > -1)
        {
            console.log(search[i]);
            value = search[i].split('=')[1];
            break;
        }
    }

    if (typeof value !== undefined)
    {
//        let bits = sjcl.codec.base32.toBits(value);
//        let res = sjcl.codec.utf8String.fromBits(bits);
        var res = value;

        return res;
    }

    throw new Error();
}

function renderAutoCommitteeVoteRequest()
{
    var wif, voter, request_id, vote_percent;
    voter = $('#committee_vote_request-login').val().trim();
    wif = $('#committee_vote_request-wif').val();
    request_id = Number.parseInt(getIdFromSearch());
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
            alert(err);
            console.log(err);
        }
    }
}