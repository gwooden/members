function members(){
    
    
    // Pull members from remote (can be updated to api call), doing a post because input box could have a lot of data
    function pullMembers(req){
        var htmlDisplay = '';
        
        const noRecordsText = req.noRecordsMessage ? req.noRecordsMessage : 'No Records Found';

        $.post(
            req.urlAjax + req.pullMembersURL,
            {'searchName':req.name,'stateName':req.state,'orderBy':req.orderby},
            function(data){
                var headerValues = req;
                var statesFound = [];
                $.each(JSON.parse(data), function(index, obj) {
                    for(field in req.fieldsDisplay){
                        var value = obj[req.fieldsDisplay[field].toUpperCase()];
                        req[req.fieldsDisplay[field]] = value;
                    }
                    htmlDisplay += commonFuncObj.formatContent(req);
                    if(statesFound.indexOf(obj[req.stateField]) == -1){
                        statesFound.push(obj[req.stateField]);
                    }
                });
                
                for(field in req.fieldsDisplay){
                    var value = req.headerDisplay[field];
                    headerValues[req.fieldsDisplay[field]] = value;
                }
                headerValues.displayHeader = true;
                htmlDisplay = htmlDisplay !== '' ? commonFuncObj.formatContent(headerValues) + htmlDisplay : noRecordsText;
                //Populate member content
                $(req.memberContentObj).html(htmlDisplay);

                //Set data
                req.data = data;
                //Populate the drop down
                populateStates(req);
            })
        .done(function() { })
        .fail(function(jqxhr, settings, ex) {  });
    }

    // Populate the states drop down
    function populateStates(req){
        var statesFound = [];
      
        $.each(JSON.parse(req.data), function(index, obj) {
            if(statesFound.indexOf(obj[req.stateField]) == -1){
                statesFound.push(obj[req.stateField]);
            }
        });
        statesFound.sort();
        // Hide drop down until we have data
        $(req.stateDropDownClass).hide();
        if(statesFound.length > 0){
            req.dataFound = statesFound;
            commonFuncObj.fillDropDown(req);
            $(req.stateDropDownClass).show();
        }
    }

    // Return functions that are needed from external calls
    this.pullMembers = pullMembers;
    this.populateStates = populateStates;

    return this;
}