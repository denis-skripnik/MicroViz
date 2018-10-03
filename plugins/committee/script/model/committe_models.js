/**
 * 
 * @param {Object} {
 * request_id:int,
 * url:string,
 * duration:int,
 * creator:string,
 * worker:string;
 * required_amount_max:VizToken,
 * required_amount_min:VizToken,
 * end_time:string(YYYY-MM-DDThh-mm-ss),
 * start_time:string(YYYY-MM-DDThh-mm-ss),
 * this.status:int,
 * this.votes_count:int,
 * this.conclusion_time:string(YYYY-MM-DDThh-mm-ss),
 * this.conclusion_payout_amount:VizToken,
 * this.payout_amount:VizToken,
 * this.remain_payout_amount:VizToken,
 * last_payout_time:string(YYYY-MM-DDThh-mm-ss),
 *  payout_time:string(YYYY-MM-DDThh-mm-ss),
 *  votes:array{CommitteeVoteState};
 *  }
 * @returns {CommitteeRequest}
 */
function CommitteeRequest(obj)
{
    this.request_id = obj.request_id;
    this.duration = obj.duration;
    this.url = obj.url;
    this.creator = obj.creator;
    this.worker = obj.worker;
    this.required_amount_max = new VizToken(Number.parseFloat(obj.required_amount_max));
    this.required_amount_min = new VizToken(Number.parseFloat(obj.required_amount_min));
    this.end_time = obj.end_time;
    this.start_time = obj.start_time;
    this.status = obj.status;
    this.votes_count = obj.votes_count;
    this.conclusion_time = obj.conclusion_time;
    this.conclusion_payout_amount = new VizToken(Number.parseFloat(obj.conclusion_payout_amount));
    this.payout_amount = new VizToken(Number.parseFloat(obj.payout_amount));
    this.remain_payout_amount = new VizToken(Number.parseFloat(obj.remain_payout_amount));
    this.last_payout_time = obj.last_payout_time;
    this.payout_time = obj.payout_time;
    
    this.votes = [];
    
    for (let i in obj.votes)
    {
        let committeeVoteState = new CommitteeVoteState(obj.votes[i]);
        this.votes.push(committeeVoteState);
    }
}

CommitteeRequest.prototype.getDurationDays = function ()
{
    return this.duration / 60 / 60 / 24;
};
CommitteeRequest.prototype.setDurationDays = function (days)
{
    this.duration = days * 24 * 60 * 60;
};

function CommitteeVoteState(obj)
{
    this.voter = obj.voter;
    this.vote_percent = obj.vote_percent;
    this.last_update = obj.last_update;
}

function CommitteeRequestList()
{
    this.list = [];
}

CommitteeRequestList.prototype.sortById = function ()
{
    this.list.sort(function (a, b)
    {
        return a.request_id - b.request_id;
    });
};