function commonFunctions(){
    // Fill drop down object with data
    function fillDropDown(req){
        $(req.obj).append($('<option>', {
            value: req.defaultValue,
            text: req.defaultText
        }));
        for(data in req.dataFound){
            $(req.obj).append($('<option>', {
                value: req.dataFound[data],
                text: req.dataFound[data]
            }));
        }
    }

    // Format content for display of members
    function formatContent(req){
        var returnContent = '';
        
        for(field in req.fieldsDisplay){
            var content = req[req.fieldsDisplay[field]] !== '' ? req[req.fieldsDisplay[field]] : '&nbsp;';
            returnContent += req.displayHeader ? req.eachItemHeaderHTML.replaceAll('%', content) : req.eachItemHTML.replaceAll('%', content);
        }
        if(returnContent != ''){
            returnContent = req.eachGroupHTML.replaceAll('%', returnContent);
        }
        return returnContent;
    }
    // Return functions that are needed from external calls
    this.fillDropDown = fillDropDown;
    this.formatContent = formatContent;

    return this;
}