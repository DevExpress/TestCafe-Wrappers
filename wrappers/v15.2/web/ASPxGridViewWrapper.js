dx.cardView = function (controlID) {
    var CARD_AFFIX = "_DXDataCard",
        EDITING_CARD_AFFIX = "_DXEditingCard",
        EMPTY_CARD_AFFIX = "_DXEmptyCard",
        CARD_LAYOUT_AFFIX = "_DXCardLayout",
        CUST_PANEL_AFFIX = "_CustPanel";

    var ret = dx.gridBase(controlID),
        clientID = ret.clientID,
        $el = ret.$el;
    
    var getCard = function(cardIndex) {
        return $(ret.getItems()[cardIndex]);
    };
    var getEditingCard = function() {
        return ret.getEditingItem();
    };
    var getEmptyCard = function(){
        return $el.find("#" + clientID + EMPTY_CARD_AFFIX)[0];
    };
    var getCards = function() {
        return ret.getItems();
    };
    var getCardsFormLayouts = function() {
        return getCards().map(function(card) { return dx.formLayout(card.id); });
    };
    var getCardRowsCount = function() {
        return $(ret.getItems()).parent().length;
    };
    var isCardSelected = function(cardIndex) {
        return ret.getItems()[cardIndex].className.indexOf("SelectedCard") > -1;
    };
    
    var getColumnValuesOnPage = function(fieldCaption){
        var values = [ ];
        var cardLayouts = $el.find("div").filter(function(){ 
            return this.id.match(clientID + CARD_LAYOUT_AFFIX);
        });
        cardLayouts.each(function() {
            var formLayout = dx.formLayout(this.id);
            var flCaption = formLayout.getItemCaptionElements().has('*[class*="dxflCaption"]:contains(' + fieldCaption + ')');
            if (!flCaption.length)
                return;
            var flItemContainer = flCaption.closest("table[class*='dxflItem']");
            var value = flItemContainer.find("td[class*='dxflNestedControlCell']")[0].innerHTML;
            values.push(value);
        });
        return values;
    };

    var getCustomizationWindowButton = function() {
        return $(getCustomizationPanel()).find("a[class*='dxbButtonSys']")[0]
    };
    var getCustomizationPanel = function() {
        var customizationPanel = $el.find("div").filter(function(){ 
            return this.id.match(clientID + CUST_PANEL_AFFIX);
        })[0];
        return customizationPanel;
    };

    var getItemsAffixes = function() {
        return [CARD_AFFIX, EDITING_CARD_AFFIX];
    };
    var getEditingItemAffix = function() {
        return EDITING_CARD_AFFIX;
    };
    var getSelectCheckBoxPrefix = function() {
        return clientID + CARD_LAYOUT_AFFIX + "\\d" ;
    };
    var getItemIdPattern = function(rowIndex) {
        return this.getCard(rowIndex);
    };
    var getEndlessPagingMoreButton = function() {
        return ret.getCommandButtonCore(null,"EndlessShowMore");
    };
    var getSummaryPanel = function() {
        return $el.find("div").filter(function(){ return this.className.indexOf("dxcvSummaryPanel") > -1; });
    };
    ret.getCard = getCard;
    ret.getCards = getCards;
    ret.getCardsFormLayouts = getCardsFormLayouts;
    ret.getCardRowsCount = getCardRowsCount;
    ret.getEditingCard = getEditingCard;
    ret.getEmptyCard = getEmptyCard;
    ret.getColumnValuesOnPage = getColumnValuesOnPage;
    ret.getCustomizationWindowButton = getCustomizationWindowButton;
    ret.isCardSelected = isCardSelected;

    ret.getSelectCheckBoxPrefix = getSelectCheckBoxPrefix;
    ret.getItemsAffixes = getItemsAffixes;
    ret.getEditingItemAffix = getEditingItemAffix;
    ret.getItemIdPattern = getItemIdPattern;
    ret.getEndlessPagingMoreButton = getEndlessPagingMoreButton;
    ret.getSummaryPanel = getSummaryPanel;
    return ret;
}
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
    var HEADER_ROW_AFFIX = "_DXHeadersRow",
        DATA_ROW_AFFIX = "_DXDataRow",
        INSERTED_ROW_AFFIX = "_DXDataRow-"
        GROUP_ROW_AFFIX = "_DXGroupRow",
        EXPANDED_GROUP_ROW_AFFIX = "_DXGroupRowExp"
        DETAIL_ROW_AFFIX = "_DXDRow",
        PREVIEW_ROW_AFFIX = "_DXPRow",
		EMPTY_ROW_AFFIX = "_DXEmptyRow",
        EDITING_ROW_AFFIX = "_DXEditingRow";
        ADAPTIVE_FOOTER_AFFIX = "_DXAFooterPanel";
        ADAPTIVE_HEADER_AFFIX = "_DXAHeaderPanel";
        ADAPTIVE_DATA_ROW_AFFIX = "_DXADRow";
    
    var ret = dx.gridBase(controlID),
        clientID = ret.clientID,
        $el = ret.$el;

    var getColumnHeaderRow = function(index) {
        index = index === undefined ? "0" : index;
        return $el.find("tr#" + clientID + HEADER_ROW_AFFIX + index);
    };
    /**
         * Returns a collection of {@link https://documentation.devexpress.com/#AspNet/CustomDocument3769|Detail Rows}. 
    */
    var getDetailRows = function(){
        return ret.getItems([DETAIL_ROW_AFFIX]);
    }
     /**
         * Returns a collection of {@link https://documentation.devexpress.com/#AspNet/CustomDocument3672|Preview Rows}. 
    */
    var getPreviewRows = function(){
        return ret.getItems([PREVIEW_ROW_AFFIX]);
    }
    /**
         * Returns a collection of {@link https://documentation.devexpress.com/#AspNet/CustomDocument3681|Group Rows}. 
    */
    var getGroupRows = function(expanded) {
        return ret.getItems([expanded ? EXPANDED_GROUP_ROW_AFFIX : GROUP_ROW_AFFIX]);
    };
    /**
         * Returns a collection of {@link https://documentation.devexpress.com/#AspNet/CustomDocument3673|Data Rows}. 
    */
    var findDataRow = function(rowIndex) {
        return ret.findItem(rowIndex);
    };
    /**
         * Returns an {@link https://documentation.devexpress.com/#AspNet/CustomDocument3790|Empty Data Row}. 
    */
    var getEmptyDataRow = function(){
        var rows = $el.find("tr#" + clientID + EMPTY_ROW_AFFIX);
        return rows.length > 0 ? $(rows[0]) : null;
    };
    /**
         * Returns row values for a specified data column displayed within a current page.  
         * @param {string} fieldCaption A string value that specifies a column caption text
    */
    var getDataColumnValues = function(fieldCaption){
        var columnIndex = ret.getColumnHeader(fieldCaption)[0].cellIndex;
        var rows = ret.getItems();
        var values = [ ];
        for(var i = 0; i < rows.length; i++)
            values.push(rows[i].children[columnIndex].innerHTML);
        return values;
    };
    
    var getDataRow = function(index) { // TODO remove it and use findDataRow - it use global row index
        return $(getDataRows()[index]);
    };
    var getDataRows = function() {
        return ret.getItems();
    }
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3680|Edit Form}. 
    */
    var getEditingRow = function() {
        return ret.getEditingItem();
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
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3670|Data Cell}.
         * @param {number} rowIndex A numeric value that specifies a row index
         * @param {string} fieldCaption A string value that specifies a column caption text
    */
    var getDataCell = function(rowIndex, fieldCaption) {
        var cellIndex = ret.getColumnHeader(fieldCaption)[0].cellIndex;
        return findDataRow(rowIndex).children("td").get(cellIndex);
    };

    var getColumnValuesOnPage = function(fieldCaption){
        var columnIndex = ret.findColumnIndex(fieldCaption);

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

    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3684|ClearFilter} button.
    */
    var getClearFilterButton = function(){
        return ret.getCommandButtonCore(null, "ClearFilter");
    };
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3684|ApplyFilter} button.
    */
    var getApplyFilterButton = function(){
        return ret.getCommandButtonCore(null, "ApplyMultiColumnAutoFilter");
    };

    var getItemIdPattern = function(rowIndex) {
        var rowPrefix = this.inst.adaptivityMode == 2 && this.inst.hasAdaptiveElements? ADAPTIVE_DATA_ROW_AFFIX : DATA_ROW_AFFIX;
        return "tr#" + clientID + rowPrefix + rowIndex;
    };
    var getItemsAffixes = function() {
        return [INSERTED_ROW_AFFIX, DATA_ROW_AFFIX];
    };
    var getEditingItemAffix = function() {
        return EDITING_ROW_AFFIX;
    };
    var getSelectCheckBoxPrefix = function() {
        return clientID;
    };    
    var getAdaptiveGroupPanel = function() {        
        return $el.find("div").filter(function(){
            return this.className.indexOf("dxgvAdaptiveGroupPanel") > -1;
        });
    };
    var getAdaptiveFooter = function() {
        var regExp = new RegExp("^" + clientID + ADAPTIVE_FOOTER_AFFIX + "$");
        return $el.find("div").filter(function(){
            return regExp.test(this.id);
        });        
    };
    var getAdaptiveHeader = function() {
        var regExp = new RegExp("^" + clientID + ADAPTIVE_HEADER_AFFIX + "$");
        return $el.find("div").filter(function(){
            return regExp.test(this.id);
        });        
    };
    var getAdaptiveRows = function() {
        return ret.getItems([ADAPTIVE_DATA_ROW_AFFIX]);
    };
    var getAdaptiveRow = function(rowIndex) {
        return $("tr#" + clientID + ADAPTIVE_DATA_ROW_AFFIX + rowIndex);
    };
    var getAdaptiveRowContentTable = function(rowIndex) {
        var adaptiveRow = ret.getAdaptiveRow(rowIndex);
        return $(adaptiveRow).find("table").filter(function(){ return this.className.indexOf("dxgvADT") > -1; })[0];
    };
    var getAdaptiveDetailLayoutItems = function(filedName) {
        var colIndex = ret.findColumnIndex(filedName);        
        return $(ret.getAdaptiveRows()).find("div").filter(function(){ return this.className.indexOf("dxgvADLIC" + colIndex) > -1; });
    };
    var getAdaptiveDetailLayoutItemsValues = function(filedName) {
        var values = [ ];
        ret.getAdaptiveDetailLayoutItems(filedName).each(function() { values.push($(this).text()); });
        return values;
    };
    var getAdaptiveCaptionCell= function(rowIndex, filedName) {
        var table = getAdaptiveRowContentTable(rowIndex);
        return $(table).find("td:contains(" + filedName + ")")[0];
    };
    var getAdaptiveValueCell= function(rowIndex, filedName) {
        var cell = ret.getAdaptiveCaptionCell(rowIndex, filedName);
        return cell ? $(cell).next() : getAdaptiveDetailLayoutItems(filedName)[rowIndex];
    };
    var getAdaptiveDetailShowButton = function(rowIndex) {
        return this.getCommandButtonCore(rowIndex, "ShowAdaptiveDetail");
    };
    var getAdaptiveDetailHideButton = function(rowIndex) {
        var adaptiveRow = this.getAdaptiveRow(rowIndex);
        return this.findCommandButtonInContainer(adaptiveRow, "HideAdaptiveDetail");
    };
    ret.getColumnHeaderRow = getColumnHeaderRow;
    ret.getDetailRows = getDetailRows;
    ret.getPreviewRows = getPreviewRows;
    ret.getGroupRows = getGroupRows;
    ret.getDataRows = getDataRows;
    ret.getDataRow = getDataRow;
    ret.findDataRow = findDataRow;
    ret.getEmptyDataRow = getEmptyDataRow;
    ret.getDataColumnValues = getDataColumnValues;
    ret.getEditingRow = getEditingRow;
    ret.isModifiedCell = isModifiedCell;
    ret.getDataCell = getDataCell;

    ret.getClearFilterButton = getClearFilterButton;
    ret.getApplyFilterButton = getApplyFilterButton;

    ret.getColumnValuesOnPage = getColumnValuesOnPage;
    ret.getSelectCheckBoxPrefix = getSelectCheckBoxPrefix;
    ret.getItemsAffixes = getItemsAffixes;
    ret.getItemIdPattern = getItemIdPattern;
    ret.getEditingItemAffix = getEditingItemAffix;
    ret.getAdaptiveGroupPanel = getAdaptiveGroupPanel;
    ret.getAdaptiveFooter = getAdaptiveFooter;
    ret.getAdaptiveHeader = getAdaptiveHeader;
    ret.getAdaptiveDetailLayoutItems = getAdaptiveDetailLayoutItems;
    ret.getAdaptiveDetailLayoutItemsValues = getAdaptiveDetailLayoutItemsValues;
    ret.getAdaptiveDetailShowButton = getAdaptiveDetailShowButton;
    ret.getAdaptiveDetailHideButton = getAdaptiveDetailHideButton;
    ret.getAdaptiveRows = getAdaptiveRows;
    ret.getAdaptiveRow = getAdaptiveRow;
    ret.getAdaptiveRowContentTable = getAdaptiveRowContentTable;
    ret.getAdaptiveCaptionCell = getAdaptiveCaptionCell;
    ret.getAdaptiveValueCell = getAdaptiveValueCell;
    return ret;
}

