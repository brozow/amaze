

function assert(b, msg) {
    if (!b) throw msg || "failed";
}

function assertEquals(expected, actual, msg) {
    assert(expected == actual, (msg ? msg+": " : "") + "Expected " + expected + " but was " + actual);
}

function runtests(tests, onFailure) {
    
    var results = { total: 0, failures: 0 };
    
    for(var i = 0; i < tests.length; i++) {
        var test = tests[i];
        try {
            results.total++;
            test();
        } catch (err) {
            results.failures++;
            onFailure(err);
        }
    
    }
    
    return results;
}

function findTests(obj) {
    var tests = [];
    for(var key in obj) {
        if (key.indexOf("test") === 0) {
            tests.push(obj[key]);
        }
    }
    return tests;
}

function appendFailure(msg) {
    var err = document.getElementById("test_errors");
    err.innerHTML += "<div>"+msg+"</div>"
}

window.onload = function() {
    var body = document.body;
    body.innerHTML += '<h1>Test Results</h1><div id="test_errors"></div><h2><span id="test_failures">unset</span> failed tests out of <span id="test_total">unset</span>.</h2>'

    var results = runtests(findTests(window), appendFailure);
    document.getElementById("test_failures").innerHTML = results.failures;
    document.getElementById("test_total").innerHTML = results.total;
    
}





