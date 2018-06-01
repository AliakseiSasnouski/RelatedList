({
    doInit: function(component, event, helper) {
        var actions = [
            { label: 'Edit', name: 'edit' },
            { label: 'Delete', name: 'delete' }
        ];


        component.set('v.columns', [
            {label: 'Name', fieldName: 'Name', type: 'text'},
            {label: 'Text', fieldName: 'Description', type: 'text'},
            {label: 'Created Date', fieldName: 'CreatedDate', type: 'date', typeAttributes: {
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
        var recordToDisplay = component.get("v.tableSize");
        var objectType = component.get("v.objectType");
        var parentRecordId = component.get("v.recordId");
        var parentField = component.get("v.parentFieldName");
        helper.getData(component, page, recordToDisplay, objectType, parentRecordId, parentField);
    },

    navigate: function(component, event, helper) {
        var page = component.get("v.page") || 1;
        var direction = event.getSource().get("v.label");
        var recordToDisplay = component.get("v.tableSize");
        page = direction === "Previous Page" ? (page - 1) : (page + 1);
        var objectType = component.get("v.objectType");
        var parentRecordId = component.get("v.recordId");
        var parentField = component.get("v.parentFieldName");

        helper.getData(component, page, recordToDisplay, objectType, parentRecordId, parentField);
    },

    onSelectChange: function(component, event, helper) {
        var page = 1;
        var recordToDisply = component.get("v.tableSize");

        helper.getData(component, page, recordToDisply);
    },
    handleRowAction: function (component, event, helper) {
        console.log('TEST');
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'edit':
                var editRecordEvent = $A.get("e.force:editRecord");
                editRecordEvent.setParams({
                    "recordId":  row.Id
                });
                editRecordEvent.fire();
                break;
            case 'delete':
                var page = component.get("v.page") || 1;
                var recordToDisply = component.get("v.tableSize");
                var objectType = component.get("v.objectType");
                var parentRecordId = component.get("v.recordId");
                var parentField = component.get("v.parentFieldName");

                helper.delete(component, page, recordToDisply, row.Id, objectType, parentRecordId, parentField);
                break;
        }
    },
    createRecord : function (component, event, helper) {
        var createRecordEvent = $A.get("e.force:createRecord");
        var objectType = component.get("v.objectType");
        var parentRecordId = component.get("v.recordId");
        var parentField = component.get("v.parentFieldName");

        createRecordEvent.setParams({
            "entityApiName": objectType,
        });
        createRecordEvent.fire();
    },
    handleApplicationEvent: function (component, event, helper) {
        console.log('catch');
        var page = component.get("v.page") || 1;
        var recordToDisplay = component.get("v.tableSize");
        var objectType = component.get("v.objectType");
        var parentRecordId = component.get("v.recordId");
        var parentField = component.get("v.parentFieldName");
        helper.getData(component, page, recordToDisplay, objectType, parentRecordId, parentField);
    }
})