dx.gridBase = function (controlID) {
    var SELECTCHECKBOX_AFFIX = "_DXSelBtn",
        SELECTALLCHECKBOX_AFFIX = "_DXSelAllBtn",
        CHECKED_CSS_CLASS = "edtCheckBoxChecked",
        GRAYED_CSS_CLASS = "edtCheckBoxGrayed",
        UNCHECKED_CSS_CLASS = "edtCheckBoxUnchecked",
        SEARCHPANEL_AFFIX = "_DXSearchPanel",
        PAGER_TOP_AFFIX = "_DXPagerTop",
        PAGER_BOTTOM_AFFIX = "_DXPagerBottom";

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
        return ($custWin || $el).find("td, th, div").filter(function() {
            if(!isColumnHeaderID(this.id, $custWin && $custWin.length > 0))
                return false;
            return $(this).find("td").filter(function(){ return $(this).text() == fieldCaption; }).length > 0;
        });
    };
    var isColumnHeaderID = function(id, hasCustWin){
        var custWinPrefix = hasCustWin ? "\\S+" : "";
        var columnsRegExp = new RegExp('(^|_)' + clientID + custWinPrefix + "_(\group)*col" + '\\d+');
        return columnsRegExp.test(id);
    }
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument4022|Header Filter} button for a specified data column.
         * @param {string} fieldCaption A string value that specifies a column caption text
     */
    var getColumnHeaderFilterButton = function(fieldCaption) {
        return getColumnHeader(fieldCaption).find("img.dxgv__hfb");
    };
    /**
         * Checks whether a column has been sorted in ascending order.
         * @param {string} fieldCaption A string value that specifies a column caption text
         * @param {boolean} isAscending A boolean value that identifies if a column is sorted in ascending order
    */ 
    var isColumnSorted = function(fieldCaption, isAscending, excludedRowIndex){
        var values = this.getColumnValuesOnPage(fieldCaption);
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

    var getColumnValuesOnPage = function(fieldCaption) {
        return null;
    };

    var getItems = function(itemAffixes) {
        var affixes = itemAffixes || this.getItemsAffixes();
        var result = [];
        for(var i = 0; i < affixes.length; i++) {
            var regexp = new RegExp(clientID + affixes[i] + "\\d+");
            var items = $el.find("*").filter(function() {
                return regexp.test(this.id);
            });
            result = $.merge(result, $.makeArray(items));
        }
        return result;
    };
    var getItemsAffixes = function() {
        return [];
    }
     /**
         * Returns a collection of {@link https://documentation.devexpress.com/#AspNet/CustomDocument3681|Group Row} buttons. 
         * @param {boolean} isCollapse A boolean value that identifies if a Group Row is collapsed
    */
    var getGroupRowButtons = function(collapse) {
        var funcName = collapse ? "ASPx.GVCollapseRow" : "ASPx.GVExpandRow";
        var regexp = new RegExp(funcName + "\\('" + clientID + "',\\d+,\\S+\\)");
        return $el.find("img").filter(function(){
            return this.onclick && regexp.test(this.onclick.toString());
        });
    };

    var getEditingItem = function(){
        var context = this;
        return $el.find("*").filter(function(){
            return this.id.match("^" + clientID + context.getEditingItemAffix() + "$");
        });
    };
    var getEditingItemAffix = function() {
        return "";
    }

    var getColumnResizeOffset = function(cell) {
        /// <param name="cell" type="$"></param>
        return cell.width() + parseInt(cell.css("padding-left")) + parseInt(cell.css("padding-right")) + parseInt(cell.css("border-right-width"))
    };
    var getFilterRow = function(){
        return $el.find("#" + clientID + "_DXFilterRow");
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
    }
    /**
         * Returns the  {@link https://documentation.devexpress.com/#AspNet/CustomDocument3684|Filter Row} menu icon for a specified data column.
         * @param {mumber} columnIndex A numeric value that specifies a column index
    */
    var getFilterRowMenuIcon = function(columnIndex){
        var regexp = new RegExp("ASPx.GVFilterRowMenu\\('" + clientID + "'," + columnIndex +"\\S+\\)");
        return $el.find("img").filter(function() {
            return this.onclick && regexp.test(this.onclick.toString());
        });
    };
    var getCommandButtonCore = function(itemIndex, buttonType, predicate){
        var $container = ASPx.IsExists(itemIndex) ? this.findItem(itemIndex) : $el;
        return this.findCommandButtonInContainer($container, buttonType, predicate);
    };
     var findCommandButtonInContainer = function(container, buttonType, predicate){
        var isCBRegExp = new RegExp("\\.*\\d+$");
        return $(container).find("[id*=DXCBtn]").filter(function(){
            if(!isCBRegExp.test(this.id)) 
                return false;

            var inst = ASPx.GetControlCollection().Get(this.id);
            var args = eval($(inst.GetMainElement()).attr("data-args"));
            return inst && $(inst.GetMainElement()) && inst.cpGVName == clientID 
                && (!buttonType || args[0][0] == buttonType)
                && (!predicate || predicate(inst));
        }).first();
    };
    var findItem = function(itemIndex) {
        return $(this.getItemIdPattern(itemIndex));
    };
    var getItemIdPattern = function(itemIndex) {
        return "";
    }
    /**
         * Returns the header filter button for a specified data column.
         * @param {string} fieldCaption A string value that specifies a column caption text
    */
    var getFilterRowButton = function(fieldCaption, $custWin){
        var column = getColumnHeader(fieldCaption, $custWin);
        return column.find("img.dxgv__hfb");
    };
    /**
         * Returns the ShowFilterControl anchor.
    */
    var getShowFilterControlAnchor = function(){
        return $el.find("a").filter(function() {
            return this.onclick && this.onclick.toString().indexOf("ASPx.GVShowFilterControl") > -1;
        });
    };
    var getClearFilterLink = function(){
        var regexp = new RegExp("ASPx.GVScheduleCommand\\('" + clientID + "',\\['ClearFilter'\\]*");
        var buttons = $el.find("a").filter(function(){
            return this.onclick && regexp.test(this.onclick.toString());
        });
        return $.makeArray(buttons);
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
        if(ASPx.IsExists(footer)) 
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
        var regexp = new RegExp("ASPx.GV(Show|Hide)DetailRow");
        return $el.find("img").filter(function(){
            return this.onclick && regexp.test(this.onclick.toString());
        });

    }
    /**
         * Returns a collection of new row buttons. 
    */
    var getNewRowButtons = function(){
        var regexp = new RegExp("ASPx.GVScheduleCommand\\('" + clientID + "',\\['AddNew'\\]*");
        var buttons = $el.find("a, img").filter(function(){
            return this.onclick && regexp.test(this.onclick.toString());
        });
        return $.makeArray(buttons);
    }
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3689|New Row} button for a specified data row.
         * @param {mumber} rowIndex A numeric value that specifies a row index
    */
    var getNewRowButton = function(rowIndex) {
        return this.getCommandButtonCore(rowIndex, "AddNew");
    }
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3689|New Row} button located in a grid header.
    */
    var getNewRowButtonFromHeader = function() {
        return this.getCommandButtonCore(null, "AddNew");
    }
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3689|Delete Row} button for a specified data row.
         * @param {mumber} rowIndex A numeric value that specifies a row index
    */
    var getDeleteButton = function(rowIndex) {
        return this.getCommandButtonCore(rowIndex, "Delete");
    }
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3689|Edit Row}  button for a specified data row.
         * @param {mumber} rowIndex A numeric value that specifies a row index
    */
    var getEditButton = function(rowIndex){
        return this.getCommandButtonCore(rowIndex, "StartEdit");
    }
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3689|Select Row} button for a specified data row.
         * @param {mumber} rowIndex A numeric value that specifies a row index
    */
    var getSelectButton = function(rowIndex){
        return this.getCommandButtonCore(rowIndex, "Select");
    }
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3680|Edit Form} Update button.
    */
    var getEditFormUpdateButton = function(){
        return this.getCommandButtonCore(null, "UpdateEdit");
    };
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3680|Edit Form} Cancel button.
    */
    var getEditFormCancelButton = function(){
        return this.getCommandButtonCore(null, "CancelEdit");
    }
    /**
         * Returns a {@link https://documentation.devexpress.com/#AspNet/CustomDocument3689|Custom} button for a specified data row.
         * @param {string} buttonID A string value that specifies a custom button ID
         * @param {mumber} rowIndex A numeric value that specifies a row index
    */
    var getCustomButton = function(buttonID, rowIndex){
        var predicate = function(inst){
            var arg = eval($(inst.GetMainElement()).attr("data-args"))[0];
            return arg && arg.length && arg.length > 1 && arg[1] == buttonID;
        };
        return this.getCommandButtonCore(rowIndex, null, predicate);
    }
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3775|Error Row}.
         * @param {mumber} rowIndex A numeric value that specifies a row index
    */
    var getEditingErrorRow = function(rowIndex){
        return $el.find("#" + clientID + "_DXEditingErrorItem" + (typeof(rowIndex) !== "undefined" ? rowIndex : ""));
    }
    var isGroupHeaderID = function(id){
        var columnsRegExp = new RegExp('(^|_)' + clientID + "_groupcol" + '\\d+');
        return columnsRegExp.test(id);
    }
    var getGroupHeaders = function(id){
        return  $el.find("td").filter(function() {
            return isGroupHeaderID(this.id);
        });
    }
    /**
         * Returns a collection of headers located inside the GroupPanel. 
    */
    var getHeadersFromGroupPanel = function(){
        return this.getGroupPanel().find("td").filter(function() {
            return isColumnHeaderID(this.id);
        });
    }
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3682|Group Panel}.
    */
    var getGroupPanel = function(){
        return $el.find("div").filter(function(){
            return this.className.indexOf("dxgvGroupPanel") > -1;
        });
    }
    var getMainTable = function(){
        return $el.find("#" + clientID + "_DXMainTable")[0];
    }    
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
        var regexp = new RegExp(this.getSelectCheckBoxPrefix() + SELECTCHECKBOX_AFFIX + "\\d+_D");
        var checkBoxes = $el.find("span").filter(function() { return regexp.test(this.id); });
        return $.makeArray(checkBoxes);
    };
    var getSelectCheckBoxPrefix = function() {
        return "";
    };
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3689|Select} check box for a specified data row.
         * @param {mumber} rowIndex A numeric value that specifies a row index
     */
    var getSelectCheckBox = function(index) {
        var item = $(this.getItems()[index]);
        if(item.length > 0)
            return this.getSelectCheckBoxes().filter(function(c) { return item.has(c).length > 0; });
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
        return getCheckBoxValue(this.getSelectCheckBox(rowIndex)[0]);
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
        return dx.pager(getTopPagerID());
    }
    var getTopPagerID = function() {
        return clientID + PAGER_TOP_AFFIX;
    };
    /**
         * Returns the bottom {@link https://documentation.devexpress.com/#AspNet/CustomDocument3676|Pager}.
    */
    var getBottomPager = function() {
        return dx.pager(getBottomPagerID());
    };
    var getBottomPagerID = function() {
        return clientID + PAGER_BOTTOM_AFFIX;
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
    var getHeaderFilterFromDateEdit = function(){
        return dx.dateEdit(clientID + "_HFFDE");
    };
    var getHeaderFilterToDateEdit = function(){
        return dx.dateEdit(clientID + "_HFTDE");
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
    }
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
    var findColumnIndex = function(fieldCaption){
        var column = getColumnHeader(fieldCaption);
        return column.length > 0 ? column.attr("id").match(new RegExp("_(?:group)?col(\\d+)"))[1] : -1;
    };
    /**
         * Returns the {@link https://documentation.devexpress.com/#AspNet/CustomDocument3679|Customization Window}.
    */
    var getCustomizationWindow = function(){
        return dx.popupControl(clientID + "_custwindow");
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
        
    var getSearchPanel = function() {
        return $el.find('#' + clientID + SEARCHPANEL_AFFIX);
    };
    var getSearchPanelInput = function() {
        return getSearchPanel().find('[type="text"]')[0];
    };
    var getEditPopupWindow = function() {
        return $el.find("div").filter(function() {
            return this.id.indexOf("_DXPEForm_PW-1") > -1;
        });
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
        clientID: clientID,
        inst: instance,
        getItems: getItems,
        getColumnHeaders: getColumnHeaders,
        getColumnHeader: getColumnHeader,
        findColumnIndex: findColumnIndex,
        getGroupRowButtons: getGroupRowButtons,
        isColumnSorted: isColumnSorted,
        getColumnValuesOnPage: getColumnValuesOnPage,
        getColumnResizeOffset: getColumnResizeOffset,
        getColumnHeaderFilterButton: getColumnHeaderFilterButton,
        getFilterRow: getFilterRow,
        getFilterRowEditor: getFilterRowEditor,
        getAutoFilterEditor: getAutoFilterEditor,
        getFilterRowMenuIcon: getFilterRowMenuIcon,
        getFilterRowButton: getFilterRowButton,
        getShowFilterControlAnchor: getShowFilterControlAnchor,
        getClearFilterLink: getClearFilterLink,
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
        getGroupHeaders: getGroupHeaders,
        getGroupPanel: getGroupPanel,
        getScrollableDiv: getScrollableDiv,
        getSelectCheckBox: getSelectCheckBox,
        getSelectCheckBoxValue: getSelectCheckBoxValue,
        getSelectCheckBoxes: getSelectCheckBoxes,
        getSelectCheckBoxesValues: getSelectCheckBoxesValues,
        getSelectAllCheckBox: getSelectAllCheckBox,     
        getSelectAllCheckBoxValue: getSelectAllCheckBoxValue,

        getTopPager: getTopPager,
        getTopPagerID: getTopPagerID,
        getBottomPager: getBottomPager,
        getBottomPagerID: getBottomPagerID,
        getFilterRowMenu: getFilterRowMenu,
        getHeaderFilterListBox: getHeaderFilterListBox,
        getHeaderFilterFromDateEdit: getHeaderFilterFromDateEdit,
        getHeaderFilterToDateEdit: getHeaderFilterToDateEdit,
        getHeaderFilterSelectAllCheckBox: getHeaderFilterSelectAllCheckBox,
        getHeaderFilterOkButton: getHeaderFilterOkButton,
        getHeaderFilterPopup: getHeaderFilterPopup,
        getHeaderFilterResizeElement: getHeaderFilterResizeElement,
        getFilterBuilderPopup: getFilterBuilderPopup,
        getFilterBuilder: getFilterBuilder,
        getEditFormEditor: getEditFormEditor,
        getCustomizationWindow: getCustomizationWindow,

        getBottomNextButton : getBottomNextButton,
        getBottomPrevButton : getBottomPrevButton,

        getSearchPanel: getSearchPanel,
        getSearchPanelInput: getSearchPanelInput,
        getEditPopupWindow: getEditPopupWindow,

        getCommandButtonCore: getCommandButtonCore,
        findCommandButtonInContainer: findCommandButtonInContainer,
        getSelectCheckBoxPrefix: getSelectCheckBoxPrefix,
        getItemsAffixes: getItemsAffixes,
        getEditingItem: getEditingItem,
		findItem: findItem,
        getItemIdPattern: getItemIdPattern,
        getEditingItemAffix: getEditingItemAffix,
        getMainTable: getMainTable
    }
};
// for demos creating large DB
dx.gridDataLoadHelper = (function() {
    var dataLoaded = function() {
        if(typeof (ASPx) === "undefined" || typeof (ASPx.GetControlCollection) === "undefined")
            return false;
        var result = false;
        var isGrid = function(element) { return typeof ASPxClientGridBase !== "undefined" && element instanceof ASPxClientGridBase; }
        ASPx.GetControlCollection().ForEachControl(function(control) {
            result |= isGrid(control);
        });
        return result;    
    };    
    var isWaitCallback = function() { return !dataLoaded(); }

    return { isWaitCallback: isWaitCallback};
})();