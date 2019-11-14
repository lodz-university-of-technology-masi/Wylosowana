
let Api_Url1 = 'https://df0dufpq3d.execute-api.us-east-1.amazonaws.com/bla/tests/';  // Lambdy z handlerow

function getTestFromDB() {
    console.log('im');

    $(document).ready(function () {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: Api_Url1 + '3',    // 3 jest hard coded, bedziemy pobierac value w zaleznosci od Id
            success: function(data,err){
                if(err)
                    console.log(err);
                console.log(data);
            }
        });
    })
}

function getAllTestsFromDB() {

    $(document).ready(function () {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: Api_Url1 + 'all',
            success: function(data,err){
                if(err)
                    console.log(err);
                console.log(data);
            }
        });
    })
}

function putTestToDB() {

    const id = document.getElementById('inputUsername').value;  // ...ByID zmienic wedle swoich idkow ;)
    const name = document.getElementById('inputPassword').value;
    const test = {"id": id,
                    "name": name};

    console.log(test);

    $(document).ready(function () {
        $.ajax({
            type: "POST",
            url: Api_Url1+id,
            data: JSON.stringify(test),
            dataType: "json",
            success: function(){
                console.log('dane wyslane');
            },
        });
    })
}