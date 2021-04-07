import { LightningElement,track ,api} from 'lwc';

export default class TeamList extends LightningElement {
   // @api members;
   @api options;
   @track memList ;
   __members;
   @api
   get memberList(){
      return this.this.__members;
   }
   set memberList(value){
      this.memList = value;
      this.__members = value
   }
   handleChange(event) {
      let team = event.detail.value;
      this.memList= this.__members.filter(o =>o.Team__r.Id == team);
   }
}