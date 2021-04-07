import { LightningElement, api, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class MemberSkills extends LightningElement {
  @api options;
  @api value = 'Select a Team';
  @api error;
  @track isLoaded = false;
 
  handleTeamSuccess(event) {
    console.log(JSON.stringify(event.detail.fields));
    this.dispatchEvent(
      new ShowToastEvent({
        title: "Success",
        message: "Team Member created Successfully.",
        variant: "success"
      })
    );
   var mem = {Name: event.detail.fields.Name.value,
             Skills__c: event.detail.fields.Skills__c.value,
              Team__r: {Name : event.detail.fields.Team__r.displayValue,
                        Id : event.detail.fields.Team__r.value.id }};
    this.dispatchEvent(
      new CustomEvent("add", {
        detail: mem
      })
    );
  }
  handleOnTeamSubmit(event) {
    event.preventDefault(); // stop the form from submitting
    const fields = event.detail.fields;
    if (this.selectedTeam === undefined || this.selectedTeam === null) {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Error",
            message: "Please select a Team",
            variant: "error"
          })
        );
        return;
      }
    fields.Team__c = this.selectedTeam;
    this.template.querySelector("lightning-record-edit-form").submit(fields);
  }
  handleSelect(event) {
    this.selectedTeam = event.detail.value;
  }
}