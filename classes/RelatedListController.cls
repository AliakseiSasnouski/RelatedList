
public with sharing class RelatedListController {
    @AuraEnabled
    public static ObjectWrapper fetchData(Decimal pageNumber, Decimal recordToDisplay, String objectType, String parentRecordId, String parentField) {
        Integer pageSize = (Integer)recordToDisplay;
        Integer offset = ((Integer)pageNumber - 1) * pageSize;
        ObjectWrapper obj =  new ObjectWrapper();

        String countQuery = 'SELECT count() FROM ';
        String queryObjects = 'SELECT Id, Name, CreatedDate, Description FROM ';
        if (String.isNotEmpty(objectType)) {
            countQuery += objectType;
            queryObjects += objectType;
            if (String.isNotEmpty(parentField) && String.isNotEmpty(parentRecordId)) {
                countQuery += ' WHERE ' + parentField + ' = : parentRecordId';
                queryObjects += ' WHERE ' + parentField +' = : parentRecordId';
            } else {
                queryObjects += ' ORDER BY Name LIMIT :pageSize OFFSET :offset';

            }
        } else {
            return obj;
        }

        obj.pageSize = pageSize;
        obj.page = (Integer) pageNumber;
        obj.total = Database.countQuery(countQuery);
        obj.data = Database.query(queryObjects);

        return obj;
    }

    @AuraEnabled
    public static ObjectWrapper deleteRecord(Decimal pageNumber ,Decimal recordToDisplay, String recordId, String objectType, String parentRecordId, String parentField) {
        UserRecordAccess recAccess = [SELECT HasEditAccess, HasDeleteAccess, RecordId FROM UserRecordAccess WHERE UserId=:UserInfo.getUserId() AND RecordId =:recordId];
        if (recAccess.HasDeleteAccess) {
            sObject sObj = Schema.getGlobalDescribe().get(objectType).newSObject();
            sObj.Id = recordId;
            delete sObj;
        }

        return fetchData(pageNumber, recordToDisplay, objectType, parentRecordId, parentField);
    }

    public class ObjectWrapper {
        @AuraEnabled public Integer pageSize {get;set;}
        @AuraEnabled public Integer page {get;set;}
        @AuraEnabled public Integer total {get;set;}
        @AuraEnabled public List<sObject> data {get;set;}
    }
}