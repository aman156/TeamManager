import { LightningElement, api, wire,track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import MEMBER_OBJECT from '@salesforce/schema/Team_Member__c';
import NAME_FIELD from '@salesforce/schema/Team_Member__c.Name';
import TEAM_NAME_FIELD from '@salesforce/schema/Team_Member__c.Team__r.Name';
import fetchTeamMembers from '@salesforce/apex/TeamMemberController.fetchTeamMembers';
import fetchAllTeams from '@salesforce/apex/TeamMemberController.fetchAllTeams';

export default class TeamsApp extends LightningElement {
    @api filterOptions;
    @api members;
    @track error;
    @api isLoaded=false;
    connectedCallback() {
        fetchAllTeams()
        .then(teams => {
            this.isLoaded = true;
        /*	this.teamOptions = new Map(teams.map(x => {
                 var rObj = {
                     label:x.Name,
                     value:x.Id
                 };
                 console.log('x.Name-x.Id     '+JSON.stringify(rObj));
                 return rObj;
            }));*/
            this.filterOptions=[];
            for(var i=0; i<teams.length; i++)  {
                this.filterOptions = [...this.filterOptions ,{value: teams[i].Id , label: teams[i].Name} ];                                   
            }                
           // this.dispatchEvent(new CustomEvent('send',{detail : this.teamOptions}));
            this.error = undefined;
        })
        .catch(error => {
            alert('got error'+error);
        });
    }

    @wire(fetchTeamMembers)
    wiredMembers({ error, data }) {
        if (data) {
            this.members = data;
            this.isLoaded= true;
            console.log('# '+this.members);
        } else if (error) {
            alert(error);
            this.error = error;
        }
    }
    handleChange(event) {
        const member = event.detail;
        this.members= this.members.concat(member);
    }
}