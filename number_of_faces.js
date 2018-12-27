/**
 * App Description  : Getting Number of Face from Images
 * App Version      : 1.0
 * App Language     : Node.js
 * Project          : https://github.com/incubation-hub/....
 * Author name      : Bayram Hakan Kocatepe 
 * Author github    : https://github.com/xhkocatepe
 */

/*jslint node: true */
'use strict';

const
    fs = require('fs'),
    request = require('request');

/**
 * dataPath: Resimlerin bululunduğu klasör.
 */
let oHeaders = {
        url: 'https://mlftrial-face-detector.cfapps.eu10.hana.ondemand.com/api/v2alpha1/image/face-detection',
        dataPath: './images/',
        token: 'Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vczAwMTg4OTI0ODR0cmlhbC5hdXRoZW50aWNhdGlvbi5ldTEwLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJrZXktaWQtMSIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyOTkwZGU4YTg1N2Y0ODM4OGNhN2Y3NjYzMTAzNWM3YiIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJ6ZG4iOiJzMDAxODg5MjQ4NHRyaWFsIiwic2VydmljZWluc3RhbmNlaWQiOiJlYjEwYzA4MC05NTk3LTQ0NDItYjk5NC1kMzliYjZhNDA0MTEifSwic3ViIjoic2ItZWIxMGMwODAtOTU5Ny00NDQyLWI5OTQtZDM5YmI2YTQwNDExIWI4OTM0fGZvdW5kYXRpb24tc3RkLW1sZnRyaWFsIWIzNDEwIiwiYXV0aG9yaXRpZXMiOlsiZm91bmRhdGlvbi1zdGQtbWxmdHJpYWwhYjM0MTAubW9kZWxyZXBvLnJlYWQiLCJ1YWEucmVzb3VyY2UiLCJmb3VuZGF0aW9uLXN0ZC1tbGZ0cmlhbCFiMzQxMC5yZXRyYWluc2VydmljZS53cml0ZSIsImZvdW5kYXRpb24tc3RkLW1sZnRyaWFsIWIzNDEwLmZ1bmN0aW9uYWxzZXJ2aWNlLmFsbCIsImZvdW5kYXRpb24tc3RkLW1sZnRyaWFsIWIzNDEwLnJldHJhaW5zZXJ2aWNlLnJlYWQiLCJmb3VuZGF0aW9uLXN0ZC1tbGZ0cmlhbCFiMzQxMC5tb2RlbHNlcnZpY2UucmVhZCIsImZvdW5kYXRpb24tc3RkLW1sZnRyaWFsIWIzNDEwLm1vZGVsbWV0ZXJpbmcucmVhZCIsImZvdW5kYXRpb24tc3RkLW1sZnRyaWFsIWIzNDEwLmRhdGFtYW5hZ2VtZW50LndyaXRlIiwiZm91bmRhdGlvbi1zdGQtbWxmdHJpYWwhYjM0MTAubW9kZWxyZXBvLndyaXRlIiwiZm91bmRhdGlvbi1zdGQtbWxmdHJpYWwhYjM0MTAuZGF0YW1hbmFnZW1lbnQucmVhZCIsImZvdW5kYXRpb24tc3RkLW1sZnRyaWFsIWIzNDEwLm1vZGVsZGVwbG95bWVudC5hbGwiLCJmb3VuZGF0aW9uLXN0ZC1tbGZ0cmlhbCFiMzQxMC5zdG9yYWdlYXBpLmFsbCJdLCJzY29wZSI6WyJmb3VuZGF0aW9uLXN0ZC1tbGZ0cmlhbCFiMzQxMC5tb2RlbHJlcG8ucmVhZCIsInVhYS5yZXNvdXJjZSIsImZvdW5kYXRpb24tc3RkLW1sZnRyaWFsIWIzNDEwLnJldHJhaW5zZXJ2aWNlLndyaXRlIiwiZm91bmRhdGlvbi1zdGQtbWxmdHJpYWwhYjM0MTAuZnVuY3Rpb25hbHNlcnZpY2UuYWxsIiwiZm91bmRhdGlvbi1zdGQtbWxmdHJpYWwhYjM0MTAucmV0cmFpbnNlcnZpY2UucmVhZCIsImZvdW5kYXRpb24tc3RkLW1sZnRyaWFsIWIzNDEwLm1vZGVsc2VydmljZS5yZWFkIiwiZm91bmRhdGlvbi1zdGQtbWxmdHJpYWwhYjM0MTAubW9kZWxtZXRlcmluZy5yZWFkIiwiZm91bmRhdGlvbi1zdGQtbWxmdHJpYWwhYjM0MTAuZGF0YW1hbmFnZW1lbnQud3JpdGUiLCJmb3VuZGF0aW9uLXN0ZC1tbGZ0cmlhbCFiMzQxMC5tb2RlbHJlcG8ud3JpdGUiLCJmb3VuZGF0aW9uLXN0ZC1tbGZ0cmlhbCFiMzQxMC5kYXRhbWFuYWdlbWVudC5yZWFkIiwiZm91bmRhdGlvbi1zdGQtbWxmdHJpYWwhYjM0MTAubW9kZWxkZXBsb3ltZW50LmFsbCIsImZvdW5kYXRpb24tc3RkLW1sZnRyaWFsIWIzNDEwLnN0b3JhZ2VhcGkuYWxsIl0sImNsaWVudF9pZCI6InNiLWViMTBjMDgwLTk1OTctNDQ0Mi1iOTk0LWQzOWJiNmE0MDQxMSFiODkzNHxmb3VuZGF0aW9uLXN0ZC1tbGZ0cmlhbCFiMzQxMCIsImNpZCI6InNiLWViMTBjMDgwLTk1OTctNDQ0Mi1iOTk0LWQzOWJiNmE0MDQxMSFiODkzNHxmb3VuZGF0aW9uLXN0ZC1tbGZ0cmlhbCFiMzQxMCIsImF6cCI6InNiLWViMTBjMDgwLTk1OTctNDQ0Mi1iOTk0LWQzOWJiNmE0MDQxMSFiODkzNHxmb3VuZGF0aW9uLXN0ZC1tbGZ0cmlhbCFiMzQxMCIsImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJyZXZfc2lnIjoiY2FjODY3MmQiLCJpYXQiOjE1NDQyODk2MjUsImV4cCI6MTU0NDMzMjgyNSwiaXNzIjoiaHR0cDovL3MwMDE4ODkyNDg0dHJpYWwubG9jYWxob3N0OjgwODAvdWFhL29hdXRoL3Rva2VuIiwiemlkIjoiZGRiNTNiNTMtZTVhYS00NTYzLWI0MDktZDlkMTM3MGE1ZDhmIiwiYXVkIjpbInVhYSIsImZvdW5kYXRpb24tc3RkLW1sZnRyaWFsIWIzNDEwLnJldHJhaW5zZXJ2aWNlIiwiZm91bmRhdGlvbi1zdGQtbWxmdHJpYWwhYjM0MTAubW9kZWxyZXBvIiwiZm91bmRhdGlvbi1zdGQtbWxmdHJpYWwhYjM0MTAubW9kZWxkZXBsb3ltZW50IiwiZm91bmRhdGlvbi1zdGQtbWxmdHJpYWwhYjM0MTAuZnVuY3Rpb25hbHNlcnZpY2UiLCJmb3VuZGF0aW9uLXN0ZC1tbGZ0cmlhbCFiMzQxMC5kYXRhbWFuYWdlbWVudCIsImZvdW5kYXRpb24tc3RkLW1sZnRyaWFsIWIzNDEwLnN0b3JhZ2VhcGkiLCJzYi1lYjEwYzA4MC05NTk3LTQ0NDItYjk5NC1kMzliYjZhNDA0MTEhYjg5MzR8Zm91bmRhdGlvbi1zdGQtbWxmdHJpYWwhYjM0MTAiLCJmb3VuZGF0aW9uLXN0ZC1tbGZ0cmlhbCFiMzQxMC5tb2RlbHNlcnZpY2UiLCJmb3VuZGF0aW9uLXN0ZC1tbGZ0cmlhbCFiMzQxMC5tb2RlbG1ldGVyaW5nIl19.kCNXCqStkNOP9J9Xfs7e2gep1POVohhGY4eQDEUaT-n60E7KxiAISje9xQ0tw9TIi9byELKIhSJ9So-srJJVJ448FZGVnVl55d5wUpVBrKr9Exv0eiecfNs6PExdzOAGlogoYrqnuyXPiz-XCVY_oXCWNe6xwa35QYMk_gOF5o1t-dPE8L6QdC46QIH7bWJXnIpLLr-3HHfzUlVvKeJkuNFrqVylimxkTFebybbrtR4StZjwfHMWyfvkxq14yAck8WtCGk9Y8VER4bP0U88zadMNrdKO7vTZPV6AWcEUkktQVtGQMpecde1qnMMgeSExem5FWVA2gYY8zuWUCtlrlN5DxX92z-GkVI40kAy2c4VfeYvCZWE2Gga58s8m-UhEeVYsotM_NIUiiWr4E61Z7-SK7y1zf7rtyv9dqT_TSV-FBwzNnoeWhDVyiJdnjz4qFVRGZvCJBkVE7atX1fXoZ_3LIdeSrmdGF4W2r96tBhdwqgaa1hDbv5l-0boths3PWZ1WWRiEPVSQUPcnJRO_qnuVja-WRW8JHYESUP4QxzlHtiDd5YwjkD3fvj_E6HRgfhdI_HDorZP-DxO18EE52Lrux2IvH3M72NsbgrIe_m8OIw38bZs0Y8_KdjgkoDJD6rgJnWjraaSXsCZLRMHOu4uNrDqnTq-JxzwUHRv833M',
        tenantName: 's0018892484trial',
        contentType: 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        accept: 'application/json'
    },
    index = 0;

