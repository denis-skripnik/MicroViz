function Asset(ammount)
{
    var val = ammount;
    val = Number.parseFloat(val);

    this.getAmmount = function ()
    {
        return val;
    };

    this.getSymbol = function ()
    {
        return '';
    };

    this.setAmmount = function (ammount)
    {
        val = ammount;
    };
}

Asset.prototype.toString = function ()
{
    var ammount = this.getAmmount();

    if (Number.isInteger(ammount))
        ammount += '.000';

    return ammount + ' ' + this.getSymbol();
};

function VizToken(ammount)
{
    Asset.call(this,ammount);
    this.getSymbol = function ()
    {
        return 'VIZ';
    };
}

VizToken.prototype = new Asset();

delete VizToken.prototype.getAmmount()
delete VizToken.prototype.setAmmount()
delete VizToken.prototype.getSymbol()

VizToken.constructor = VizToken;

function SharesToken(ammount)
{
    Asset.call(this,ammount);
    this.getSymbol = function ()
    {
        return 'SHARES';
    };
}

SharesToken.prototype = new Asset();

delete SharesToken.prototype.getAmmount()
delete SharesToken.prototype.setAmmount()
delete SharesToken.prototype.getSymbol()

SharesToken.constructor = SharesToken;