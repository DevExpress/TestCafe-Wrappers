/**
 * Creates an instance of a grid
 *
 * @constructor
 * @this {grid}
 * @param {number} controlID The grid's ID.
 * @example //How to create a grid instance
 * var getGrid = function(){
 *    return dx.grid("grid");
 * };
 */
dx.grid = function (controlID) {
    var DATA_ROW_AFFIX = "_DXDataRow",
        GROUP_ROW_AFFIX = "_DXGroupRow",
        DETAIL_ROW_AFFIX = "_DXDRow",
        PREVIEW_ROW_AFFIX = "_DXPRow",
        HEADER_ROW_AFFIX = "_DXHeadersRow",
		EMPTY_ROW_AFFIX = "_DXEmptyRow",
        SELECTCHECKBOX_AFFIX = "_DXSelBtn",
        SELECTALLCHECKBOX_AFFIX = "_DXSelAllBtn",
        CHECKED_CSS_CLASS = "edtCheckBoxChecked",
        GRAYED_CSS_CLASS = "edtCheckBoxGrayed",
        UNCHECKED_CSS_CLASS = "edtCheckBoxUnchecked";

    var $el = dx.getMainElement(controlID),
        clientID = $el.attr('id'),
        instance = dx.getClientInstance(clientID);
    /**
         * Returns a collection of {@link https://documentation.devexpress.com/#AspNet/CustomDocument3669|Column Headers}. 
    */
    var getColumnHeaders = function($custWin){
        return ($custWin || $el).find("td, th").filter(function() {
            return isColumnHeaderID(this.id, $custWin && $custWin.length > 0);
        });
    }
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3669|Column Header} for a specified data column.
         * @param {string} fieldCaption A string value that specifies a column caption text  
    */
    var getColumnHeader = function(fieldCaption, $custWin) {
        return ($custWin || $el).find("td, th").filter(function() {
            if(!isColumnHeaderID(this.id, $custWin && $custWin.length > 0))
                return false;
            return $(this).find("td").filter(function(){ return $(this).text() == fieldCaption; }).length > 0;
        });
    };
    var isColumnHeaderID = function(id, hasCustWin){
        var custWinPrefix = hasCustWin ? "\\S+" : "";
        var columnsRegExp = new RegExp('(^|_)' + clientID + custWinPrefix + "_(\group)*col" + '\\d+');
        return columnsRegExp.test(id);
    };
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument4022|Header Filter} button for a specified data column.
         * @param {string} fieldCaption A string value that specifies a column caption text
     */
    var getColumnHeaderFilterButton = function(fieldCaption) {
        return getColumnHeader(fieldCaption).find("img.dxgv__hfb");
    };
    var getColumnHeaderRow = function(index) {
        index = index === undefined ? "0" : index;
        return $el.find("tr#" + clientID + HEADER_ROW_AFFIX + index);
    };
    /**
         * Checks whether a column has been sorted in ascending order.
         * @param {string} fieldCaption A string value that specifies a column caption text
         * @param {boolean} isAscending A boolean value that identifies if a column is sorted in ascending order
    */ 
    var isColumnSorted = function(fieldCaption, isAscending, excludedRowIndex){
        var values = getColumnValuesOnPage(fieldCaption);
        if(!values || values.length == 0)
            return false;
        
        for(var i = 1; i < values.length; i++){
            if(excludedRowIndex && ($.inArray(i, excludedRowIndex) > -1 || $.inArray(i - 1, excludedRowIndex) > -1)) 
                continue;
            if((values[i - 1] < values[i]) != isAscending && (values[i - 1] != values[i]))
                return false;
        }
        return true;
    };
    /**
         * Returns the values of rows displayed within the current page.
         * @param {string} fieldCaption A string value that specifies a column caption text 
    */
    var getColumnValuesOnPage = function(fieldCaption){
        var columnIndex = findColumnIndex(fieldCaption);

        var values = [ ];
        var dataRows = $el.find("tr").filter(function(){ 
            return this.id.match(clientID + DATA_ROW_AFFIX);
        });
        dataRows.each(function() {
            var rowValue = $(this).children()[columnIndex].innerHTML;
            values.push(rowValue);
        });
        return values;
    };
    var findColumnIndex = function(fieldCaption){
        var column = getColumnHeader(fieldCaption);
        return column.length > 0 ? column.attr("id").match(new RegExp("_(?:group)?col(\\d+)"))[1] : -1;
    };
    /**
         * Returns a collection of {@link https://documentation.devexpress.com/#AspNet/CustomDocument3769|Detail Rows}. 
    */
    var getDetailRows = function(){
        return getRows(DETAIL_ROW_AFFIX);
    };
    /**
         * Returns a collection of {@link https://documentation.devexpress.com/#AspNet/CustomDocument3672|Preview Rows}. 
    */
    var getPreviewRows = function(){
        return getRows(PREVIEW_ROW_AFFIX);
    };
    /**
         * Returns a collection of {@link https://documentation.devexpress.com/#AspNet/CustomDocument3681|Group Rows}. 
    */
    var getGroupRows = function(expanded) {
        return getRows(GROUP_ROW_AFFIX, expanded ? "Exp" : "");
    };
    /**
         * Returns a collection of {@link https://documentation.devexpress.com/#AspNet/CustomDocument3673|Data Rows}. 
    */
    var getDataRows = function() {
        var insertedRows = getRows(DATA_ROW_AFFIX, "-");
        var dataRows = getRows(DATA_ROW_AFFIX);
        return insertedRows.concat(dataRows);
    };
    /**
         * Returns the specified {@link https://documentation.devexpress.com/#AspNet/CustomDocument3673|Data Row}. 
         * @param {number} index A numeric value that specifies a row index
    */
    var getDataRow = function(index) { // TODO remove it and use findDataRow - it use global row index
        return $(getDataRows()[index]);
    };
    var findDataRow = function(rowIndex) {
        return $("tr#" + clientID + DATA_ROW_AFFIX + rowIndex);
    }
    var getRows = function(affix, postfix) {
        var regexp = new RegExp(clientID + affix + (postfix ? postfix : "") + "\\d+");
        var rows = $el.find("tr").filter(function() {
            return regexp.test(this.id);
        });
        return $.makeArray(rows);
    };
    /**
         * Returns an {@link https://documentation.devexpress.com/#AspNet/CustomDocument3790|Empty Data Row}. 
    */
    var getEmptyDataRow = function(){
        var rows = $el.find("tr#" + clientID + EMPTY_ROW_AFFIX);
        return rows.length > 0 ? $(rows[0]) : null;
    };
    /**
         * Returns a collection of {@link https://documentation.devexpress.com/#AspNet/CustomDocument3681|Group Row} buttons. 
         * @param {boolean} isCollapse A boolean value that identifies if a Group Row is collapsed
    */
    var getGroupRowButtons = function(collapse) {
        var funcName = collapse ? "aspxGVCollapseRow" : "aspxGVExpandRow";
        var regexp = new RegExp(funcName + "\\('" + clientID + "',\\d+,\\S+\\)");
        return $el.find("img").filter(function(){
            return this.onclick && regexp.test(this.onclick.toString());
        });
    };
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3680|Edit Form}. 
    */
    var getEditingRow = function(){
        return $el.find("tr").filter(function(){
            return this.id.match("^" + clientID + "_DXEditingRow$");
        });
    };
    
    var getColumnResizeOffset = function(cell) {
        /// <param name="cell" type="$"></param>
        return cell.width() + parseInt(cell.css("padding-left")) + parseInt(cell.css("padding-right")) + parseInt(cell.css("border-right-width"))
    };
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3684|ClearFilter} button.
    */
    var getClearFilterButton = function(){
        return getCommandButtonCore(null, "ClearFilter");
    };
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3684|ApplyFilter} button.
    */
    var getApplyFilterButton = function(){
        return getCommandButtonCore(null, "ApplyMultiColumnAutoFilter");
    };
    /**
         * Returns the editor used to edit the value in the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3684|Filter Row} for a specified data column.
         * @param {mumber} columnIndex A numeric value that specifies a column index
    */
    var getFilterRowEditor = function(columnIndex){
        return $el.find("#" + clientID + "_DXFREditorcol" + columnIndex);
    };
    var getAutoFilterEditor = function(columnIndex) {
        return this.inst.GetAutoFilterEditor(this.inst.columns[columnIndex]);
    };
    /**
         * Returns the  {@link https://documentation.devexpress.com/#AspNet/CustomDocument3684|Filter Row} menu icon for a specified data column.
         * @param {mumber} columnIndex A numeric value that specifies a column index
    */
    var getFilterRowMenuIcon = function(columnIndex){
        var regexp = new RegExp("aspxGVFilterRowMenu\\('" + clientID + "'," + columnIndex +"\\S+\\)");
        return $el.find("img").filter(function() {
            return this.onclick && regexp.test(this.onclick.toString());
        });
    };
    var getCommandButtonCore = function(rowIndex, buttonType, predicate){
        var $container = _aspxIsExists(rowIndex) ? findDataRow(rowIndex) : $el;
        var isCBRegExp = new RegExp("\\.*\\d+$");
        return $container.find("[id*=DXCBtn]").filter(function(){
            if(!isCBRegExp.test(this.id)) 
                return false;

            var inst = aspxGetControlCollection().Get(this.id);
            return inst && $(inst.GetMainElement()) && inst.cpGVName == clientID 
                && (!buttonType || inst.cpClickArgs[0][0] == buttonType)
                && (!predicate || predicate(inst));
        }).first();
    };
    /**
         * Returns the header filter button for a specified data column.
         * @param {string} fieldCaption A string value that specifies a column caption text
    */
    var getFilterRowButton = function(fieldCaption){
        var column = getColumnHeader(fieldCaption);
        return column.find("img.dxgv__hfb");
    };
    /**
         * Returns the ShowFilterControl anchor.
    */
    var getShowFilterControlAnchor = function(){
        return $el.find("a").filter(function() {
            return this.onclick && this.onclick.toString().indexOf("aspxGVShowFilterControl") > -1;
        });
    };
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3675|Footer}.
    */
    var getFooter = function(){
        var regExp = new RegExp("^" + clientID + "_DXFooterRow$");
        return $el.find("tr").filter(function(){
            return regExp.test(this.id);
        });
    };
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3675|Footer} cell for a specified data column.
         * @param {mumber} index A numeric value that specifies a column index
    */
    var getFooterCell = function(index){
        var footer = getFooter();
        if(_aspxIsExists(footer)) 
            return $(footer[0]).find("td:not([class*='dxgvIndentCell'])")[index];
    };
    /**
         * Returns the GroupPanel {@link https://documentation.devexpress.com/#AspNet/CustomDocument17125|Context Menu}.
    */
    var getGroupPanelContextMenu = function() {
        return dx.menu(clientID + "_DXContextMenu" + "_GroupPanel");
    };
    /**
         * Returns the Columns {@link https://documentation.devexpress.com/#AspNet/CustomDocument17125|Context Menu}.
    */
    var getColumnsContextMenu = function() {
        return dx.menu(clientID + "_DXContextMenu" + "_Columns");
    };
    /**
         * Returns the Rows {@link https://documentation.devexpress.com/#AspNet/CustomDocument17125|Context Menu}.
    */
    var getRowsContextMenu = function() {
        return dx.menu(clientID + "_DXContextMenu" + "_Rows");
    };
    /**
         * Returns the Footer {@link https://documentation.devexpress.com/#AspNet/CustomDocument17125|Context Menu}.
    */
    var getFooterContextMenu = function() {
        return dx.menu(clientID + "_DXContextMenu" + "_Footer");
    };
    var getContextMenuCheckedItem = function(menu, itemName) {
        return menu.$el.find('li[class *= "dxm-checked"]').find('a,div,span').filter(function () {
            return $.trim($(this).text()) === itemName;
        }).last().parent();
    };
    var getGroupFooter = function(groupRow){
        var groupFooter = groupRow.next();
        while(groupFooter && !groupFooter.is("[class^='dxgvGroupFooter']")){
            if(groupFooter.is("[class^='dxgvGroupRow']")){
                groupFooter = $();
                break;
            }
            groupFooter = groupFooter.next();
        }
        return groupFooter;
    };
    /**
         * Returns a collection of detail row buttons. 
    */
    var getDetailButtons = function(){
        var regexp = new RegExp("aspxGV(Show|Hide)DetailRow");
        return $el.find("img").filter(function(){
            return this.onclick && regexp.test(this.onclick.toString());
        });

    };
    /**
         * Returns a collection of new row buttons. 
    */
    var getNewRowButtons = function(){
        var regexp = new RegExp("aspxGVScheduleCommand\\('" + clientID + "',\\['AddNew'\\]*");
        var buttons = $el.find("a, img").filter(function(){
            return this.onclick && regexp.test(this.onclick.toString());
        });
        return $.makeArray(buttons);
    };
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3689|New Row} button for a specified data row.
         * @param {mumber} rowIndex A numeric value that specifies a row index
    */
    var getNewRowButton = function(rowIndex) {
        return getCommandButtonCore(rowIndex, "AddNew");
    };
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3689|New Row} button located in a grid header.
    */
    var getNewRowButtonFromHeader = function() {
        return getCommandButtonCore(null, "AddNew");
    };
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3689|Delete Row} button for a specified data row.
         * @param {mumber} rowIndex A numeric value that specifies a row index
    */
    var getDeleteButton = function(rowIndex) {
        return getCommandButtonCore(rowIndex, "Delete");
    };
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3689|Edit Row}  button for a specified data row.
         * @param {mumber} rowIndex A numeric value that specifies a row index
    */
    var getEditButton = function(rowIndex){
        return getCommandButtonCore(rowIndex, "StartEdit");
    };
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3689|Select Row} button for a specified data row.
         * @param {mumber} rowIndex A numeric value that specifies a row index
    */
    var getSelectButton = function(rowIndex){
        return getCommandButtonCore(rowIndex, "Select");
    };
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3680|Edit Form} Update button.
    */
    var getEditFormUpdateButton = function(){
        return getCommandButtonCore(null, "UpdateEdit");
    };
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3680|Edit Form} Cancel button.
    */
    var getEditFormCancelButton = function(){
        return getCommandButtonCore(null, "CancelEdit");
    };
    /**
         * Returns a {@link https://documentation.devexpress.com/#AspNet/CustomDocument3689|Custom} button for a specified data row.
         * @param {string} buttonID A string value that specifies a custom button ID
         * @param {mumber} rowIndex A numeric value that specifies a row index
    */
    var getCustomButton = function(buttonID, rowIndex){
        var predicate = function (inst) {
            var arg = inst.cpClickArgs[0];
            return arg && arg.length && arg.length > 1 && arg[1] == buttonID;
        };
        return getCommandButtonCore(rowIndex, null, predicate);
    };
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3775|Error Row}.
         * @param {mumber} rowIndex A numeric value that specifies a row index
    */
    var getEditingErrorRow = function(rowIndex){
        return $el.find("#" + clientID + "_DXEditingErrorRow" + (typeof(rowIndex) !== "undefined" ? rowIndex : ""));
    };
    /**
         * Returns a collection of headers located inside the GroupPanel. 
    */
    var getHeadersFromGroupPanel = function(){
        return this.getGroupPanel().find("td").filter(function() {
            return isColumnHeaderID(this.id);
        });
    };
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3682|Group Panel}.
    */
    var getGroupPanel = function(){
        return $el.find("div").filter(function(){
            return this.className.indexOf("dxgvGroupPanel") > -1;
        });
    };
    var getScrollableDiv = function(isHorz) {
        var fixedDiv = getFixedDiv();
        if(isHorz && fixedDiv.length == 1)
            return fixedDiv;
        var mainTable = $el.find("div > #" + clientID + "_DXMainTable");
        if(mainTable.length == 1)
            return mainTable.parent();
        return $();
    };
    var getFixedDiv = function() {
        return $el.find("div#" + clientID + "_DXFixedColumnsDiv");
    };
    /**
         * Returns a collection of {@link https://documentation.devexpress.com/#AspNet/CustomDocument3689|Select} check boxes located on a current page. 
    */
    var getSelectCheckBoxes = function() {
        var regexp = new RegExp(clientID + SELECTCHECKBOX_AFFIX + "\\d+_D");
        var checkBoxes = $el.find("td > span").filter(function() { return regexp.test(this.id); });
        return $.makeArray(checkBoxes);
    };
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3689|Select} check box for a specified data row.
         * @param {mumber} rowIndex A numeric value that specifies a row index
     */
    var getSelectCheckBox = function(rowIndex) {
        var row = getDataRow(rowIndex);
        if(row.length > 0)
            return getSelectCheckBoxes().filter(function(c) { return row.has(c).length > 0; });
        return $();
    };
    /**
         * Returns the SelectAll check box.
    */
    var getSelectAllCheckBox = function() {
        return $("#" + escapeJqueryMetaChars(clientID) + SELECTALLCHECKBOX_AFFIX + "0_D");
    };    
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3689|Select} check box value for a specified data row.
         * @param {mumber} rowIndex A numeric value that specifies a row index
     */
    var getSelectCheckBoxValue = function(rowIndex) {
        return getCheckBoxValue(getSelectCheckBo(rowIndex));
    };
    /**
         * Returns the SelectAll check box value.
    */
    var getSelectAllCheckBoxValue = function() {
        return getCheckBoxValue(getSelectAllCheckBox());
    };
    /**
         * Returns a collection of {@link https://documentation.devexpress.com/#AspNet/CustomDocument3689|Select} check box values located on a current page.  
    */
    var getSelectCheckBoxesValues = function() {
        return [].map.call(arguments, getCheckBoxValue);
    };
    /**
         * Returns the top {@link https://documentation.devexpress.com/#AspNet/CustomDocument3676|Pager}.
    */
    var getTopPager = function(){
        return dx.pager(clientID + "_DXPagerTop");
    };
    /**
         * Returns the bottom {@link https://documentation.devexpress.com/#AspNet/CustomDocument3676|Pager}.
    */
    var getBottomPager = function(){
        return dx.pager(clientID + "_DXPagerBottom");
    };
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3684|FilterRow} menu.
    */
    var getFilterRowMenu = function(){
        return dx.menu(clientID + "_DXFilterRowMenu");
    };
    /**
         * Returns a list box of the currently open {@link https://documentation.devexpress.com/#AspNet/CustomDocument4022|Header Filter}.
    */
    var getHeaderFilterListBox = function(){
        return dx.listBox(clientID + "_HFListBox");
    };
    /**
         * Returns the SelectAll check box of the currently open {@link https://documentation.devexpress.com/#AspNet/CustomDocument4022|Header Filter}.
    */
    var getHeaderFilterSelectAllCheckBox = function(){
        return dx.checkBox(clientID + "_HFSACheckBox");
    };
    /**
         * Returns the Ok button of the currently open {@link https://documentation.devexpress.com/#AspNet/CustomDocument4022|Header Filter}.
    */
    var getHeaderFilterOkButton = function(){
        var filterPopup = getHeaderFilterPopup();
        var okButtonID = filterPopup.inst.cpOkButtonID;
        return dx.button(okButtonID);
    };
    /**
         * Returns the currently open {@link https://documentation.devexpress.com/#AspNet/CustomDocument4022|Header Filter}.
    */
    var getHeaderFilterPopup = function(){
        return dx.popupControl(clientID + "_DXHFP");
    };
    var getHeaderFilterResizeElement = function(){
        return $el.find("img[alt='[Resize]']");
    };
    /**
         * Returns the main area of the {@link https://documentation.devexpress.com/#AspNet/CustomDocument11573|Filter Builder}.
    */
    var getFilterBuilderPopup = function(){
        return dx.popupControl(clientID + "_DXPFCForm");
    };
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument11573|Filter Builder}.
    */
    var getFilterBuilder = function(){
        return dx.filterControl(clientID + "_DXPFCForm_DXPFC");
    };
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3694|Edit Cell} used to edit the specified column's values.
         * @param {number|string} indexOrCaption A column index or caption
    */
    var getEditFormEditor = function(indexOrCaption, createWrapperMethod){
        var index = indexOrCaption;
        if(typeof index == "string")
            index = findColumnIndex(indexOrCaption);
        if(!createWrapperMethod)
            createWrapperMethod = dx.edit;
        return createWrapperMethod("DXEditor" + index);
    };
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3679|Customization Window}.
    */
    var getCustomizationWindow = function(){
        return dx.popupControl(clientID + "_custwindow");
    };

    /**
         * Returns row values for a specified data column displayed within a current page.  
         * @param {string} fieldCaption A string value that specifies a column caption text
    */
    var getDataColumnValues = function(fieldCaption){
        var columnIndex = getColumnHeader(fieldCaption)[0].cellIndex;
        var rows = getDataRows();
        var values = [ ];
        for(var i = 0; i < rows.length; i++)
            values.push(rows[i].children[columnIndex].innerHTML);
        return values;
    };
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3670|Data Cell}.
         * @param {number} rowIndex A numeric value that specifies a row index
         * @param {string} fieldCaption A string value that specifies a column caption text
    */
    var getDataCell = function(rowIndex, fieldCaption) {
        var cellIndex = getColumnHeader(fieldCaption)[0].cellIndex;
        return findDataRow(rowIndex).children("td").get(cellIndex);
    };
    /**
         * Checks if a BatchEdit cell has been modified.
         * @param {number} rowIndex A numeric value that specifies a row index
         * @param {string} fieldCaption A string value that specifies a column caption text
    */
    var isModifiedCell = function(rowIndex, fieldCaption) {
        return getDataCell(rowIndex, fieldCaption).className.indexOf("dxgvBatchEditModifiedCell") >= 0;
    };

    /**
         * Returns the bottom {@link https://documentation.devexpress.com/#AspNet/CustomDocument3676|Pager} Next button.
    */
    var getBottomNextButton = function() {
        return getBottomPager().$el.find(".dxp-button[onclick*='\'PBN\'']");
    };
    /**
         * Returns the bottom {@link https://documentation.devexpress.com/#AspNet/CustomDocument3676|Pager} Prev button.
    */
    var getBottomPrevButton = function() {
        return getBottomPager().$el.find(".dxp-button[onclick*='\'PBP\'']");
    };

    var escapeJqueryMetaChars = function (str) {
        return str.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, '\\$1');
    };
    var hasInClass = function(elem, str) {
        if (elem instanceof jQuery)
            return elem.is('[class*="' + str + '"]');
        if (elem instanceof HTMLElement)
            return elem.className.search(str) >= 0;
        throw "wrong elem param";
    };
    var getCheckBoxValue = function(checkBox) {
        if (hasInClass(checkBox, CHECKED_CSS_CLASS))
            return true;
        if (hasInClass(checkBox, UNCHECKED_CSS_CLASS))
            return false;
        if (hasInClass(checkBox, GRAYED_CSS_CLASS))
            return null;
        throw "can't determine checkbox state";
    };

    return {
        $el: $el,
        inst: instance,
        getColumnHeaders: getColumnHeaders,
        getColumnHeader: getColumnHeader,
        getColumnHeaderRow: getColumnHeaderRow,
        getDetailRows: getDetailRows,
        getPreviewRows: getPreviewRows,
        getGroupRows: getGroupRows,
        getDataRows: getDataRows,
        getDataRow: getDataRow,
        findDataRow: findDataRow,
        getEmptyDataRow: getEmptyDataRow,
        getGroupRowButtons: getGroupRowButtons,
        getEditingRow: getEditingRow,
        isColumnSorted: isColumnSorted,
        getColumnValuesOnPage: getColumnValuesOnPage,
        getColumnResizeOffset: getColumnResizeOffset,
        getColumnHeaderFilterButton: getColumnHeaderFilterButton,
        getClearFilterButton: getClearFilterButton,
        getApplyFilterButton: getApplyFilterButton,
        getFilterRowEditor: getFilterRowEditor,
        getAutoFilterEditor: getAutoFilterEditor,
        getFilterRowMenuIcon: getFilterRowMenuIcon,
        getFilterRowButton: getFilterRowButton,
        getShowFilterControlAnchor: getShowFilterControlAnchor,
        getFooter: getFooter,
        getGroupFooter: getGroupFooter,
        getFooterCell: getFooterCell,
        getGroupPanelContextMenu: getGroupPanelContextMenu,
        getColumnsContextMenu: getColumnsContextMenu,
        getRowsContextMenu: getRowsContextMenu,
        getFooterContextMenu: getFooterContextMenu,
        getContextMenuCheckedItem: getContextMenuCheckedItem,
        getDetailButtons: getDetailButtons,
        getNewRowButtons: getNewRowButtons,
        getNewRowButton: getNewRowButton,
        getNewRowButtonFromHeader: getNewRowButtonFromHeader,
        getDeleteButton: getDeleteButton,
        getEditButton: getEditButton,
        getSelectButton: getSelectButton,
        getEditFormUpdateButton: getEditFormUpdateButton,
        getEditFormCancelButton: getEditFormCancelButton,
        getCustomButton: getCustomButton,
        getEditingErrorRow: getEditingErrorRow,
        getHeadersFromGroupPanel: getHeadersFromGroupPanel,
        getGroupPanel: getGroupPanel,
        getScrollableDiv: getScrollableDiv,
        getSelectCheckBox: getSelectCheckBox,
        getSelectCheckBoxValue: getSelectCheckBoxValue,
        getSelectCheckBoxes: getSelectCheckBoxes,
        getSelectCheckBoxesValues: getSelectCheckBoxesValues,
        getSelectAllCheckBox: getSelectAllCheckBox,     
        getSelectAllCheckBoxValue: getSelectAllCheckBoxValue,

        getTopPager: getTopPager,
        getBottomPager: getBottomPager,
        getFilterRowMenu: getFilterRowMenu,
        getHeaderFilterListBox: getHeaderFilterListBox,
        getHeaderFilterSelectAllCheckBox: getHeaderFilterSelectAllCheckBox,
        getHeaderFilterOkButton: getHeaderFilterOkButton,
        getHeaderFilterPopup: getHeaderFilterPopup,
        getHeaderFilterResizeElement: getHeaderFilterResizeElement,
        getFilterBuilderPopup: getFilterBuilderPopup,
        getFilterBuilder: getFilterBuilder,
        getEditFormEditor: getEditFormEditor,
        getCustomizationWindow: getCustomizationWindow,

        getDataColumnValues: getDataColumnValues,
        getDataCell: getDataCell,
        isModifiedCell: isModifiedCell,

        getBottomNextButton : getBottomNextButton,
        getBottomPrevButton : getBottomPrevButton,
    }
};