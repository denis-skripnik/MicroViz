String.prototype.replaceAll = function (search, replacement)
{
    var target = this;
    return target.split(search).join(replacement);
};

function load()
{
    console.log(window.location);

    let res = getJsonFromSearch();
    let out = '';

    for (let key in res)
    {
        out += key + ' на ' + res[key] + '<br>';
    }

    $('#desc').html(getDescFromSearch());
    $('#out').html(out);
}

function getJsonFromSearch()
{
    console.log(window.location);

    var search = window.location.search.split(/[?&]/g);
    var value;

    for (let i in search)
    {
        if (search[i].search('val=') > -1)
        {
            console.log(search[i]);
            value = search[i].split('=')[1];
            break;
        }
    }

    if (typeof value !== undefined)
    {
        let bits = sjcl.codec.base32.toBits(value);
        let json = sjcl.codec.utf8String.fromBits(bits);

        let res = JSON.parse(json);
        return res;
    }

    throw new Error();
}

function getDescFromSearch()
{
    console.log(window.location);

    var search = window.location.search.split(/[?&]/g);
    var value;

    for (let i in search)
    {
        if (search[i].search('desc=') > -1)
        {
            console.log(search[i]);
            value = search[i].split('=')[1];
            break;
        }
    }

    if (typeof value !== undefined)
    {
        let bits = sjcl.codec.base32.toBits(value);
        let res = sjcl.codec.utf8String.fromBits(bits);

        return res;
    }

    throw new Error();
}

function send()
{
    var props;

    var accountName = $('#login').val();
    var wif = $('#wif').val();
    
    $('#out').html();
    $('#head').html('Подождите, пожалуйста...');


    viz.api.getWitnessByAccount(accountName, function (err, result)
    {
        console.log(err, result);

        if (!err)
        {
            props = result.props;

            let json = getJsonFromSearch();

            for (let i in json)
            {
                props[i] = json[i];

            }
            console.log(props);
            
            
            viz.broadcast.chainPropertiesUpdate(wif, accountName, props, function (err, result)
            {
                console.log(err, result);
                
                if (!err)
                {
                     $('#head').html('Параметры обновлены. Спасибо за ваш вклад в равзвитие VIZ!');
                } else {
                    alert('Ошибка: ' + err);
                }
            });
        } else
        {
            alert('Не удалось найти делегата. Ошибка: ' + err);
            console.log(err);
        }
    });
}

function gen()
{
    let jsonBits = sjcl.codec.utf8String.toBits($('#tarea').val());
    let str = sjcl.codec.base32.fromBits(jsonBits).replaceAll('=', '');
    
    let jsonBitsDesc = sjcl.codec.utf8String.toBits($('#tarea_desc').val());
    let strDesc = sjcl.codec.base32.fromBits(jsonBitsDesc).replaceAll('=', '');

    $('#out').html(window.location.hostname + '/MicroViz/plugins/witnesses/auto_witnesses.html?val=' + str + '&desc='+strDesc);
}