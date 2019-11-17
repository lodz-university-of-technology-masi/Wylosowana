import React, { Component } from 'react';
import $ from "jquery";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class ShowTests extends Component{
    constructor(props) {
        super(props)



        var fetchedTests = [];
        $.ajax({
            type: "GET",
            dataType: "json",
            url: 'https://jqt7k6tt7i.execute-api.us-east-1.amazonaws.com/demo/tests',
            //data: JSON.stringify(validateTest),
            success: function(data,err){
                if(err)
                    console.log(err);
                console.log(data);

                fetchedTests = data;
            }
        });

        fetchedTests = JSON.parse('{"Items":[{"id":1794778705298},{"langs":[{"lang":"EN","questions":[{"question":"How dare you? XDDD","no":1},{"question":"Biggest dissapointment in your life?","no":2}]}],"testName":"test z gateway","id":1855567598360,"candidate_ids":[]},{"langs":[{"lang":"EN","questions":[{"answers":["With aplomb","Oh, I dare","Easily","lmao"],"no":1,"question":"How dare you?","correct":"2, 3"},{"question":"Biggest dissapointment in your life?","no":2}]}],"testName":"nazwa","id":250335245602,"candidate_ids":[222222222222222,33333333333333,444444444444]},{"langs":[{"lang":"EN","questions":[{"question":"How dare you? XDDD","no":1},{"question":"Biggest dissapointment in your life?","no":2}]}],"testName":"test z gateway","id":1869624807880,"candidate_ids":[]},{"langs":[{"lang":"EN","questions":[{"question":"hello BITCH","no":1},{"question":"Hello Nyga !","no":2}]}],"testName":"test z gateway","id":1886382002566,"candidate_ids":[]},{"langs":[{"lang":"PL","questions":[{"question":"fsafsa","no":0},{"question":"asas","no":1},{"question":"a","no":2}]}],"testName":"fsa","id":1932241082393,"candidate_ids":[]},{"langs":[{"lang":"EN","questions":[{"question":"How dare you? XDDD","no":1},{"question":"Biggest dissapointment in your life?","no":2}]}],"testName":"test z gateway","id":1818892184911,"candidate_ids":[]},{"id":1792522565657},{"langs":[{"lang":"PL","questions":[{"question":"one more ","no":0},{"question":"do this","no":1},{"question":"dont mess around","no":2}]}],"testName":"fsa","id":2032162608310,"candidate_ids":[]},{"langs":[{"lang":"EN","questions":[{"answers":["With aplomb","Oh, I dare","Easily","lmao"],"no":1,"question":"POSTMAN","correct":"2, 3"},{"question":"POSTMAN","no":2}]}],"testName":"Testowy Z postman","id":1775194197783,"candidate_ids":[222222222222222,33333333333333,444444444444]},{"langs":[{"lang":"PL","questions":[{"question":"hello MADAFAKFAFASF ","no":1},{"question":"Hello ZIOMKU niemgasakasf !","no":2}]}],"testName":"fsa","id":1928695897798,"candidate_ids":[]},{"langs":[{"lang":"PL","questions":[{"question":"hello MADAFAKFAFASF ","no":1},{"question":"Hello ZIOMKU niemgasakasf !","no":2}]}],"testName":"fsafas","id":1923128913135,"candidate_ids":[]},{"langs":[{"lang":"EN","questions":[{"question":"How dare you? XDDD","no":1},{"question":"Biggest dissapointment in your life?","no":2}]}],"testName":"test z gateway","id":1883802008605,"candidate_ids":[]},{"langs":[{"lang":"EN","questions":[{"answers":["With aplomb","Oh, I dare","Easily","lmao"],"no":1,"question":"How dare you?","correct":"2, 3"},{"question":"Biggest dissapointment in your life?","no":2}]}],"testName":"nazwa wspaniałego testu","id":174493619050,"candidate_ids":["222222222222222","33333333333333","444444444444"]},{"langs":[{"lang":"PL","questions":[{"question":"hello MADAFAKFAFASF ","no":1},{"question":"Hello ZIOMKU niemgasakasf !","no":2}]}],"testName":"ddsa","id":1898119638606,"candidate_ids":[]},{"langs":[{"lang":"EN","questions":[{"question":"How dare you? XDDD","no":1},{"question":"Biggest dissapointment in your life?","no":2}]}],"testName":"test z gateway","id":1838311114357,"candidate_ids":[]},{"langs":[{"lang":"PL","questions":[{"question":"hello MADAFAKFAFASF ","no":1},{"question":"Hello ZIOMKU niemgasakasf !","no":2}]}],"testName":"fsafas","id":1922942617056,"candidate_ids":[]},{"langs":[{"lang":"EN","questions":[{"question":"How dare you? XDDD","no":1},{"question":"Biggest dissapointment in your life?","no":2}]}],"testName":"test z gateway","id":1880004577870,"candidate_ids":[]},{"langs":[{"lang":"PL","questions":[{"question":"fasfsaf","no":0},{"question":"fasfsaasf","no":1},{"question":"ala ma kota","no":2}]}],"testName":"name","id":1929761384447,"candidate_ids":[]},{"langs":[{"lang":"EN","questions":[{"question":"How dare you? XDDD","no":1},{"question":"Biggest dissapointment in your life?","no":2}]}],"testName":"test z gateway","id":1802173845856,"candidate_ids":[]},{"langs":[{"lang":"PL","questions":[{"question":"aaddd","no":0},{"question":"qwer","no":1}]}],"testName":"fas","id":1938554803913,"candidate_ids":[]},{"langs":[{"lang":"EN","questions":[{"answers":["With aplomb","Oh, I dare","Easily","lmao"],"no":1,"question":"POSTMAN","correct":"2, 3"},{"question":"POSTMAN","no":2}]}],"testName":"Testowy Z postma2222222222n","id":1834247759575,"candidate_ids":[222222222222222,33333333333333,444444444444]},{"langs":[{"lang":"EN","questions":[{"answers":["With aplomb","Oh, I dare","Easily","lmao"],"no":1,"question":"How dare you?","correct":"2, 3"},{"question":"Biggest dissapointment in your life?","no":2}]}],"testName":"Testowy Z postman","id":1772879345242,"candidate_ids":[222222222222222,33333333333333,444444444444]},{"id":1798654989518},{"langs":[{"lang":"EN","questions":[{"question":"hello BITCH","no":1},{"question":"Hello Nyga !","no":2}]}],"testName":"test z gateway","id":1886666400447,"candidate_ids":[]},{"langs":[{"lang":"leng","questions":[{"question":"hello MADAFAKFAFASF ","no":1},{"question":"Hello ZIOMKU niemgasakasf !","no":2}]}],"testName":"fasas","id":1927882938444,"candidate_ids":[]},{"langs":[{"lang":"EN","questions":[{"question":"How dare you? XDDD","no":1},{"question":"Biggest dissapointment in your life?","no":2}]}],"testName":"test z gateway","id":1848752524408,"candidate_ids":[]},{"langs":[{"lang":"EN","questions":[{"question":"How dare you? XDDD","no":1},{"question":"Biggest dissapointment in your life?","no":2}]}],"testName":"test z gateway","id":1864284893521,"candidate_ids":[]}],"Count":28,"ScannedCount":28}');

        console.log(fetchedTests);
        this.state = {
            tests: fetchedTests
        }
    }

    createTable = () => {

        let table = []

        for (let t=0; t<this.state.tests.Items.length; t++) {
            let row = this.state.tests.Items[t];
            let rowData = "<div>";
            if(row.langs) {
                for (let l = 0; l < row.langs.length; l++) {
                    let questions = "";
                    if(row.langs[l].questions) {
                        for (let q = 0; q < row.langs[l].questions.length; q++) {
                            questions += '<li>'+row.langs[l].questions[q].question+'</li>';
                        }
                    }
                    rowData += '<ul>'+questions+'</ul>';
                }
            }
            rowData += "</div><br/><br/>";
            table.push(<li><strong>{row.testName}:</strong><br/><ul dangerouslySetInnerHTML={{__html: rowData}}></ul></li>)
        }
        return table
    }

    render() {
        return (
            <section class="section">
                <ul>
                    {this.createTable()}
                </ul>
            </section>
        )
    }
}

export default ShowTests;
