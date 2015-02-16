"@fixture Master Detail test";
"@page https://demos.devexpress.com/ASPxGridViewDemos/MasterDetail/MasterDetail.aspx";

"@require :dx";

"@test"["master-detail test"] = {
    '1.Check if a detail row visible': function() {
        var detailDataRowsCount = getGrid().getDetailRows().length;
        eq(detailDataRowsCount, 1);
    },
    '2. Expand the second row': function() {
        act.click(getGrid().getDetailButtons()[1]);
    },
    '3.Check if two detail grids are visible': function() {
        var detailDataRowsCount = getGrid().getDetailRows().length;
        eq(detailDataRowsCount, 2);
    },
    '4.Collapse the first row': function() {
        act.click(getGrid().getDetailButtons()[0]);
    },
    '5.Collapse the second row': function() {
        act.click(getGrid().getDetailButtons()[1]);
    },
    '6.Check if there is no visible detail grids': function() {
        var detailDataRowsCount = getGrid().getDetailRows().length;
        eq(detailDataRowsCount, 0);
    },
    '7.Click the "Keep a single expanded row at a time" check box': function() {
        act.click("#ContentHolder_chkSingleExpanded_S_D");
    },
    '8.Expand the first row': function() {
        act.click(getGrid().getDetailButtons()[0]);
    },
    '9.Expand the second row': function() {
        act.click(getGrid().getDetailButtons()[1]);
    },
    '10.Check the "Allow single row to be expanded" property': function() {
        var detailDataRowsCount = getGrid().getDetailRows().length;
        eq(detailDataRowsCount, 1);
    }    
};

// helpers
var getGrid = function(){
    return dx.grid("grid");
};