# TestCafe-Wrappers

TestCafe wrappers are a set of JavaScript classes that help you work with the DevExpress ASP.NET controls in [TestCafe](http://testcafe.devexpress.com/Documentation).

#Contents

<a href="#HowToInstall">How to install</a><br/>
<a href="#Example">Example of usage</a><br/>
<a href="#MoreHelp">Need more help to get started?</a><br/>
<a href="#ContentsAPI">Contents API</a><br/>
<a href="#API">API</a>

<a name="HowToInstall"></a>
#How to install

1. Download the latest tagged archive (choose the "zip" option).
2. Unzip the archive.
3. Copy the "wrappers" folder to the directory that contains your TestCafe tests. So the tests' and wrappers' folder must be located at the same directory level. 
4. Define modules section in the [Directory Configuration File](http://testcafe.devexpress.com/Documentation/ApiReference/Test_Fixture_API_Reference/Common_Concepts#Directory_Configuration_File) file as shown below:
```json
"modules": {
        "dx": [
            "../wrappers/dx.js",
            "../wrappers/web/ASPxGridViewWrapper.js"
        ]
    }
```

<a name="Example"></a>
#Example of usage

```javascript
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
```

<a name="MoreHelp"></a>
#Need more help to get started?

Visit [TestCafé guide](http://testcafe.devexpress.com/Documentation) and [TestCafé API](http://testcafe.devexpress.com/Documentation/ApiReference/Test_Fixture_API_Reference) references. If you have any additional questions or suggestions, don't hesitate to ask using the [DevExpress Support Center](http://www.devexpress.com/Support/Center/Question/ChangeFilterSet/1?FavoritesOnly=False&MyItemsOnly=False&MyTeamItemsOnly=False&TechnologyName=Testing+Tools&PlatformName=AllPlatforms&ProductName=AllProducts&TicketType=All).

<a name="ContentsAPI"></a>
#Contents API

<a href="#grid">grid(id)</a><br/>
<a href="#getColumnHeaders">getColumnHeaders()</a><br/>
<a href="#getColumnHeader">getColumnHeader(fieldCaption)</a><br/>
<a href="#getColumnHeaderFilterButton">getColumnHeaderFilterButton(fieldCaption)</a><br/>
<a href="#isColumnSorted">isColumnSorted(fieldCaption, isAscending)</a><br/>
<a href="#getColumnValuesOnPage">getColumnValuesOnPage(fieldCaption)</a><br/>
<a href="#getDetailRows">getDetailRows()</a><br/>
<a href="#getPreviewRows">getPreviewRows()</a><br/>
<a href="#getGroupRows">getGroupRows()</a><br/>
<a href="#getDataRows">getDataRows()</a><br/>
<a href="#getDataRow">getDataRow(index)</a><br/>
<a href="#getEmptyDataRow">getEmptyDataRow()</a><br/>
<a href="#getGroupRowButtons">getGroupRowButtons(isCollapse)</a><br/>
<a href="#getEditingRow">getEditingRow()</a><br/>
<a href="#getClearFilterButton">getClearFilterButton()</a><br/>
<a href="#getApplyFilterButton">getApplyFilterButton()</a><br/>
<a href="#getFilterRowEditor">getFilterRowEditor(columnIndex)</a><br/>
<a href="#getFilterRowMenuIcon">getFilterRowMenuIcon(columnIndex)</a><br/>
<a href="#getFilterRowButton">getFilterRowButton(fieldCaption)</a><br/>
<a href="#getFilterApplyButton">getFilterApplyButton()</a><br/>
<a href="#getShowFilterControlAnchor">getShowFilterControlAnchor()</a><br/>
<a href="#getFooter">getFooter()</a><br/>
<a href="#getFooterCell">getFooterCell(index)</a><br/>
<a href="#getGroupPanelContextMenu">getGroupPanelContextMenu()</a><br/>
<a href="#getColumnsContextMenu">getColumnsContextMenu()</a><br/>
<a href="#getRowsContextMenu">getRowsContextMenu()</a><br/>
<a href="#getFooterContextMenu">getFooterContextMenu()</a><br/>
<a href="#getDetailButtons">getDetailButtons()</a><br/>
<a href="#getNewRowButtons">getNewRowButtons()</a><br/>
<a href="#getNewRowButton">getNewRowButton(rowIndex)</a><br/>
<a href="#getNewRowButtonFromHeader">getNewRowButtonFromHeader()</a><br/>
<a href="#getDeleteButton">getDeleteButton(rowIndex)</a><br/>
<a href="#getEditButton">getEditButton(rowIndex)</a><br/>
<a href="#getSelectButton">getSelectButton(rowIndex)</a><br/>
<a href="#getEditFormUpdateButton">getEditFormUpdateButton()</a><br/>
<a href="#getEditFormCancelButton">getEditFormCancelButton()</a><br/>
<a href="#getCustomButton">getCustomButton(buttonID, rowIndex)</a><br/>
<a href="#getEditingErrorRow">getEditingErrorRow(rowIndex)</a><br/>
<a href="#getHeadersFromGroupPanel">getHeadersFromGroupPanel()</a><br/>
<a href="#getGroupPanel">getGroupPanel()</a><br/>
<a href="#getSelectCheckBoxes">getSelectCheckBoxes()</a><br/>
<a href="#getSelectCheckBox">getSelectCheckBox(rowIndex)</a><br/>
<a href="#getSelectAllCheckBox">getSelectAllCheckBox()</a><br/>
<a href="#getSelectCheckBoxValue">getSelectCheckBoxValue(rowIndex)</a><br/>
<a href="#getSelectAllCheckBoxValue">getSelectAllCheckBoxValue()</a><br/>
<a href="#getSelectCheckBoxesValues">getSelectCheckBoxesValues()</a><br/>
<a href="#getTopPager">getTopPager()</a><br/>
<a href="#getBottomPager">getBottomPager()</a><br/>
<a href="#getFilterRowMenu">getFilterRowMenu()</a><br/>
<a href="#getHeaderFilterListBox">getHeaderFilterListBox()</a><br/>
<a href="#getHeaderFilterSelectAllCheckBox">getHeaderFilterSelectAllCheckBox()</a><br/>
<a href="#getHeaderFilterOkButton">getHeaderFilterOkButton()</a><br/>
<a href="#getHeaderFilterPopup">getHeaderFilterPopup()</a><br/>
<a href="#getFilterBuilderPopup">getFilterBuilderPopup()</a><br/>
<a href="#getFilterBuilder">getFilterBuilder()</a><br/>
<a href="#getEditFormEditor">getEditFormEditor(indexOrCaption)</a><br/>
<a href="#getCustomizationWindow">getCustomizationWindow()</a><br/>
<a href="#getDataColumnValues">getDataColumnValues(fieldCaption)</a><br/>
<a href="#getDataCell">getDataCell(rowIndex, fieldCaption)</a><br/>
<a href="#isModifiedCell">isModifiedCell(rowIndex, fieldCaption)</a><br/>
<a href="#getBottomNextButton">getBottomNextButton()</a><br/>
<a href="#getBottomPrevButton">getBottomPrevButton()</a><br/>

<a name="API"></a>
#API

<a name="grid"></a>
##class: grid

Creates an instance of a grid

| Param | Type | Description |
| ----- | ---- | ----------- |
| controlID | <code>number</code> | The grid's ID. |

##### Example
```javascript
    //How to create a grid instance
    var getGrid = function(){
       return dx.grid("grid");
    };
```
<a name="getColumnHeaders"></a>
##getColumnHeaders()
Returns a collection of [Column Headers](https://documentation.devexpress.com/#AspNet/CustomDocument3669).

<a name="getColumnHeader"></a>
##getColumnHeader(fieldCaption)
Returns the [Column Header](https://documentation.devexpress.com/#AspNet/CustomDocument3669) for a specified data column.

| Param | Type | Description |
| ----- | ---- | ----------- |
| fieldCaption | <code>string</code> | A string value that specifies a column caption text |

<a name="getColumnHeaderFilterButton"></a>
##getColumnHeaderFilterButton(fieldCaption)
Returns the [Header Filter](https://documentation.devexpress.com/#AspNet/CustomDocument4022) button for a specified data column.

| Param | Type | Description |
| ----- | ---- | ----------- |
| fieldCaption | <code>string</code> | A string value that specifies a column caption text |

<a name="isColumnSorted"></a>
##isColumnSorted(fieldCaption, isAscending)
Checks whether a column has been sorted in ascending order.

| Param | Type | Description |
| ----- | ---- | ----------- |
| fieldCaption | <code>string</code> | A string value that specifies a column caption text |
| isAscending | <code>boolean</code> | A boolean value that identifies if a column is sorted in ascending order |

<a name="getColumnValuesOnPage"></a>
##getColumnValuesOnPage(fieldCaption)
Returns the values of rows displayed within the current page.

| Param | Type | Description |
| ----- | ---- | ----------- |
| fieldCaption | <code>string</code> | A string value that specifies a column caption text |

<a name="getDetailRows"></a>
##getDetailRows()
Returns a collection of [Detail Rows](https://documentation.devexpress.com/#AspNet/CustomDocument3769).

<a name="getPreviewRows"></a>
##getPreviewRows()
Returns a collection of [Preview Rows](https://documentation.devexpress.com/#AspNet/CustomDocument3672).

<a name="getGroupRows"></a>
##getGroupRows()
Returns a collection of [Group Rows](https://documentation.devexpress.com/#AspNet/CustomDocument3681).

<a name="getDataRows"></a>
##getDataRows()
Returns a collection of [Data Rows](https://documentation.devexpress.com/#AspNet/CustomDocument3673).

<a name="getDataRow"></a>
##getDataRow(index)
Returns the specified [Data Row](https://documentation.devexpress.com/#AspNet/CustomDocument3673).

| Param | Type | Description |
| ----- | ---- | ----------- |
| index | <code>number</code> | A numeric value that specifies a row index |

<a name="getEmptyDataRow"></a>
##getEmptyDataRow()
Returns an [Empty Data Row](https://documentation.devexpress.com/#AspNet/CustomDocument3790).

<a name="getGroupRowButtons"></a>
##getGroupRowButtons(isCollapse)
Returns a collection of [Group Row](https://documentation.devexpress.com/#AspNet/CustomDocument3681) buttons.

| Param | Type | Description |
| ----- | ---- | ----------- |
| isCollapse | <code>boolean</code> | A boolean value that identifies if a Group Row is collapsed |

<a name="getEditingRow"></a>
##getEditingRow()
Returns the [Edit Form](https://documentation.devexpress.com/#AspNet/CustomDocument3680).

<a name="getClearFilterButton"></a>
##getClearFilterButton()
Returns the [ClearFilter](https://documentation.devexpress.com/#AspNet/CustomDocument3684) button.

<a name="getApplyFilterButton"></a>
##getApplyFilterButton()
Returns the [ApplyFilter](https://documentation.devexpress.com/#AspNet/CustomDocument3684) button.

<a name="getFilterRowEditor"></a>
##getFilterRowEditor(columnIndex)
Returns the editor used to edit the value in the [Filter Row](https://documentation.devexpress.com/#AspNet/CustomDocument3684) for a specified data column.

| Param | Type | Description |
| ----- | ---- | ----------- |
| columnIndex | <code>mumber</code> | A numeric value that specifies a column index |

<a name="getFilterRowMenuIcon"></a>
##getFilterRowMenuIcon(columnIndex)
Returns the  [Filter Row](https://documentation.devexpress.com/#AspNet/CustomDocument3684) menu icon for a specified data column.

| Param | Type | Description |
| ----- | ---- | ----------- |
| columnIndex | <code>mumber</code> | A numeric value that specifies a column index |

<a name="getFilterRowButton"></a>
##getFilterRowButton(fieldCaption)
Returns the header filter button for a specified data column.

| Param | Type | Description |
| ----- | ---- | ----------- |
| fieldCaption | <code>string</code> | A string value that specifies a column caption text |

<a name="getFilterApplyButton"></a>
##getFilterApplyButton()
Returns the ApplyFilter button.

<a name="getShowFilterControlAnchor"></a>
##getShowFilterControlAnchor()
Returns the ShowFilterControl anchor.

<a name="getFooter"></a>
##getFooter()
Returns the [Footer](https://documentation.devexpress.com/#AspNet/CustomDocument3675).

<a name="getFooterCell"></a>
##getFooterCell(index)
Returns the [Footer](https://documentation.devexpress.com/#AspNet/CustomDocument3675) cell for a specified data column.

| Param | Type | Description |
| ----- | ---- | ----------- |
| index | <code>mumber</code> | A numeric value that specifies a column index |

<a name="getGroupPanelContextMenu"></a>
##getGroupPanelContextMenu()
Returns the GroupPanel [Context Menu](https://documentation.devexpress.com/#AspNet/CustomDocument17125).

<a name="getColumnsContextMenu"></a>
##getColumnsContextMenu()
Returns the Columns [Context Menu](https://documentation.devexpress.com/#AspNet/CustomDocument17125).

<a name="getRowsContextMenu"></a>
##getRowsContextMenu()
Returns the Rows [Context Menu](https://documentation.devexpress.com/#AspNet/CustomDocument17125).

<a name="getFooterContextMenu"></a>
##getFooterContextMenu()
Returns the Footer [Context Menu](https://documentation.devexpress.com/#AspNet/CustomDocument17125).

<a name="getDetailButtons"></a>
##getDetailButtons()
Returns a collection of detail row buttons.

<a name="getNewRowButtons"></a>
##getNewRowButtons()
Returns a collection of new row buttons.

<a name="getNewRowButton"></a>
##getNewRowButton(rowIndex)
Returns the [New Row](https://documentation.devexpress.com/#AspNet/CustomDocument3689) button for a specified data row.

| Param | Type | Description |
| ----- | ---- | ----------- |
| rowIndex | <code>mumber</code> | A numeric value that specifies a row index |

<a name="getNewRowButtonFromHeader"></a>
##getNewRowButtonFromHeader()
Returns the [New Row](https://documentation.devexpress.com/#AspNet/CustomDocument3689) button located in a grid header.

<a name="getDeleteButton"></a>
##getDeleteButton(rowIndex)
Returns the [Delete Row](https://documentation.devexpress.com/#AspNet/CustomDocument3689) button for a specified data row.

| Param | Type | Description |
| ----- | ---- | ----------- |
| rowIndex | <code>mumber</code> | A numeric value that specifies a row index |

<a name="getEditButton"></a>
##getEditButton(rowIndex)
Returns the [Edit Row](https://documentation.devexpress.com/#AspNet/CustomDocument3689)  button for a specified data row.

| Param | Type | Description |
| ----- | ---- | ----------- |
| rowIndex | <code>mumber</code> | A numeric value that specifies a row index |

<a name="getSelectButton"></a>
##getSelectButton(rowIndex)
Returns the [Select Row](https://documentation.devexpress.com/#AspNet/CustomDocument3689) button for a specified data row.

| Param | Type | Description |
| ----- | ---- | ----------- |
| rowIndex | <code>mumber</code> | A numeric value that specifies a row index |

<a name="getEditFormUpdateButton"></a>
##getEditFormUpdateButton()
Returns the [Edit Form](https://documentation.devexpress.com/#AspNet/CustomDocument3680) Update button.

<a name="getEditFormCancelButton"></a>
##getEditFormCancelButton()
Returns the [Edit Form](https://documentation.devexpress.com/#AspNet/CustomDocument3680) Cancel button.

<a name="getCustomButton"></a>
##getCustomButton(buttonID, rowIndex)
Returns a [Custom](https://documentation.devexpress.com/#AspNet/CustomDocument3689) button for a specified data row.

| Param | Type | Description |
| ----- | ---- | ----------- |
| buttonID | <code>string</code> | A string value that specifies a custom button ID |
| rowIndex | <code>mumber</code> | A numeric value that specifies a row index |

<a name="getEditingErrorRow"></a>
##getEditingErrorRow(rowIndex)
Returns the [Error Row](https://documentation.devexpress.com/#AspNet/CustomDocument3775).

| Param | Type | Description |
| ----- | ---- | ----------- |
| rowIndex | <code>mumber</code> | A numeric value that specifies a row index |

<a name="getHeadersFromGroupPanel"></a>
##getHeadersFromGroupPanel()
Returns a collection of headers located inside the GroupPanel.

<a name="getGroupPanel"></a>
##getGroupPanel()
Returns the [Group Panel](https://documentation.devexpress.com/#AspNet/CustomDocument3682).

<a name="getSelectCheckBoxes"></a>
##getSelectCheckBoxes()
Returns a collection of [Select](https://documentation.devexpress.com/#AspNet/CustomDocument3689) check boxes located on a current page.

<a name="getSelectCheckBox"></a>
##getSelectCheckBox(rowIndex)
Returns the [Select](https://documentation.devexpress.com/#AspNet/CustomDocument3689) check box for a specified data row.

| Param | Type | Description |
| ----- | ---- | ----------- |
| rowIndex | <code>mumber</code> | A numeric value that specifies a row index |

<a name="getSelectAllCheckBox"></a>
##getSelectAllCheckBox()
Returns the SelectAll check box.

<a name="getSelectCheckBoxValue"></a>
##getSelectCheckBoxValue(rowIndex)
Returns the [Select](https://documentation.devexpress.com/#AspNet/CustomDocument3689) check box value for a specified data row.

| Param | Type | Description |
| ----- | ---- | ----------- |
| rowIndex | <code>mumber</code> | A numeric value that specifies a row index |

<a name="getSelectAllCheckBoxValue"></a>
##getSelectAllCheckBoxValue()
Returns the SelectAll check box value.

<a name="getSelectCheckBoxesValues"></a>
##getSelectCheckBoxesValues()
Returns a collection of [Select](https://documentation.devexpress.com/#AspNet/CustomDocument3689) check box values located on a current page.

<a name="getTopPager"></a>
##getTopPager()
Returns the top [Pager](https://documentation.devexpress.com/#AspNet/CustomDocument3676).

<a name="getBottomPager"></a>
##getBottomPager()
Returns the bottom [Pager](https://documentation.devexpress.com/#AspNet/CustomDocument3676).

<a name="getFilterRowMenu"></a>
##getFilterRowMenu()
Returns the [FilterRow](https://documentation.devexpress.com/#AspNet/CustomDocument3684) menu.

<a name="getHeaderFilterListBox"></a>
##getHeaderFilterListBox()
Returns a list box of the currently open [Header Filter](https://documentation.devexpress.com/#AspNet/CustomDocument4022).

<a name="getHeaderFilterSelectAllCheckBox"></a>
##getHeaderFilterSelectAllCheckBox()
Returns the SelectAll check box of the currently open [Header Filter](https://documentation.devexpress.com/#AspNet/CustomDocument4022).

<a name="getHeaderFilterOkButton"></a>
##getHeaderFilterOkButton()
Returns the Ok button of the currently open [Header Filter](https://documentation.devexpress.com/#AspNet/CustomDocument4022).

<a name="getHeaderFilterPopup"></a>
##getHeaderFilterPopup()
Returns the currently open [Header Filter](https://documentation.devexpress.com/#AspNet/CustomDocument4022).

<a name="getFilterBuilderPopup"></a>
##getFilterBuilderPopup()
Returns the main area of the [Filter Builder](https://documentation.devexpress.com/#AspNet/CustomDocument11573).

<a name="getFilterBuilder"></a>
##getFilterBuilder()
Returns the [Filter Builder](https://documentation.devexpress.com/#AspNet/CustomDocument11573).

<a name="getEditFormEditor"></a>
##getEditFormEditor(indexOrCaption)
Returns the [Edit Cell](https://documentation.devexpress.com/#AspNet/CustomDocument3694) used to edit the specified column's values.

| Param | Type | Description |
| ----- | ---- | ----------- |
| indexOrCaption | <code>number</code> \| <code>string</code> | A column index or caption |

<a name="getCustomizationWindow"></a>
##getCustomizationWindow()
Returns the [Customization Window](https://documentation.devexpress.com/#AspNet/CustomDocument3679).

<a name="getDataColumnValues"></a>
##getDataColumnValues(fieldCaption)
Returns row values for a specified data column displayed within a current page.

| Param | Type | Description |
| ----- | ---- | ----------- |
| fieldCaption | <code>string</code> | A string value that specifies a column caption text |

<a name="getDataCell"></a>
##getDataCell(rowIndex, fieldCaption)
Returns the [Data Cell](https://documentation.devexpress.com/#AspNet/CustomDocument3670).

| Param | Type | Description |
| ----- | ---- | ----------- |
| rowIndex | <code>number</code> | A numeric value that specifies a row index |
| fieldCaption | <code>string</code> | A string value that specifies a column caption text |

<a name="isModifiedCell"></a>
##isModifiedCell(rowIndex, fieldCaption)
Checks if a BatchEdit cell has been modified.

| Param | Type | Description |
| ----- | ---- | ----------- |
| rowIndex | <code>number</code> | A numeric value that specifies a row index |
| fieldCaption | <code>string</code> | A string value that specifies a column caption text |

<a name="getBottomNextButton"></a>
##getBottomNextButton()
Returns the bottom [Pager](https://documentation.devexpress.com/#AspNet/CustomDocument3676) Next button.

<a name="getBottomPrevButton"></a>
##getBottomPrevButton()
Returns the bottom [Pager](https://documentation.devexpress.com/#AspNet/CustomDocument3676) Prev button.
