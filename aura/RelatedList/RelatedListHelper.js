({
    getData: function(component, page, recordToDisplay, objectType, parentRecordId, parentField) {
        var action = component.get("c.fetchData");
        action.setParams({
            "pageNumber": page,
            "recordToDisplay": recordToDisplay,
            "objectType" : objectType,
            "parentRecordId": parentRecordId,
            "parentField": parentField
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log('result ---->' + JSON.stringify(result));
                component.set("v.data", result.data);
                component.set("v.page", result.page);
                component.set("v.total", result.total);
                component.set("v.pages", Math.ceil(result.total / recordToDisplay));
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                            errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },

    delete: function (component, page, recordToDisplay, recordId, objectType, parentRecordId, parentField) {
        var action = component.get("c.deleteRecord");
        action.setParams({
            "pageNumber": page,
            "recordToDisplay": recordToDisplay,
            "recordId": recordId,
            "objectType" : objectType,
            "parentRecordId": parentRecordId,
            "parentField": parentField
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log('result ---->' + JSON.stringify(result));

                component.set("v.data", result.data);
                component.set("v.page", result.page);
                component.set("v.total", result.total);
                component.set("v.pages", Math.ceil(result.total / recordToDisplay));
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                            errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    }
})