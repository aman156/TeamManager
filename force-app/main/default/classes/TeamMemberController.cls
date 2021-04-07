public with sharing class TeamMemberController {
    @AuraEnabled(cacheable=true)
    public static List<Team__c> fetchAllTeams(){
            return [Select id , name from Team__c];
    }

    @AuraEnabled(cacheable=true)
    public static List<Team_Member__c> fetchTeamMembers(){
            return [Select id , name,Team__r.Name ,Skills__c from Team_Member__c];
    }

}
