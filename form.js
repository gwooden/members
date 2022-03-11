// Get objects needed
const membersObj = members();
const commonFuncObj = commonFunctions();

// Common settings for display and ajax calls
const commonSettings = {
    eachGroupHTML: '<div class="row">%</div>',
    eachItemHTML: '<div class="content-column col-md-1">%</div>',
    eachItemHeaderHTML: '<div class="content-column col-md-1 js-header pointer" data-sorton="%">%</div>',
    noRecordsMessage: 'No Records Found',
    fieldsDisplay: ['first','last','title','chamber','party','legstate','district'],
    headerDisplay: ['First Name','Last Name','Title','Chamber','Party','State','District'],
    pullMembersURL: '/members.cfc?method=getMembers',
    pullStatesURL: '/members.cfc?method=getMembers',
    urlAjax: 'http://example.local:8082/remote/',
    memberContentObj: '#js-memberContent',
    stateDropDownClass: '.stateDropDown',
    stateField: 'LEGSTATE',
    sortDirection: 'asc',
    orderByFields: {
        'First Name': 'first',
        'Last Name': 'last',
        'Title': 'title',
        'Chamber': 'chamber',
        'Party': 'party',
        'State': 'legstate',
        'District': 'district'
    }
}
// Call using jQuery, can update to React or other framework
$( document ).ready( function() {
    // Change of search on name
    $('input[name=name]').on('input', function() {
        var req = Object.assign(
            {
            name: $(this).val(),
            state: $('select[name=state]').val()
            },commonSettings);
        membersObj.pullMembers(req);
    });

    // Click header
    var direction = 'asc';
    $(document).on('click','.js-header',function(){
        var orderBy = $(this).attr("data-sorton") ? $(this).attr("data-sorton") : 'last ASC, first ASC';
        // Get actual field to order by
        orderBy = commonSettings.orderByFields[orderBy];
        var req = Object.assign(
            {
                name: $('input[name=name').val(),
                state: $('select[name=state]').val()
            },commonSettings);
        req.orderby = orderBy + ' ' + direction;
        membersObj.pullMembers(req);
        direction = direction == 'asc' ? 'desc' : 'asc';
    });
    
    // Change of state drop down
    $('select[name=state]').on('change', function() {
        var req = Object.assign(
            {
                name: $('input[name=name').val(),
                state: $(this).val()
            },commonSettings);
        membersObj.pullMembers(req);
    });

    // Prevent form from submitting
    $("form").submit(function(e){
        e.preventDefault();
    });

    // Load initial list
    var req = Object.assign(
        {
            name: '',
            state: '',
            obj:'#js-stateDropDown',
            defaultValue:'',
            defaultText:'Filter By State'
        },commonSettings);
    membersObj.pullMembers(req);
});