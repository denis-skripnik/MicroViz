function showImport(id)
{
    var link = $("#" + id);
    var content = link[0].import.body;
    console.log(content);
    document.body.appendChild(content);
};