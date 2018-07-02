({
    doInit: function(component, event, helper) {
        var actions = [
            { label: 'Edit', name: 'edit' },
            { label: 'Delete', name: 'delete' }
        ];

        component.set('v.columns', [
            {label: 'Name', fieldName: 'Name', type: 'text', sortable: 'true'},
            {label: 'Text', fieldName: 'Description', type: 'text', sortable: 'true'},
            {label: 'Created Date', fieldName: 'CreatedDate', type: 'date', sortable: 'true', typeAttributes: {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }},

            { type: 'action', typeAttributes: { rowActions: actions }}
        ]);

        var page = component.get("v.page") || 1;
        helper.getData(component, page);
    },

    navigate: function(component, event, helper) {
        var page = component.get("v.page") || 1;
        var direction = event.getSource().get("v.label");
        page = direction === "Previous Page" ? (page - 1) : (page + 1);

        helper.getData(component, page);
    },

    onSelectChange: function(component, event, helper) {
        var page = 1;
        helper.getData(component, page);
    },

    handleRowAction: function (component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'edit':
                var editRecordEvent = $A.get("e.force:editRecord");
                editRecordEvent.fire({
                    "recordId":  row.Id
                });
                break;
            case 'delete':
                var page = component.get("v.page") || 1;
                helper.delete(component, page, row.Id);
                break;
        }
    },

    createRecord : function (component) {
        var createRecordEvent = $A.get("e.force:createRecord");
        var objectType = component.get("v.objectType");

        createRecordEvent.fire({
            "entityApiName": objectType
        });
    },

    handleApplicationEvent: function (component, event, helper) {
        var page = component.get("v.page") || 1;
        helper.getData(component, page);
    },

    updateColumnSorting: function (component, event, helper) {
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        component.set("v.sortedBy", fieldName);
        component.set("v.sortedDirection", sortDirection);
        helper.sortData(component, fieldName, sortDirection);
    }
})