function postNext(files) {
    if (files[index] !== undefined && files[index] === '.DS_Store')
        index++;

    if (files[index] !== undefined) {
        var options = {
            method: 'POST',
            url: oHeaders.url,
            headers:
            {
                authorization: oHeaders.token,
                tenantname: oHeaders.tenantName,
                accept: oHeaders.accept,
                'content-type': oHeaders.contentType
            },
            formData:
            {
                files:
                {
                    value: fs.createReadStream(oHeaders.dataPath + files[index]),
                    options:
                    {
                        filename: files[index],
                        contentType: null
                    }
                }
            }
        };
        /**
         * SAP ML Foundation 'Inference Service for Face Detection' servisi kirli dataları temizlemek için kullanılıyor.
         */
        request(options, function (error, response, body) {
            if (error) console.log(error);
            var aPredictions = JSON.parse(body).predictions;
            /*
            * Eğer ilgili resimde birden fazla yada az resim varsa onu klasörden sil. 
            */
            if (aPredictions && aPredictions[0] && aPredictions[0].numberOfFaces && aPredictions[0].numberOfFaces !== 1) {
                fs.unlink(oHeaders.dataPath + files[index], (err) => {
                    if (err) throw err;
                    console.log('successfully deleted' + oHeaders.dataPath + files[index-1]);
                });
                console.log(aPredictions[0].name, "numberofFaces:", aPredictions[0].numberOfFaces);
            }else{
                if(aPredictions && aPredictions[0].numberOfFaces){
                    console.log(files[index], "numberofFaces:", aPredictions[0].numberOfFaces );
                }else{
                    if(JSON.parse(body).error && JSON.parse(body).error.message)
                    console.log(files[index], "numberofFaces:", "NO" ,JSON.parse(body).error.message);
                    fs.unlink(oHeaders.dataPath + files[index], (err) => {
                        if (err) throw err;
                        console.log('successfully deleted' + oHeaders.dataPath + files[index-1]);
                    });
                }
            }
            
            index++;
            postNext(files);
        });
    }
}

fs.readdir(oHeaders.dataPath, (err, files) => {
    postNext(files);
});