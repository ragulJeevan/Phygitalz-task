export interface Issue {
      id : number,
      issue_description : string,
      issue_related_to : string,
      issue_type : string,
      issue_sub_type : string,
      due_date : string,
      assigned_to :  string,
      created_by: string,
      issue_status:string,
      attachements : object,
}
