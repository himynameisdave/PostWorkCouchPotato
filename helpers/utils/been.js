/**
 *    Used for checking mins since a given time
 *    usage: been(5).mins.since(some_datetime)
 *
 *    since {Number} - the number of mins you want to check out
 **/
const been = since => ({
    mins: {
        since: time => Date.now() - time > (since * 60 * 1000)
    }
});

module.exports = been;
