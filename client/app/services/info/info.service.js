'use strict';

angular.module('elbitApp')
  .factory('info', function ($http,$q) {
    // Service data



    'use strict';

// crossfilter service


      var exports = {};
      var cf;
      // crossfilter object: browser side analytics library, holds array type data (w/incremental updates).
      // dimensions are fast queries on data, e.g. view sorted by followers_count or retweet_count of the original message

    exports.severity = function (){
      var deferred=$q.defer();
      $http.get('/api/infos').then(response => {
        cf = crossfilter(response.data);
        var severityDim = cf.dimension(function(d) { return d.severity; });
        var severityGroup = severityDim.group().reduceCount(function(d) {return d.severity;});
        var dateDim = cf.dimension(function(d) { return d.createdAt });
        //var dateDim = cf.dimension(function(d) {return d.updatedAt;});
        //print_filter(dateDim);
        //print_filter("severityDim");
        deferred.resolve({dimension:severityDim, group:severityGroup, x:dateDim});


        function print_filter(filter){
          var f=eval(filter);
          if (typeof(f.length) != "undefined") {}else{}
          if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
          if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
          console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
        }

      });
      return deferred.promise;
    }




    // freeze imposes filter on crossfilter that only shows anything older than and including the latest
      // tweet at the time of calling freeze. Accordingly unfreeze clears the filter
      exports.freeze    = function() { tweetIdDim.filter([0, tweetIdDim.top(1)[0].id]); };
      exports.unfreeze  = function() { tweetIdDim.filterAll(); };

      exports.add       = function(data)     { cf.add(data); };                            // add new items, as array
      exports.clear     = function()         { cf.remove(); };                             // reset crossfilter
      exports.noItems   = function()         { return cf.size(); };                        // crossfilter size total
      exports.numPages  = function(pageSize) { return Math.ceil(cf.size() / pageSize); };  // number of pages

      // predicates
      var retweeted     = function(t) { return t.hasOwnProperty("retweeted_status"); };

      // mapper functions
      var originalTweet = function(t) { return utils.formatTweet(t.retweeted_status); };   // returns original tweet
      var tweetId       = function(t) { return t.id; };                                    // returns tweet id
      var retweetCount  = function(t) { if (retweeted(t)) { return t.retweeted_status.retweet_count; } else return 0 };
      var maxRetweets   = function(t) {
        t.retweet_count = retweetCount(_.max(originalIdDim.filter(t.id).top(1000),
          function(t){ return t.retweeted_status.retweet_count; }));
        originalIdDim.filterAll();
        return t;
      };

      // deliver tweets for current page. fetches all tweets up to the current page,
      // throws tweets for previous pages away.
      exports.tweetPage = function(currentPage, pageSize, order, live) {
        return _.rest(fetchTweets(currentPage * pageSize, order), (currentPage - 1) * pageSize);
      };

      // fetch tweets from crossfilter dimension associated with particular sort order up to the current page,
      // potentially mapped and filtered
      var fetchTweets = function(pageSize, order) {
        if      (order === "latest")    { return tweetIdDim.top(pageSize); }    // latest: desc order of tweets by ID
        else if (order === "followers") {
          return followersDim.top(pageSize).map(maxRetweets);
        }   // desc order of tweets by followers
        else if (order === "retweets") {  // descending order of tweets by total retweets of original message
          return _.first(               // filtered to be unique, would appear for each retweet in window otherwise
            _.uniq(retweetsDim.top(cf.size()).filter(retweeted).map(originalTweet), false, tweetId), pageSize);
        }
        else { return []; }
      };


    // list all
    exports.list = function () {
      var deferred=$q.defer();
      $http.get('/api/infos').then(response => {
        console.log(response);
        infos = response.data;
        deferred.resolve(infos);

      });
      return deferred.promise;

    };

      return exports;


    ///////////////
    var infos = [];
    //
    ////Service logic
    //
    //
    //
    //
    //// Public API
    //return {
    //  list: function () {
    //    var deferred=$q.defer();
    //    $http.get('/api/infos').then(response => {
    //      console.log(response);
    //      infos = response.data;
    //      deferred.resolve(infos);
    //
    //    });
    //    return deferred.promise;
    //
    //  }
    //};
  });
