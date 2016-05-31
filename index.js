var express = require('express'),
  request = require('request'),
  moment = require('moment'),
  util = require('util'),
  app = express();

if (!process.env.MIXPANEL_SECRET) {
  console.log('No app secret defined. Please define the "MIXPANEL_EVENT" environment variable!');
  return;
}
var basicHeader = ' Basic ' + new Buffer(process.env.MIXPANEL_SECRET).toString('base64')
var baseUrl = "https://mixpanel.com/api/2.0";


function segmentation() {


  request({
      url: baseUrl + '/segmentation' + queryString,
      headers: {'Authorization': basicHeader}
    }, function (error, response, body) {
      //console.log(error, body);
      var test = JSON.parse(body)
      console.log(test.data.values["View venue card"]);
      var venue_card = test.data.values["View venue card"];
      var total_venues = 0;
      for (x in venue_card) {
        console.log(venue_card[x]);
        total_venues += parseInt(venue_card[x]);
      }

      console.log(test.data.values);
      console.log("my total venues " + total_venues);

      if (!error && response.statusCode == 200) {
        return res.status(200).json(body);
      } else {
        return res.status(400).json(error);
      }
    }
  )

}

function requestF(url, queryString) {
  request({
      url: baseUrl + url + '?' + queryString,
      headers: {'Authorization': basicHeader}
    }, function (error, response, body) {


      console.log(body);


    }
  )
}

function segmentation(venue_id) {


  var today = moment().subtract(2, "days");
  var fromDate = moment().subtract(6, "days");
  var queryString = venue_id;


  queryString += '/&event=' + 'View venue card';
  queryString += '&from_date=' + fromDate.format('YYYY-MM-DD');
  queryString += '&to_date=' + today.format('YYYY-MM-DD');
  queryString += '&interval=1'; //number of days bucketed
  var url = '/segmentation';


  requestF(url, queryString);


}

function segmentationNumeric(venue_id) {


  var today = moment().subtract(2, "days");
  var fromDate = moment().subtract(6, "days");
  var queryString = venue_id;


  queryString += '/&event=' + 'View venue card';
  queryString += '&from_date=' + fromDate.format('YYYY-MM-DD');
  queryString += '&to_date=' + today.format('YYYY-MM-DD');
  queryString += '&on=number(properties["Duration"])'; //on querry
  queryString += '&where number(properties["Duration"]) and number(1)'; //on querry

  queryString += '&interval=1'; //number of days bucketed
  var url = '/segmentation/numeric/';


  requestF(url, queryString);


}

//
function properties_value() {
  var url = '/events/properties/values';
  var queryString = 'name="Duration"';
  queryString += '&interval=10'; //number of days bucketed
  queryString += '&type=general'; //number of days bucketed
  queryString += '&event="View venue card"'; //number of days bucketed
  queryString += '&unit=day'; //number of days bucketed

  requestF(url, queryString);


}

properties_value()
var venue_id = "560d7cb889fd3f841cb862e2";
segmentation(venue_id)
segmentationNumeric(venue_id)

//
//function numeric(property, event, interval, unit) {
//  var queryString = 'segementation/numeric?';
//  queryString += '&event=' + event;
//  //var today = moment().subtract(2, "days");
//  //var fromDate= moment().subtract(6, "days");
//  //queryString += '&interval='+interval; //number of days bucketed
//  //queryString += '&type=general'; //number of days bucketed
//  //queryString += '&event='+event; //number of days bucketed
//  //queryString += '&unit='+unit; //number of days bucketed
//
//
//}






app.listen(3000, function () {
  console.log("The app is running");
});


//querry with name check Doc.

//queryString2 += 'name=' + 'Duration';
//queryString2 += '&interval=10'; //number of days bucketed
//queryString2 += '&type=general'; //number of days bucketed
//queryString2 += '&event=View venue card'; //number of days bucketed
//queryString2 += '&unit=day'; //number of days bucketed


//queryString2+='name="Country"';
////queryString2+='&interval=10';
////queryString2+='&type=general';
//queryString2+='&event="View venue card"';


//queryString2 += '&from_date=' +  fromDate.format('YYYY-MM-DD');
//queryString2 += '&to_date=' + today.format('YYYY-MM-DD');

//queryString2 += '&bucket=10'; //number of days bucketed


//queryString2 += '&on=number(properties["Duration"])'; //on querry
//queryString2 += '&where="'+venue+'"== properties["place_id"] and number(properties["Duration"]) '; //number of days bucketed
//queryString2 += '&buckets=5'; //number of days bucketed

//queryString2 += '&where=number(properties["Duration"]) '; //on querry